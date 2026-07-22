// Genera una URL firmada temporal (5 min) para descargar un CV desde /admin. Autenticado:
// exige un ID token de Firebase válido en Authorization: Bearer. Los CVs son privados en Storage
// (storage.rules los cierra); solo se sirven por aquí.
export default defineEventHandler(async (event) => {
  const authz = getHeader(event, 'authorization') || ''
  const token = authz.startsWith('Bearer ') ? authz.slice(7) : ''
  if (!token) throw createError({ statusCode: 401, statusMessage: 'No autorizado.' })
  try {
    await adminAuth().verifyIdToken(token)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Sesión inválida.' })
  }

  const { cvPath } = await readBody(event)
  if (!cvPath || typeof cvPath !== 'string' || !cvPath.startsWith('cv/')) {
    throw createError({ statusCode: 400, statusMessage: 'Ruta de CV inválida.' })
  }

  const [url] = await adminBucket().file(cvPath).getSignedUrl({
    action: 'read',
    expires: Date.now() + 5 * 60 * 1000
  })
  return { url }
})
