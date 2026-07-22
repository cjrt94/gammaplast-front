<script setup>
const localePath = useLocalePath()
const { t } = useI18n()

// Contenido de Nosotros + grid de certificaciones desde el CMS (Firestore).
const { data: content } = await useFetch('/api/content/nosotros', { default: () => ({ nosotros: {}, certifications: [] }) })
const n = computed(() => content.value.nosotros || {})
const certs = computed(() => content.value.certifications || [])

const { title: seoTitle, description: seoDesc } = await usePageSeo('about')
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://gammaplast.com.pe' + localePath('/nosotros'),
  name: seoTitle,
  description: seoDesc,
  about: orgRef,
  isPartOf: { '@id': 'https://gammaplast.com.pe/#website' }
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.about'), path: localePath('/nosotros') }
]))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="sec-mist border-b border-line">
      <div class="wrap py-16 lg:py-20">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span class="pill pill-outline reveal">{{ n.hero?.pill }}</span>
            <h1 class="text-[clamp(2.2rem,4.6vw,3.4rem)] mt-5 mb-5 reveal max-w-[16ch]">{{ n.hero?.title }}</h1>
            <div class="space-y-4 text-[1.08rem] text-body max-w-[60ch] reveal">
              <p v-for="(p, i) in n.hero?.paragraphs" :key="i">{{ p }}</p>
            </div>
          </div>
          <div class="reveal relative rounded-card border border-line overflow-hidden min-h-[300px] lg:min-h-[440px]">
            <img :src="n.hero?.image" alt="Equipo de Gamma Plast revisando la producción en planta"
              width="1000" height="1200" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="sec sec-mist">
      <div class="wrap">
        <div class="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
          <div class="reveal">
            <span class="pill pill-outline">{{ n.valores?.pill }}</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">{{ n.valores?.title }}</h2>
            <p class="text-[1.12rem] text-slate">{{ n.valores?.intro }}</p>
          </div>
          <ul class="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            <li v-for="v in n.valores?.items" :key="v.name" class="reveal flex items-center gap-4">
              <span class="ico-tile shrink-0"><img :src="v.img" alt="" aria-hidden="true" width="256" height="256" class="w-7 h-7 object-contain" /></span>
              <span class="block font-display font-bold text-ink text-[1.12rem]">{{ v.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Misión y Visión -->
    <section class="sec">
      <div class="wrap">
        <div class="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16 items-start">
          <div class="reveal">
            <span class="pill pill-outline">{{ n.misionVision?.pill }}</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">{{ n.misionVision?.title }}</h2>
          </div>
          <div class="space-y-9">
            <div class="reveal border-l-2 border-green pl-6">
              <span class="eyebrow">Misión</span>
              <p class="text-[1.12rem] text-body max-w-[62ch] mt-2">{{ n.misionVision?.mision }}</p>
            </div>
            <div class="reveal border-l-2 border-green pl-6">
              <span class="eyebrow">Visión</span>
              <p class="text-[1.12rem] text-body max-w-[62ch] mt-2">{{ n.misionVision?.vision }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Procesos Productivos -->
    <section class="sec sec-mist">
      <div class="wrap">
        <div class="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16">
          <div class="lg:sticky lg:top-28 self-start reveal">
            <span class="pill pill-outline">{{ n.procesos?.pill }}</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">{{ n.procesos?.title }}</h2>
            <p class="text-[1.12rem] text-slate">{{ n.procesos?.intro }}</p>
            <div class="mt-7 pt-7 border-t border-line">
              <p class="text-slate">{{ n.procesos?.note }}</p>
            </div>
          </div>

          <ol class="relative pt-1">
            <li v-for="(p, i) in n.procesos?.items" :key="p.n"
              class="reveal relative grid grid-cols-[56px_1fr] md:grid-cols-[64px_1fr] gap-x-5 md:gap-x-8 pb-11 last:pb-0">
              <span v-if="i < (n.procesos?.items?.length || 0) - 1"
                class="timeline-line absolute left-7 md:left-8 -translate-x-1/2 top-7 md:top-8 bottom-0 w-px bg-line" aria-hidden="true"></span>
              <div class="relative z-10">
                <span class="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full border font-display font-bold text-[1.2rem] md:text-[1.35rem]"
                  :class="i === 0 ? 'bg-green-700 text-white border-green-700' : 'bg-paper text-ink border-line'">{{ p.n }}</span>
              </div>
              <div class="pt-1.5 md:pt-2.5">
                <h3 class="text-[1.3rem] md:text-[1.5rem] mb-2.5">{{ p.title }}</h3>
                <p class="text-slate text-[1.02rem] leading-relaxed max-w-[60ch]">{{ p.desc }}</p>
                <img :src="p.img" :alt="`Proceso: ${p.title}`" width="1200" height="800" loading="lazy"
                  class="mt-4 rounded-card border border-line w-full max-w-[460px] aspect-[3/2] object-cover">
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Galería de planta -->
    <section class="sec">
      <div class="wrap">
        <div class="max-w-[620px] mb-10 reveal">
          <span class="pill pill-outline">{{ n.galeria?.pill }}</span>
          <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">{{ n.galeria?.title }}</h2>
          <p class="text-[1.12rem] text-slate">{{ n.galeria?.intro }}</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[150px] md:auto-rows-[190px]">
          <GalleryFigure v-for="(img, i) in n.galeria?.images" :key="i"
            :class="img.span === 'big' ? 'col-span-2 row-span-2' : ''"
            :src="img.src" :alt="img.alt" width="1200" height="900" />
        </div>
      </div>
    </section>

    <!-- Certificaciones -->
    <section class="sec sec-mist">
      <div class="wrap">
        <div class="reveal rounded-card bg-green-700 overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12">
            <div>
              <span class="pill bg-white text-green-700">{{ n.certs?.pill }}</span>
              <h2 class="text-white text-[clamp(1.6rem,2.8vw,2.2rem)] mt-4">{{ n.certs?.title }}</h2>
              <p class="text-white text-[.98rem] mt-4 max-w-[48ch]">{{ n.certs?.intro }}</p>
            </div>
            <div class="bg-paper rounded-card p-6 md:p-8">
              <ul class="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <li v-for="c in certs" :key="c.code" class="flex flex-col items-center text-center gap-2">
                  <span class="ico-tile w-12 h-12"><BaseIcon :name="c.icon" class="w-6 h-6" /></span>
                  <div class="font-display font-bold text-ink text-[.95rem]">{{ c.code }}</div>
                </li>
              </ul>
              <p class="text-[.76rem] text-slate mt-5 text-center">{{ n.certs?.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sec">
      <div class="wrap text-center max-w-[640px] mx-auto">
        <h2 class="text-[clamp(1.7rem,2.6vw,2.2rem)] mb-3 reveal">Trabajemos juntos en tu próximo empaque</h2>
        <p class="text-slate text-[1.08rem] mb-7 reveal max-w-[52ch] mx-auto">Somos tu aliado estratégico, desde la selección de materiales hasta la entrega final.</p>
        <NuxtLink :to="localePath('/contacta-un-asesor')" class="btn btn-green reveal">Contacta a un asesor</NuxtLink>
      </div>
    </section>
  </div>
</template>
