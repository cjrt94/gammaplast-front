// Validación de formularios de captación (contacto / trabaja con nosotros).
// Patrón del equipo (memoria de Charlie): schema Zod con .min(1) obligatorio + .max(N)
// con mensaje, enlazado a `maxlength` en el input. El MISMO schema debe reusarse en el
// backend (Dean) al conectar el envío — la validación cliente es UX, no barrera.
import { z } from 'zod'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Campos comunes a ambos formularios.
const nombre = z.string().trim().min(1, 'Ingresa tu nombre.').max(40, 'Máximo 40 caracteres.')
const apellido = z.string().trim().min(1, 'Ingresa tu apellido.').max(40, 'Máximo 40 caracteres.')
const correo = z.string().trim().toLowerCase()
  .min(1, 'Ingresa tu correo.')
  .max(120, 'Máximo 120 caracteres.')
  .regex(EMAIL, 'Escribe un correo válido, por ejemplo nombre@empresa.com.')
const telefono = z.string().trim().max(20, 'Máximo 20 caracteres.') // opcional (vacío permitido)

export const contactSchema = z.object({
  nombre,
  apellido,
  telefono,
  correo,
  empresa: z.string().trim().max(80, 'Máximo 80 caracteres.'), // opcional
  mensaje: z.string().trim().min(1, 'Cuéntanos brevemente qué necesitas.').max(1500, 'Máximo 1500 caracteres.')
})

export const careersSchema = z.object({
  nombre,
  apellido,
  telefono,
  correo,
  mensaje: z.string().trim().max(1500, 'Máximo 1500 caracteres.') // opcional
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
