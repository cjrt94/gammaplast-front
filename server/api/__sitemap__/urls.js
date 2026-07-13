import { novedades } from '~/data/novedades.js'

// Inyecta las rutas dinámicas de novedades al sitemap. `_i18nTransform` expande
// cada URL a todas las locales (ES + /en) con sus alternates hreflang.
export default defineEventHandler(() =>
  novedades.map((n) => ({
    loc: `/novedades/${n.slug}`,
    lastmod: n.date,
    _i18nTransform: true
  }))
)
