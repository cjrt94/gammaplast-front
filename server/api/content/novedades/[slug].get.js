// Una novedad por slug. 404 si no existe o no está publicada. Cacheado 5 min con SWR (por slug).
export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const novedad = await fetchNovedad(slug)
  if (!novedad) throw createError({ statusCode: 404, statusMessage: 'Novedad no encontrada.' })
  return novedad
}, { maxAge: 300, swr: true, name: 'content', getKey: (event) => `novedad:${getRouterParam(event, 'slug')}` })
