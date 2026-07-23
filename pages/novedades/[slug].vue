<script setup>
import { formatDate } from '~/data/novedades.js'
const route = useRoute()
const localePath = useLocalePath()

// Nota + lista de novedades desde el CMS (Firestore). La ruta [slug] devuelve 404 si no existe.
const { data: article } = await useFetch(`/api/content/novedades/${route.params.slug}`)
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nota no encontrada', fatal: true })
}
const { data: lista } = await useFetch('/api/content/novedades', { default: () => [] })
const otras = computed(() => lista.value.filter((n) => n.slug !== route.params.slug).slice(0, 2))
const { data: pages } = await usePages()
const articleCta = computed(() => pages.value.novedades?.articleCta || '')
const { t } = useI18n()
const site = 'https://gammaplast.com.pe'

useSeo({
  title: article.value.title,
  description: article.value.excerpt,
  image: article.value.image,
  type: 'article'
})

const articleUrl = site + localePath('/novedades/' + article.value.slug)
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.value.title,
  description: article.value.excerpt,
  image: site + article.value.image,
  datePublished: article.value.date,
  dateModified: article.value.date,
  url: articleUrl,
  mainEntityOfPage: articleUrl,
  author: orgRef,
  publisher: orgRef
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.news'), path: localePath('/novedades') },
  { name: article.value.title, path: localePath('/novedades/' + article.value.slug) }
]))
</script>

<template>
  <div>
    <article v-if="article">
      <!-- Cabecera -->
      <header class="sec-mist border-b border-line">
        <div class="wrap py-12 md:py-16">
          <div class="max-w-[760px] mx-auto">
            <NuxtLink :to="localePath('/novedades')" class="reveal inline-flex items-center gap-1.5 text-slate hover:text-green-700 text-sm mb-6">
              <BaseIcon name="arrow" class="w-4 h-4 rotate-180" /> Volver a Novedades
            </NuxtLink>
            <time :datetime="article.date" class="reveal block text-xs font-display font-bold uppercase tracking-[.14em] text-green-700 mb-3">{{ formatDate(article.date) }}</time>
            <h1 class="reveal text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.12]">{{ article.title }}</h1>
            <p v-if="article.excerpt" class="reveal text-[1.2rem] text-slate mt-5 max-w-[60ch]">{{ article.excerpt }}</p>
          </div>
        </div>
      </header>

      <!-- Imagen destacada -->
      <div class="wrap">
        <div class="max-w-[960px] mx-auto">
          <img :src="article.image" :alt="article.title" width="1200" height="675"
            class="reveal w-full aspect-[16/9] object-cover rounded-card mt-10 md:mt-12">
        </div>
      </div>

      <!-- Cuerpo -->
      <section class="sec pt-10 md:pt-12">
        <div class="wrap">
          <div class="max-w-[680px] mx-auto space-y-6 text-[1.12rem] text-body leading-relaxed">
            <p v-for="(p, i) in article.body" :key="i" class="reveal" :class="i === 0 ? 'text-[1.26rem] leading-relaxed text-ink' : ''">{{ p }}</p>
          </div>
          <div class="max-w-[680px] mx-auto mt-12 pt-8 border-t border-line reveal">
            <p class="text-slate mb-4">{{ articleCta }}</p>
            <NuxtLink :to="localePath('/contacto')" class="btn btn-green">Contacta a un asesor</NuxtLink>
          </div>
        </div>
      </section>

      <!-- Más novedades -->
      <section v-if="otras.length" class="sec sec-mist border-t border-line">
        <div class="wrap">
          <div class="max-w-[960px] mx-auto">
            <h2 class="text-2xl mb-7 reveal">Más novedades</h2>
            <div class="grid sm:grid-cols-2 gap-5">
              <NuxtLink v-for="n in otras" :key="n.slug" :to="localePath('/novedades/' + n.slug)"
                :aria-label="'Leer nota: ' + n.title"
                class="reveal group card card-hover overflow-hidden flex flex-col">
                <div class="relative aspect-[16/10] bg-mist overflow-hidden">
                  <ZoomImage :src="n.image" :alt="n.title" width="800" height="500" />
                </div>
                <div class="p-5 flex flex-col gap-1.5 border-t border-line">
                  <time :datetime="n.date" class="text-xs font-display font-bold uppercase tracking-wide text-green-700">{{ formatDate(n.date) }}</time>
                  <h3 class="text-lg leading-snug">{{ n.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
