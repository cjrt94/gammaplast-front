// Ajustes globales del sitio (singleton). Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('settings')
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'settings' })
