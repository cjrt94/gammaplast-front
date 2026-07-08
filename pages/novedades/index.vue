<script setup>
import { novedades, formatDate } from '~/data/novedades.js'
const localePath = useLocalePath()
useHead({ title: 'Novedades — Gamma Plast' })
</script>

<template>
  <PageHero eyebrow="Novedades" title="Noticias e información del sector"
    intro="Novedades de Gamma Plast y del mundo de los empaques flexibles y la industria del plástico." />

  <section class="sec">
    <div class="wrap">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        <NuxtLink v-for="n in novedades" :key="n.slug" :to="localePath('/novedades/' + n.slug)"
          class="reveal card card-hover overflow-hidden flex flex-col">
          <div class="aspect-[16/10] bg-mist grid place-items-center p-6 overflow-hidden">
            <img :src="n.image" :alt="n.title" class="max-h-full max-w-full object-contain" loading="lazy" >
          </div>
          <div class="p-6 flex flex-col gap-2 flex-1 border-t border-line">
            <time class="text-[.82rem] font-display font-semibold uppercase tracking-wide text-green-700">{{ formatDate(n.date) }}</time>
            <h2 class="text-[1.2rem] leading-snug">{{ n.title }}</h2>
            <p class="text-slate text-[.95rem] flex-1">{{ n.excerpt }}</p>
            <span class="inline-flex items-center gap-1.5 font-display font-bold text-green-700 text-[.9rem] mt-1">
              Leer más <BaseIcon name="arrow" class="w-4 h-4" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
