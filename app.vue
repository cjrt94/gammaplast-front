<script setup>
const site = 'https://gammaplast.com.pe'

// Grafo global schema.org: Organización + negocio local + sitio web.
// Los datos por página (WebPage, ItemList, Article, FAQ, breadcrumbs) se añaden
// en cada page vía useJsonLd(); referencian a #organization / #website por @id.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site}/#organization`,
            name: 'Gamma Plast',
            url: site,
            logo: `${site}/logo.png`,
            image: `${site}/og-cover.jpg`,
            description: 'Fabricante peruano de empaques flexibles de PE y PP, reciclables y compostables, con certificación FDA.',
            email: 'comercial@gammaplast.com.pe',
            telephone: ['+51908865429', '+51908858154'],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Calle Luis Galvani 310, Urb. Santa Rosa',
              addressLocality: 'Ate',
              addressRegion: 'Lima',
              addressCountry: 'PE'
            },
            areaServed: 'PE',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: 'comercial@gammaplast.com.pe',
              telephone: '+51908865429',
              areaServed: 'PE',
              availableLanguage: ['es', 'en']
            }
            // TODO(cliente): añadir "sameAs": [redes sociales] cuando existan perfiles oficiales.
          },
          {
            '@type': 'LocalBusiness',
            '@id': `${site}/#localbusiness`,
            name: 'Gamma Plast',
            url: site,
            image: `${site}/og-cover.jpg`,
            email: 'comercial@gammaplast.com.pe',
            telephone: ['+51908865429', '+51908858154'],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Calle Luis Galvani 310, Urb. Santa Rosa',
              addressLocality: 'Ate',
              addressRegion: 'Lima',
              addressCountry: 'PE'
            },
            areaServed: 'PE',
            parentOrganization: { '@id': `${site}/#organization` }
          },
          {
            '@type': 'WebSite',
            '@id': `${site}/#website`,
            url: site,
            name: 'Gamma Plast',
            inLanguage: ['es-PE', 'en-US'],
            publisher: { '@id': `${site}/#organization` }
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
