// Página Nosotros (singleton) + grid de certificaciones. Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  const [nosotros, certifications] = await Promise.all([
    fetchSingleton('nosotros'),
    fetchCollection('certifications')
  ])
  return { nosotros, certifications }
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'nosotros' })
