<script setup>
const localePath = useLocalePath()
const { t } = useI18n()

// Contenido del Home + catálogo desde Firestore (CMS). await → SSR/JSON-LD esperan los datos.
const { data: homeData } = await useFetch('/api/content/home', { default: () => ({ home: {}, certLogos: [] }) })
const { data: catalog } = await useFetch('/api/content/catalog', { default: () => ({ sectors: [], products: [], materials: {} }) })
const home = computed(() => homeData.value.home || {})
const certLogos = computed(() => homeData.value.certLogos || [])
const sectors = computed(() => catalog.value.sectors || [])
const steps = computed(() => home.value.process?.steps || [])

const stepIcons = ['film', 'print', 'scissors', 'seal']
const stepImgs = ['/photos/proceso-extrusion.jpg', '/photos/proceso-impresion.jpg', '/photos/proceso-corte.jpg', '/photos/proceso-sellado.jpg']

const { title: seoTitle, description: seoDesc } = await usePageSeo('home', { appendBrand: false })

const homeUrl = 'https://gammaplast.com.pe' + localePath('/')
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': homeUrl + '#webpage',
  url: homeUrl,
  name: seoTitle,
  description: seoDesc,
  isPartOf: { '@id': 'https://gammaplast.com.pe/#website' },
  about: orgRef
})
</script>

