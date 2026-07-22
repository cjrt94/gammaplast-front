// Catálogo completo (sectores + productos + materiales) para Home y Productos.
// Cacheado 60 s con SWR: bajo tráfico las lecturas a Firestore son casi nulas; el contenido
// solo cambia cuando un admin guarda. Las lecturas van por Admin SDK (ignora security rules).
export default defineCachedEventHandler(async () => {
  const [sectors, products, materials] = await Promise.all([
    fetchCollection('sectors'),
    fetchCollection('products'),
    fetchSingleton('materials')
  ])
  return { sectors, products, materials }
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'catalog' })
