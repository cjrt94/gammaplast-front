// Inyecta las rutas dinámicas de novedades al sitemap, leídas del CMS (Firestore).
// `_i18nTransform` expande cada URL a todas las locales (ES + /en) con sus alternates hreflang.
export default defineEventHandler(async () => {
  const novedades = await fetchNovedades()
  return novedades.map((n) => ({
    loc: `/novedades/${n.slug}`,
    lastmod: n.date,
    _i18nTransform: true
  }))
})
