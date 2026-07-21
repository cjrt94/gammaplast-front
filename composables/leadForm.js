// Validación de formularios. Patrón del equipo (memoria de Charlie): schema Zod con .min(1)
// obligatorio + .max(N) con mensaje, enlazado a `maxlength` en el input. El MISMO schema se
// reusa en el backend (Dean). La validación cliente es UX; el servidor es la barrera real.
//
// Dos formularios de contacto (feedback cliente web.docx):
//  - contactSchema  → "Contacto" (general, form corto).
//  - advisorSchema  → "Contacta un asesor" (lead calificado: Ubicación + RUC, todo obligatorio).
import { z } from 'zod'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Campos comunes.
const nombre = z.string().trim().min(1, 'Ingresa tu nombre.').max(40, 'Máximo 40 caracteres.')
const apellido = z.string().trim().min(1, 'Ingresa tu apellido.').max(40, 'Máximo 40 caracteres.')
const correo = z.string().trim().toLowerCase()
  .min(1, 'Ingresa tu correo.')
  .max(120, 'Máximo 120 caracteres.')
  .regex(EMAIL, 'Escribe un correo válido, por ejemplo nombre@empresa.com.')
// Opcional: `.default('')` acepta clave ausente (undefined → '') además de vacío.
const telefonoOpt = z.string().trim().max(20, 'Máximo 20 caracteres.').default('')

// Contacto general — form corto: nombre, apellido, correo y mensaje obligatorios.
export const contactSchema = z.object({
  nombre,
  apellido,
  telefono: telefonoOpt,
  correo,
  empresa: z.string().trim().max(80, 'Máximo 80 caracteres.').default(''),
  mensaje: z.string().trim().min(1, 'Cuéntanos brevemente en qué te ayudamos.').max(1500, 'Máximo 1500 caracteres.')
})

// Contacta un asesor — lead calificado: TODOS los campos obligatorios + Ubicación y RUC/ID.
export const advisorSchema = z.object({
  nombre,
  apellido,
  empresa: z.string().trim().min(1, 'Ingresa el nombre de tu empresa.').max(80, 'Máximo 80 caracteres.'),
  ruc: z.string().trim().min(1, 'Ingresa tu RUC o identificación.').max(20, 'Máximo 20 caracteres.'),
  correo,
  telefono: z.string().trim().min(1, 'Ingresa tu teléfono.').max(20, 'Máximo 20 caracteres.'),
  departamento: z.string().trim().min(1, 'Ingresa tu departamento.').max(56, 'Máximo 56 caracteres.'),
  provincia: z.string().trim().min(1, 'Ingresa tu provincia.').max(56, 'Máximo 56 caracteres.'),
  distrito: z.string().trim().min(1, 'Ingresa tu distrito.').max(56, 'Máximo 56 caracteres.'),
  mensaje: z.string().trim().min(1, 'Cuéntanos brevemente qué necesitas.').max(1500, 'Máximo 1500 caracteres.')
})

export const careersSchema = z.object({
  nombre,
  apellido,
  telefono: telefonoOpt,
  correo,
  mensaje: z.string().trim().max(1500, 'Máximo 1500 caracteres.').default('')
})

// Mapea el resultado de safeParse a { campo: primerMensaje } para pintar los errores por campo.
export function fieldErrors (result) {
  const out = {}
  if (result.success) return out
  for (const issue of result.error.issues) {
    const key = issue.path[0]
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