<template>
  <div>
    <!-- HERO — full-bleed con video de fondo (póster de fallback). El header se dibuja
         transparente por encima en Home (ver AppHeader); el -mt lo mete bajo el header. -->
    <section class="relative isolate -mt-[72px] overflow-hidden bg-ink">
      <!-- Fondo: video mudo en loop; póster mientras carga o si el navegador no autoreproduce. -->
      <video
        class="absolute inset-0 -z-20 h-full w-full object-cover"
        autoplay muted loop playsinline aria-hidden="true"
        poster="/videos/hero-poster.jpg">
        <source src="/videos/hero.mp4" type="video/mp4">
      </video>
      <!-- Velo para contraste AA del texto blanco (más denso a la izquierda, donde va el copy). -->
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25"></div>

      <div class="wrap min-h-[92vh] flex flex-col justify-center py-[clamp(96px,17vh,160px)]">
        <div class="max-w-[620px] text-white">
          <h1 class="text-white text-[clamp(2rem,6.4vw,4.2rem)] mb-5">
            {{ home.hero?.title }} <span class="text-green">{{ home.hero?.titleAccent }}</span>
          </h1>
          <p class="text-[1.2rem] max-w-[44ch] mb-8 text-white/85">{{ home.hero?.lead }}</p>
          <div class="flex flex-wrap gap-3.5">
            <NuxtLink :to="localePath('/contacta-un-asesor')" class="btn btn-green">{{ t('cta.advisor') }}</NuxtLink>
            <NuxtLink :to="localePath('/productos')" class="btn btn-ghost-light">{{ t('cta.seeProducts') }}</NuxtLink>
          </div>
        </div>
      </div>

    </section>

    <!-- Carousel infinito de logos de clientes (placeholder). Va debajo del hero. -->
    <ClientLogos />

    <!-- Certificaciones (logos del catálogo) -->
    <section class="border-y border-line bg-paper">
      <div class="wrap py-9 flex flex-col items-center gap-4 text-center">
        <span class="eyebrow">Certificaciones</span>
        <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 max-w-[1060px] my-1">
          <li v-for="c in certLogos" :key="c.id || c.src" class="shrink-0">
            <img :src="c.src" :alt="c.alt" loading="lazy" class="h-9 sm:h-10 md:h-11 w-auto object-contain">
          </li>
        </ul>
        <p class="text-slate text-[.95rem] max-w-[54ch]">{{ home.certStrip?.note }}</p>
      </div>
    </section>

    <!-- PROCESOS PRODUCTIVOS (con fotos) -->
    <section class="sec sec-mist border-t border-line">
      <div class="wrap">
        <SectionHeader :eyebrow="home.process?.eyebrow" :title="home.process?.title" :intro="home.process?.intro" />
        <div class="grid sm:grid-cols-2 gap-6">
          <article v-for="(s, i) in steps" :key="i" class="card card-hover relative z-[1] p-[26px_22px_24px] flex flex-col gap-3.5">
            <div class="flex items-center justify-between">
              <span class="ico-tile"><BaseIcon :name="stepIcons[i]" class="w-6 h-6" /></span>
              <span class="font-display font-bold text-[1.6rem] text-slate tabular-nums">0{{ i + 1 }}</span>
            </div>
            <span class="pill pill-tint self-start">{{ s.label }}</span>
            <h3 class="text-[1.16rem]">{{ s.title }}</h3>
            <p class="text-[.98rem] text-slate">{{ s.desc }}</p>
            <img :src="s.img || stepImgs[i]" :alt="`Proceso: ${s.title}`" width="600" height="400" loading="lazy"
              class="mt-2 rounded-lg w-full h-72 object-cover">
          </article>
        </div>
      </div>
    </section>

    <!-- Nuestra planta (preview de galería → Nosotros) -->
    <section class="sec border-t border-line">
      <div class="wrap">
        <div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-10">
          <div class="max-w-[620px] reveal">
            <span class="pill pill-outline">{{ home.plant?.eyebrow }}</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">{{ home.plant?.title }}</h2>
            <p class="text-[1.12rem] text-slate">{{ home.plant?.intro }}</p>
          </div>
          <NuxtLink :to="localePath('/nosotros')" class="btn btn-ghost reveal shrink-0">Conócenos</NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[150px] md:auto-rows-[190px]">
          <GalleryFigure class="col-span-2 row-span-2" src="/photos/home-planta-band.jpg" alt="Interior de la planta de producción de empaques flexibles" width="1200" height="800" />
          <GalleryFigure src="/photos/galeria-impresion.jpg" alt="Prensa flexográfica imprimiendo empaque a color" width="1100" height="730" />
          <GalleryFigure src="/photos/galeria-rollos.jpg" alt="Nave de producción con rollos de material" width="800" height="1100" />
          <GalleryFigure src="/photos/galeria-shrinkfilm.jpg" alt="Máquina de shrink film con rollo de película" width="1100" height="730" />
          <GalleryFigure src="/photos/galeria-linea.jpg" alt="Línea de producción en planta" width="1100" height="730" />
        </div>
      </div>
    </section>

    <!-- PRODUCTOS (categorías, sin detalle) -->
    <section class="sec sec-mist border-t border-line">
      <div class="wrap">
        <SectionHeader center :eyebrow="home.products?.eyebrow" :title="home.products?.title" :intro="home.products?.intro" />
        <div class="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-12">
          <NuxtLink v-for="(c, i) in sectors" :key="c.slug"
            :to="localePath({ path: '/productos', query: { sec: c.slug } })"
            :class="i < 4 ? 'lg:col-span-3' : 'lg:col-span-4'"
            class="reveal card card-hover p-[26px_22px] flex flex-col gap-3.5 min-h-[186px]">
            <span class="grid place-items-center w-12 h-12 rounded bg-green-tint text-green-700">
              <BaseIcon :name="c.icon" class="w-[26px] h-[26px]" />
            </span>
            <h3 class="text-[1.12rem]">{{ c.label }}</h3>
            <p class="text-[.9rem] flex-1 text-slate">{{ c.desc }}</p>
            <span class="inline-flex items-center gap-1.5 font-display font-bold text-[.9rem] text-green-700">
              {{ t('cta.seeProducts') }} <BaseIcon name="arrow" class="w-4 h-4" />
            </span>
          </NuxtLink>

          <NuxtLink :to="localePath('/productos')"
            class="reveal grid place-content-center text-center rounded-card border-0 p-[22px] bg-green-tint sm:col-span-2 lg:col-span-12">
            <span class="inline-flex items-center gap-2 font-display font-bold text-green-700 text-[1.02rem]">
              {{ t('cta.seeCatalog') }} <BaseIcon name="arrow" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
