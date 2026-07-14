<script setup>
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

const steps = tm('home.process.steps')
const stepIcons = ['film', 'print', 'scissors', 'seal']

const categories = computed(() => [
  { key: 'food', icon: 'food', slug: 'alimentos-y-bebidas', name: t('categories.food.name'), short: t('categories.food.short') },
  { key: 'industry', icon: 'industry', slug: 'industria-en-general', name: t('categories.industry.name'), short: t('categories.industry.short') },
  { key: 'retail', icon: 'retail', slug: 'retail-y-e-commerce', name: t('categories.retail.name'), short: t('categories.retail.short') },
  { key: 'agro', icon: 'agro', slug: 'pesca-y-agroindustria', name: t('categories.agro.name'), short: t('categories.agro.short') }
])

useSeo({ title: t('seo.home.title'), description: t('seo.home.description'), appendBrand: false })

const homeUrl = 'https://gammaplast.com.pe' + localePath('/')
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': homeUrl + '#webpage',
  url: homeUrl,
  name: t('seo.home.title'),
  description: t('seo.home.description'),
  isPartOf: { '@id': 'https://gammaplast.com.pe/#website' },
  about: orgRef
})
</script>

<template>
  <!-- HERO -->
  <section class="relative overflow-hidden bg-paper bg-[radial-gradient(120%_120%_at_88%_8%,theme(colors.green.tint2)_0%,transparent_46%)]">
    <div class="wrap grid md:grid-cols-[1.05fr_.95fr] gap-10 items-center py-[74px] max-md:py-[52px]">
      <div class="reveal">
        <span class="eyebrow block mb-4">{{ t('home.hero.eyebrow') }}</span>
        <h1 class="text-[clamp(2.5rem,5.4vw,4rem)] mb-5">
          {{ t('home.hero.title') }} <span class="text-green">{{ t('home.hero.titleAccent') }}</span>
        </h1>
        <p class="text-[1.2rem] max-w-[33ch] mb-7 text-body">{{ t('home.hero.lead') }}</p>
        <div class="flex flex-wrap gap-3.5 mb-8">
          <NuxtLink :to="localePath('/contacto')" class="btn btn-green">{{ t('cta.advisor') }}</NuxtLink>
          <NuxtLink :to="localePath('/productos')" class="btn btn-ghost">{{ t('cta.seeProducts') }}</NuxtLink>
        </div>
        <div class="flex flex-wrap gap-2.5">
          <span class="chip"><BaseIcon name="check" />{{ t('home.hero.chipFda') }}</span>
          <span class="chip"><BaseIcon name="recycle" />{{ t('home.hero.chipRecycle') }}</span>
          <span class="chip"><BaseIcon name="bars" />{{ t('home.hero.chipPrint') }}</span>
        </div>
      </div>

      <!-- Sin .reveal: contiene la imagen LCP (doypack, fetchpriority=high); no debe arrancar oculta. -->
      <div class="relative min-h-[440px] max-md:min-h-[360px] grid place-items-center">
        <img src="/isotipo.png" alt="" aria-hidden="true" width="5000" height="5000" loading="lazy"
          class="absolute w-[118%] max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0">
        <img src="/products/pouch-valvula.png" alt="Pouch con válvula Gamma Plast" width="385" height="640" loading="lazy"
          class="absolute w-[34%] right-0 top-[4%] z-[2]">
        <img src="/products/tote.png" alt="Bolsa con asas Gamma Plast" width="508" height="640" loading="lazy"
          class="absolute w-[40%] left-[-2%] bottom-[2%] z-[2]">
        <img src="/products/doypack.png" alt="Doypack Gamma Plast" width="391" height="640" fetchpriority="high"
          class="relative w-[60%] z-[3]">
      </div>
    </div>
  </section>

  <!-- PROCESOS PRODUCTIVOS (sin fotos) -->
  <section class="sec sec-mist border-t border-line">
    <div class="wrap">
      <SectionHeader :eyebrow="t('home.process.eyebrow')" :title="t('home.process.title')" :intro="t('home.process.intro')" />
      <div class="grid md:grid-cols-4 gap-[18px] relative">
        <div class="hidden md:block absolute top-[38px] left-[6%] right-[6%] h-0.5 z-0 bg-[repeating-linear-gradient(90deg,theme(colors.line)_0_10px,transparent_10px_18px)]" />
        <article v-for="(s, i) in steps" :key="i" class="card card-hover relative z-[1] p-[26px_22px_24px] flex flex-col gap-3.5">
          <div class="flex items-center justify-between">
            <span class="ico-tile"><BaseIcon :name="stepIcons[i]" class="w-6 h-6" /></span>
            <span class="font-display font-bold text-[1.6rem] text-slate tabular-nums">0{{ i + 1 }}</span>
          </div>
          <span class="pill pill-tint self-start">{{ rt(s.label) }}</span>
          <h3 class="text-[1.16rem]">{{ rt(s.title) }}</h3>
          <p class="text-[.98rem] text-slate">{{ rt(s.desc) }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Nuestra planta (preview de galería → Nosotros) -->
  <section class="sec sec-mist">
    <div class="wrap">
      <div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-10">
        <div class="max-w-[620px] reveal">
          <span class="pill pill-outline">Nuestra planta</span>
          <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">Producción integrada en nuestra planta</h2>
          <p class="text-[1.12rem] text-slate">Extrusión, impresión, corte y sellado en nuestra planta en Lima, con control de calidad en cada etapa.</p>
        </div>
        <NuxtLink :to="localePath('/nosotros')" class="btn btn-ghost reveal shrink-0">Conócenos</NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[150px] md:auto-rows-[190px]">
        <figure class="reveal group relative overflow-hidden rounded-card col-span-2 row-span-2">
          <img src="/photos/home-planta-band.jpg" alt="Interior de la planta de producción de empaques flexibles" width="1200" height="800" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
        </figure>
        <figure class="reveal group relative overflow-hidden rounded-card">
          <img src="/photos/galeria-impresion.jpg" alt="Prensa flexográfica imprimiendo empaque a color" width="1100" height="730" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
        </figure>
        <figure class="reveal group relative overflow-hidden rounded-card">
          <img src="/photos/galeria-rollos.jpg" alt="Nave de producción con rollos de material" width="800" height="1100" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
        </figure>
        <figure class="reveal group relative overflow-hidden rounded-card">
          <img src="/photos/galeria-shrinkfilm.jpg" alt="Máquina de shrink film con rollo de película" width="1100" height="730" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
        </figure>
        <figure class="reveal group relative overflow-hidden rounded-card">
          <img src="/photos/galeria-linea.jpg" alt="Línea de producción en planta" width="1100" height="730" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
        </figure>
      </div>
    </div>
  </section>

  <!-- PRODUCTOS (categorías, sin detalle) -->
  <section class="sec">
    <div class="wrap">
      <SectionHeader center :eyebrow="t('home.products.eyebrow')" :title="t('home.products.title')" :intro="t('home.products.intro')" />
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        <NuxtLink v-for="c in categories" :key="c.key"
          :to="localePath({ path: '/productos', query: { ind: c.slug } })"
          class="reveal card card-hover p-[26px_22px] flex flex-col gap-3.5 min-h-[186px]">
          <span class="grid place-items-center w-12 h-12 rounded bg-green-tint text-green-700">
            <BaseIcon :name="c.icon" class="w-[26px] h-[26px]" />
          </span>
          <h3 class="text-[1.12rem]">{{ c.name }}</h3>
          <p class="text-[.9rem] flex-1 text-slate">{{ c.short }}</p>
          <span class="inline-flex items-center gap-1.5 font-display font-bold text-[.9rem] text-green-700">
            {{ t('cta.seeProducts') }} <BaseIcon name="arrow" class="w-4 h-4" />
          </span>
        </NuxtLink>

        <NuxtLink :to="localePath('/productos')"
          class="reveal grid place-content-center text-center rounded-card border-0 p-[22px] bg-green-tint md:col-span-2 lg:col-span-4">
          <span class="inline-flex items-center gap-2 font-display font-bold text-green-700 text-[1.02rem]">
            {{ t('cta.seeCatalog') }} <BaseIcon name="arrow" class="w-4 h-4" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
