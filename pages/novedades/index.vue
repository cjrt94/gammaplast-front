<script setup>
import { novedades, formatDate } from '~/data/novedades.js'
const localePath = useLocalePath()
const { t } = useI18n()
const site = 'https://gammaplast.com.pe'

useSeo({ title: t('seo.news.title'), description: t('seo.news.description') })
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  url: site + localePath('/novedades'),
  name: t('seo.news.title'),
  description: t('seo.news.description'),
  isPartOf: { '@id': site + '/#website' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: novedades.length,
    itemListElement: novedades.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: site + localePath('/novedades/' + n.slug),
      name: n.title
    }))
  }
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.news'), path: localePath('/novedades') }
]))
</script>

<template>
  <PageHero eyebrow="Novedades" title="Noticias e información del sector"
    intro="Novedades de Gamma Plast y del mundo de los empaques flexibles y la industria del plástico." />

  <section class="sec">
    <div class="wrap">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink v-for="n in novedades" :key="n.slug" :to="localePath('/novedades/' + n.slug)"
          :aria-label="'Leer nota: ' + n.title"
          class="reveal group card card-hover overflow-hidden flex flex-col">
          <div class="relative aspect-[16/10] bg-mist overflow-hidden">
            <img :src="n.image" :alt="n.title" width="800" height="500" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
          </div>
          <div class="p-6 flex flex-col gap-2 flex-1 border-t border-line">
            <time :datetime="n.date" class="text-xs font-display font-semibold uppercase tracking-wide text-green-700">{{ formatDate(n.date) }}</time>
            <h2 class="text-xl leading-snug">{{ n.title }}</h2>
            <p class="text-slate text-sm flex-1">{{ n.excerpt }}</p>
            <span class="inline-flex items-center gap-1.5 font-display font-bold text-green-700 text-sm mt-1">
              Leer más <BaseIcon name="arrow" class="w-4 h-4" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
