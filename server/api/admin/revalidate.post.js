// Invalida el cache de las rutas /api/content/* (llamado por /admin tras cada guardado/borrado).
// Así una edición se ve en la web al instante, sin esperar a que expire el SWR de 5 min.
// Autenticado: exige un ID token de Firebase válido.
export default defineEventHandler(async (event) => {
  const authz = getHeader(event, 'authorization') || ''
  const token = authz.startsWith('Bearer ') ? authz.slice(7) : ''
  if (!token) throw createError({ statusCode: 401, statusMessage: 'No autorizado.' })
  try {
    await adminAuth().verifyIdToken(token)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Sesión inválida.' })
  }

  // Las rutas de contenido se cachean con name:'content' → sus entradas contienen 'content'
  // en la clave del storage de cache. Borramos esas (fallback: si no matchea, limpiamos todo).
  const storage = useStorage('cache')
  const keys = await storage.getKeys()
  const target = keys.filter((k) => k.includes('content'))
  const toClear = target.length ? target : keys
  await Promise.all(toClear.map((k) => storage.removeItem(k)))
  return { ok: true, cleared: toClear.length }
})
