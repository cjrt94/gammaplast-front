import { Resend } from 'resend'
import { contactSchema } from '~/composables/leadForm'

// Envío del formulario de Contacto general → comercial@ / comercial2@gammaplast.com.pe.
// Revalida con el MISMO schema Zod del cliente (leadForm.js). La validación cliente es UX;
// ésta es la barrera real.
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Honeypot anti-spam: humanos dejan `website` vacío. Si viene lleno → bot: fingir éxito sin enviar.
  if (body && body.website) return { ok: true }

  const parsed = contactSchema.safeParse(body || {})
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: 'Revisa los datos del formulario.' })
  }
  const d = parsed.data

  // Persistimos el lead para la bandeja de /admin. Fuente durable, independiente del email
  // (no queremos perder el lead si Resend falla). try/catch → nunca rompe el submit.
  try {
    await saveLead('contactMessages', {
      nombre: d.nombre, apellido: d.apellido, telefono: d.telefono,
      correo: d.correo, empresa: d.empresa, mensaje: d.mensaje, source: 'contacto'
    })
  } catch (e) {
    console.error('[contacto] saveLead falló (se continúa con el email):', e?.message || e)
  }

  const { resendApiKey, mailFrom, contactTo } = useRuntimeConfig(event)
  if (!resendApiKey) {
    console.error('[contacto] RESEND_API_KEY no configurada')
    throw createError({ statusCode: 500, statusMessage: 'El envío de correo no está configurado.' })
  }

  const resend = new Resend(resendApiKey)
  const { error } = await resend.emails.send({
    from: mailFrom,
    to: contactTo.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: d.correo,
    subject: `Nuevo contacto web — ${d.nombre} ${d.apellido}${d.empresa ? ' · ' + d.empresa : ''}`,
    html: renderLeadEmail({
      title: 'Nuevo mensaje de contacto',
      rows: [
        ['Nombre', `${d.nombre} ${d.apellido}`],
        ['Correo', d.correo],
        ['Teléfono', d.telefono],
        ['Empresa', d.empresa]
      ],
      message: d.mensaje
    })
  })

  if (error) {
    console.error('[contacto] Resend error:', error)
    throw createError({ statusCode: 502, statusMessage: 'No pudimos enviar tu mensaje. Inténtalo más tarde.' })
  }

  return { ok: true }
})
