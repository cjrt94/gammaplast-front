// SEO por página + FAQ (singleton). Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('seo')
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'seo' })
