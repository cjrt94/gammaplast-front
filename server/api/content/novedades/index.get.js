// Lista de novedades publicadas. Cacheado 5 min con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchNovedades()
}, { maxAge: 300, swr: true, name: 'content', getKey: () => 'novedades' })
