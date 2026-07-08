<script setup>
const site = 'https://gammaplast.com.pe'
useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Gamma Plast' },
    { property: 'og:title', content: 'Gamma Plast — Empaques flexibles' },
    { property: 'og:description', content: 'Fabricante peruano de empaques flexibles de PE y PP: reciclables, compostables y con certificación FDA.' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Gamma Plast',
        description: 'Fabricante peruano de empaques flexibles de PE y PP, reciclables y compostables, con certificación FDA.',
        url: site,
        email: 'comercial@gammaplast.com.pe',
        telephone: ['+51908865429', '+51908858154'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Luis Galvani 310, Urb. Santa Rosa',
          addressLocality: 'Ate',
          addressRegion: 'Lima',
          addressCountry: 'PE'
        },
        areaServed: 'PE'
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
