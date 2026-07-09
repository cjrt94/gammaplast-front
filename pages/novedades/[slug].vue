<script setup>
import { novedades, formatDate } from '~/data/novedades.js'
const route = useRoute()
const localePath = useLocalePath()

const article = computed(() => novedades.find((n) => n.slug === route.params.slug))
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nota no encontrada', fatal: true })
}
const otras = computed(() => novedades.filter((n) => n.slug !== route.params.slug).slice(0, 2))
useHead(() => ({ title: `${article.value.title} — Gamma Plast` }))
</script>

<template>
  <article v-if="article">
    <section class="sec-mist border-b border-line">
      <div class="wrap py-14 max-w-[760px]">
        <NuxtLink :to="localePath('/novedades')" class="reveal inline-flex items-center gap-1.5 text-slate hover:text-green-700 text-sm mb-5">
          <BaseIcon name="arrow" class="w-4 h-4 rotate-180" /> Volver a Novedades
        </NuxtLink>
        <time :datetime="article.date" class="reveal block text-xs font-display font-semibold uppercase tracking-wide text-green-700 mb-3">{{ formatDate(article.date) }}</time>
        <h1 class="reveal text-[clamp(1.9rem,4vw,2.8rem)]">{{ article.title }}</h1>
      </div>
    </section>

    <section class="sec">
      <div class="wrap max-w-[68ch]">
        <div class="reveal card overflow-hidden bg-mist grid place-items-center p-10 mb-10">
          <img :src="article.image" :alt="article.title" class="max-h-[360px] max-w-full object-contain" >
        </div>
        <div class="reveal space-y-5 text-lg text-body leading-relaxed">
          <p v-for="(p, i) in article.body" :key="i">{{ p }}</p>
        </div>
      </div>
    </section>

    <section v-if="otras.length" class="sec-mist">
      <div class="wrap">
        <h2 class="text-2xl mb-7 reveal">Más novedades</h2>
        <div class="grid md:grid-cols-2 gap-5">
          <NuxtLink v-for="n in otras" :key="n.slug" :to="localePath('/novedades/' + n.slug)"
            :aria-label="'Leer nota: ' + n.title"
            class="reveal card card-hover p-6 flex flex-col gap-2">
            <time :datetime="n.date" class="text-xs font-display font-semibold uppercase tracking-wide text-green-700">{{ formatDate(n.date) }}</time>
            <h3 class="text-lg leading-snug">{{ n.title }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>
  </article>
</template>
