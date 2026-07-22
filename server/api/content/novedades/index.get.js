// Lista de novedades publicadas. Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchNovedades()
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'novedades' })
