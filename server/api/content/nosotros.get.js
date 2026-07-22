// Página Nosotros (singleton) + grid de certificaciones. Cacheado 5 min con SWR.
export default defineCachedEventHandler(async () => {
  const [nosotros, certifications] = await Promise.all([
    fetchSingleton('nosotros'),
    fetchCollection('certifications')
  ])
  return { nosotros, certifications }
}, { maxAge: 300, swr: true, name: 'content', getKey: () => 'nosotros' })
