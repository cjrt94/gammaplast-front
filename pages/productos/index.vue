<script setup>
const { categories } = useCatalog()
const localePath = useLocalePath()
useHead({ title: 'Productos — Gamma Plast' })
</script>

<template>
  <PageHero
    eyebrow="Nuestros productos"
    title="Empaques flexibles para cada industria"
    intro="Nuestros empaques están diseñados para adaptarse a las necesidades específicas de cada industria, garantizando calidad, resistencia y eficiencia en cada etapa de la cadena de distribución." />

  <section class="sec">
    <div class="wrap">
      <div class="grid md:grid-cols-2 gap-[18px]">
        <NuxtLink v-for="c in categories" :key="c.slug" :to="localePath('/productos/' + c.slug)"
          class="reveal card card-hover p-8 flex flex-col gap-4">
          <span class="ico-tile w-14 h-14"><BaseIcon :name="c.icon" class="w-7 h-7" /></span>
          <h2 class="text-[1.4rem]">{{ c.name }}</h2>
          <p class="text-slate flex-1">{{ c.tagline }}</p>
          <span class="inline-flex items-center gap-1.5 font-display font-bold text-green-700">
            Ver productos <BaseIcon name="arrow" class="w-4 h-4" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="sec-mist py-14">
    <div class="wrap flex flex-wrap items-center justify-between gap-6">
      <div class="flex flex-wrap gap-3">
        <span class="chip"><BaseIcon name="check" />Materiales monocapa y laminado / coextrusión</span>
        <span class="chip"><BaseIcon name="check" />Grado alimentario FDA</span>
        <span class="chip"><BaseIcon name="recycle" />Reciclables y compostables</span>
      </div>
      <NuxtLink :to="localePath('/contacto')" class="btn btn-green">Contacta a un asesor</NuxtLink>
    </div>
  </section>
</template>
