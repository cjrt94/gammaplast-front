// Datos de contacto del sitio (singletons/contact vía /api/content/contact) — ÚNICA fuente de
// verdad para footer, barra superior, JSON-LD (app.vue) y las páginas de contacto.
// useAsyncData con key fija ⇒ una sola petición compartida entre todos los consumidores.
export const useContact = () => useAsyncData('site-contact', () => $fetch('/api/content/contact'), {
  default: () => ({ address: {}, phones: [], phonesRaw: [], emails: [], mapEmbedUrl: '', social: [] })
})
