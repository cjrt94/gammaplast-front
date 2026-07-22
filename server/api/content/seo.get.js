// SEO por página + FAQ (singleton). Cacheado 5 min con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('seo')
}, { maxAge: 300, swr: true, name: 'content', getKey: () => 'seo' })
