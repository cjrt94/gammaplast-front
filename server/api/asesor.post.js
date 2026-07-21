import { Resend } from 'resend'
import { advisorSchema } from '~/composables/leadForm'

// Envío del formulario "Contacta un asesor" (lead calificado) → comercial@ / comercial2@.
// Revalida con el MISMO schema Zod del cliente (leadForm.js). La validación cliente es UX;
// ésta es la barrera real.
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Honeypot anti-spam: humanos dejan `website` vacío. Si viene lleno → bot: fingir éxito sin enviar.
  if (body && body.website) return { ok: true }

  const parsed = advisorSchema.safeParse(body || {})
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: 'Revisa los datos del formulario.' })
  }
  const d = parsed.data

  const { resendApiKey, mailFrom, contactTo } = useRuntimeConfig(event)
  if (!resendApiKey) {
    console.error('[asesor] RESEND_API_KEY no configurada')
    throw createError({ statusCode: 500, statusMessage: 'El envío de correo no está configurado.' })
  }

  const resend = new Resend(resendApiKey)
  const { error } = await resend.emails.send({
    from: mailFrom,
    to: contactTo.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: d.correo,
    subject: `Solicitud de asesor — ${d.nombre} ${d.apellido}${d.empresa ? ' · ' + d.empresa : ''}`,
    html: renderLeadEmail({
      title: 'Nueva solicitud de asesoría',
      rows: [
        ['Nombre', `${d.nombre} ${d.apellido}`],
        ['Empresa', d.empresa],
        ['RUC / Identificación', d.ruc],
        ['Correo', d.correo],
        ['Teléfono', d.telefono],
        ['Ubicación', `${d.departamento}, ${d.provincia}, ${d.distrito}`]
      ],
      message: d.mensaje
    })
  })

  if (error) {
    console.error('[asesor] Resend error:', error)
    throw createError({ statusCode: 502, statusMessage: 'No pudimos enviar tu mensaje. Inténtalo más tarde.' })
  }

  return { ok: true }
})
