// Datos de contacto (singleton) — única fuente de verdad para footer, topbar, JSON-LD y las
// páginas de contacto. Cacheado 5 min con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('contact')
}, { maxAge: 300, swr: true, name: 'content', getKey: () => 'contact' })
