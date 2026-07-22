// Logos de clientes (marquee del Home). Cacheado 5 min con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchCollection('clientLogos')
}, { maxAge: 300, swr: true, name: 'content', getKey: () => 'clientLogos' })
