// Logos de clientes (marquee del Home). Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchCollection('clientLogos')
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'clientLogos' })
