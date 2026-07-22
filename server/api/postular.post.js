import { Resend } from 'resend'
import { careersSchema } from '~/composables/leadForm'

// Envío del formulario Trabaja con nosotros → recursoshumanos@gammaplast.com.pe con el CV adjunto.
// Recibe multipart/form-data (campos de texto + archivo `cv`). Revalida con careersSchema.
const CV_EXTS = ['pdf', 'doc', 'docx']
const MAX_CV_BYTES = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  const parts = (await readMultipartFormData(event)) || []
  const fields = {}
  let cv = null
  for (const p of parts) {
    if (p.name === 'cv' && p.filename) cv = p
    else if (p.name) fields[p.name] = p.data.toString('utf8')
  }

  // Honeypot anti-spam.
  if (fields.website) return { ok: true }

  const parsed = careersSchema.safeParse(fields)
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: 'Revisa los datos del formulario.' })
  }
  const d = parsed.data

  // Validación del CV (backstop de la del cliente).
  if (!cv) throw createError({ statusCode: 422, statusMessage: 'Adjunta tu CV.' })
  const ext = (cv.filename.split('.').pop() || '').toLowerCase()
  if (!CV_EXTS.includes(ext)) {
    throw createError({ statusCode: 422, statusMessage: 'Formato de CV no válido (PDF, DOC o DOCX).' })
  }
  if (cv.data.length > MAX_CV_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'El CV supera los 5 MB.' })
  }

  // Persistimos la postulación para la bandeja de /admin: CV a Storage (privado) + doc con la ruta.
  // Independiente del email; try/catch por pieza → nunca rompe el submit.
  let cvMeta = { cvPath: null, cvFilename: cv.filename }
  try {
    cvMeta = await uploadCv(cv)
  } catch (e) {
    console.error('[postular] uploadCv falló (se guarda el lead sin CV en Storage):', e?.message || e)
  }
  try {
    await saveLead('jobApplications', {
      nombre: d.nombre, apellido: d.apellido, telefono: d.telefono, correo: d.correo,
      mensaje: d.mensaje, cvPath: cvMeta.cvPath, cvFilename: cvMeta.cvFilename
    })
  } catch (e) {
    console.error('[postular] saveLead falló (se continúa con el email):', e?.message || e)
  }

  const { resendApiKey, mailFrom, careersTo } = useRuntimeConfig(event)
  if (!resendApiKey) {
    console.error('[postular] RESEND_API_KEY no configurada')
    throw createError({ statusCode: 500, statusMessage: 'El envío de correo no está configurado.' })
  }

  const resend = new Resend(resendApiKey)
  const { error } = await resend.emails.send({
    from: mailFrom,
    to: careersTo.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: d.correo,
    subject: `Nueva postulación — ${d.nombre} ${d.apellido}`,
    html: renderLeadEmail({
      title: 'Nueva postulación',
      rows: [
        ['Nombre', `${d.nombre} ${d.apellido}`],
        ['Correo', d.correo],
        ['Teléfono', d.telefono],
        ['CV', cv.filename]
      ],
      message: d.mensaje
    }),
    attachments: [{ filename: cv.filename, content: cv.data }]
  })

  if (error) {
    console.error('[postular] Resend error:', error)
    throw createError({ statusCode: 502, statusMessage: 'No pudimos enviar tu postulación. Inténtalo más tarde.' })
  }

  return { ok: true }
})
