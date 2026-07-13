// Helpers de datos estructurados (schema.org / JSON-LD).
// Se inyectan como <script type="application/ld+json"> vía useHead.
const SITE = 'https://gammaplast.com.pe'

// Inyecta un bloque JSON-LD. `data` es un objeto (o array) schema.org ya armado.
export function useJsonLd (data) {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }]
  })
}

// Referencia reutilizable a la organización global definida en app.vue.
export const orgRef = { '@id': `${SITE}/#organization` }

// Construye un BreadcrumbList. `items`: [{ name, path }] con path relativo (locale-prefixed).
export function breadcrumbLd (items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE + it.path
    }))
  }
}
