// Copys por página (singleton). Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('pages')
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'pages' })
