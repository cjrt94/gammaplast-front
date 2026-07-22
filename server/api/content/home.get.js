// Contenido del Home (hero, banda de certificaciones, planta, procesos, productos) + tira de
// logos de certificación. Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  const [home, certLogos] = await Promise.all([
    fetchSingleton('home'),
    fetchCollection('certLogos')
  ])
  return { home, certLogos }
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'home' })
