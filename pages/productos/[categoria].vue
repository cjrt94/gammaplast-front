<script setup>
const route = useRoute()
const localePath = useLocalePath()
const { findCategory } = useCatalog()

const category = computed(() => findCategory(route.params.categoria))
if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada', fatal: true })
}
useHead(() => ({ title: `${category.value.name} — Productos — Gamma Plast` }))
</script>

<template>
  <div v-if="category">
    <div class="wrap pt-8 pb-1">
      <nav class="reveal text-[.9rem] text-slate flex items-center gap-2">
        <NuxtLink :to="localePath('/productos')" class="hover:text-green-700">Productos</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="text-ink">{{ category.name }}</span>
      </nav>
    </div>

    <PageHero eyebrow="Productos" :title="category.name" :intro="category.desc" />

    <section class="sec">
      <div class="wrap">
        <h2 class="text-[1.5rem] mb-7 reveal">Productos de referencia</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
          <article v-for="p in category.products" :key="p.name"
            class="reveal card overflow-hidden flex flex-col">
            <div class="aspect-square bg-mist grid place-items-center p-5">
              <img :src="p.img" :alt="p.name" width="400" height="400" class="max-h-full max-w-full object-contain" loading="lazy" >
            </div>
            <div class="p-4 border-t border-line">
              <h3 class="text-[1.02rem] font-display font-bold text-ink">{{ p.name }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="sec-mist py-14">
      <div class="wrap text-center max-w-[620px] mx-auto">
        <h2 class="text-[1.6rem] mb-3 reveal">¿Necesitas un empaque a medida?</h2>
        <p class="text-slate mb-6 reveal">Cuéntanos sobre tu producto y te asesoramos en el material, formato y acabado ideales.</p>
        <NuxtLink :to="localePath('/contacto')" class="btn btn-green reveal">Contacta a un asesor</NuxtLink>
      </div>
    </section>
  </div>
</template>
