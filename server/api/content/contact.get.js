// Datos de contacto (singleton) — única fuente de verdad para footer, topbar, JSON-LD y las
// páginas de contacto. Cacheado 60 s con SWR.
export default defineCachedEventHandler(async () => {
  return await fetchSingleton('contact')
}, { maxAge: 60, swr: true, name: 'content', getKey: () => 'contact' })
