// Copys por página (singletons/pages vía /api/content/pages): héroes de las páginas internas +
// bloques de marketing (CTAs, tarjetas, encabezados, chips). Key fija ⇒ una sola petición.
export const usePages = () => useAsyncData('site-pages', () => $fetch('/api/content/pages'), {
  default: () => ({})
})
