// SEO por página — envuelve useSeoMeta para title + description + Open Graph + Twitter.
// El canonical, los hreflang y og:url/og:locale los gestiona useLocaleHead() en el layout.
//
// Uso:  useSeo({ title: 'Productos', description: '…' })
//   - title: se le añade « — Gamma Plast » salvo appendBrand:false (útil para el home).
//   - image: ruta relativa (se hace absoluta) o URL; por defecto /og-cover.jpg.
//   - type:  og:type ('website' por defecto, 'article' en notas).
const SITE = 'https://gammaplast.com.pe'
const BRAND = 'Gamma Plast'

export function useSeo (opts = {}) {
  const raw = opts.title || ''
  const title = raw && opts.appendBrand !== false ? `${raw} — ${BRAND}` : (raw || BRAND)
  const image = opts.image
    ? (/^https?:\/\//.test(opts.image) ? opts.image : SITE + opts.image)
    : `${SITE}/og-cover.jpg`

  useSeoMeta({
    title,
    description: opts.description,
    ogTitle: title,
    ogDescription: opts.description,
    ogImage: image,
    ogType: opts.type || 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: opts.description,
    twitterImage: image
  })
}
