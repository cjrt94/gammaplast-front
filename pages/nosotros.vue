<script setup>
const localePath = useLocalePath()
const { t } = useI18n()

useSeo({ title: t('seo.about.title'), description: t('seo.about.description') })
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://gammaplast.com.pe' + localePath('/nosotros'),
  name: t('seo.about.title'),
  description: t('seo.about.description'),
  about: orgRef,
  isPartOf: { '@id': 'https://gammaplast.com.pe/#website' }
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.about'), path: localePath('/nosotros') }
]))

// Valores del catálogo (6) con los ÍCONOS OFICIALES del cliente (extraídos de su set
// y recoloreados al verde de marca, fondo transparente → public/photos/valores/).
const valores = [
  { img: '/photos/valores/innovacion.png', name: 'Innovación y Desarrollo' },
  { img: '/photos/valores/compromiso.png', name: 'Compromiso con el Cliente' },
  { img: '/photos/valores/ambiental.png', name: 'Responsabilidad Ambiental' },
  { img: '/photos/valores/sostenibilidad.png', name: 'Sostenibilidad' },
  { img: '/photos/valores/calidad.png', name: 'Altos Estándares de Calidad' },
  { img: '/photos/valores/eficiencia.png', name: 'Eficiencia en Empaques' }
]
const procesos = [
  { n: '01', title: 'Extrusión por soplado', img: '/photos/proceso-extrusion.jpg', desc: 'Proceso de fabricación que permite producir películas plásticas flexibles a partir de resinas como PEBD, PEAD, PLA y materiales reciclados. Genera materiales resistentes que sirven como base para distintos tipos de empaques flexibles.' },
  { n: '02', title: 'Impresión: Flexografía Full Color', img: '/photos/proceso-impresion.jpg', desc: 'Proceso de impresión que permite aplicar gráficos y diseños directamente sobre las películas plásticas, utilizando tintas especializadas y placas flexográficas. Esta tecnología garantiza colores nítidos y consistentes, permitiendo destacar la identidad de la marca en cada empaque.' },
  { n: '03', title: 'Corte: Corte y doblado a medida', img: '/photos/proceso-corte.jpg', desc: 'Proceso que permite adaptar las películas plásticas a las dimensiones y formatos requeridos para cada tipo de empaque. A través de cortes precisos y doblados controlados, se preparan los materiales para su posterior sellado y conversión en productos terminados.' },
  { n: '04', title: 'Sellado: Sello plano, fondo y lateral', img: '/photos/proceso-sellado.jpg', desc: 'Proceso que permite unir y cerrar las películas plásticas para formar distintos tipos de empaques. Mediante sellos planos, de fondo o laterales, se garantiza resistencia, seguridad y un acabado adecuado para cada aplicación.' }
]
const certs = [
  { code: 'RCS', desc: 'Recycled Claim Standard', icon: 'recycle' },
  { code: 'TÜV', desc: 'OK compost — TÜV Austria', icon: 'leaf' },
  { code: 'D2W', desc: 'Tecnología oxo-biodegradable', icon: 'sprout' },
  { code: 'D2P', desc: 'Protección antimicrobiana', icon: 'shield' },
  { code: 'ISO', desc: 'Gestión de calidad', icon: 'award' },
  { code: 'FDA', desc: 'Contacto con alimentos', icon: 'food' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="sec-mist border-b border-line">
      <div class="wrap py-16 lg:py-20">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <!-- texto (del catálogo) -->
          <div>
            <span class="pill pill-outline reveal">Nosotros</span>
            <h1 class="text-[clamp(2.2rem,4.6vw,3.4rem)] mt-5 mb-5 reveal max-w-[16ch]">Comprometidos con la calidad y la innovación</h1>
            <div class="space-y-4 text-[1.08rem] text-body max-w-[60ch] reveal">
              <p>Más que empaques, en Gamma Plast creamos soluciones flexibles de alto rendimiento que impulsan el valor de tu producto. Nos inspira la excelencia, y por ello hemos convertido la innovación tecnológica, la máxima calidad y la atención a la medida en el ADN de nuestra compañía.</p>
              <p>Somos una empresa especializada en el diseño, desarrollo y fabricación de empaques flexibles de alta calidad. En Gamma Plast nos dedicamos a crear soluciones integrales de envasado que protegen, conservan y realzan el valor de los productos de nuestros clientes, combinando tecnología y experiencia.</p>
            </div>
          </div>
          <!-- foto real de planta -->
          <div class="reveal relative rounded-card border border-line overflow-hidden min-h-[300px] lg:min-h-[440px]">
            <img src="/photos/nosotros-hero.jpg" alt="Equipo de Gamma Plast revisando la producción en planta"
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
            <span class="pill pill-outline">Nuestros valores</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">Los principios que guían cada decisión</h2>
            <p class="text-[1.12rem] text-slate">Seis compromisos que dan sentido a cada empaque que fabricamos y a cada relación que construimos.</p>
          </div>
          <ul class="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            <li v-for="v in valores" :key="v.name" class="reveal flex items-center gap-4">
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
            <span class="pill pill-outline">Misión y visión</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">Nuestros principios guían cada decisión y proceso</h2>
          </div>
          <div class="space-y-9">
            <div class="reveal border-l-2 border-green pl-6">
              <span class="eyebrow">Misión</span>
              <p class="text-[1.12rem] text-body max-w-[62ch] mt-2">Fabricar empaques flexibles brindando respaldo a las marcas mediante calidad, innovación y servicio personalizado, cumpliendo las necesidades del cliente con honestidad y confianza.</p>
            </div>
            <div class="reveal border-l-2 border-green pl-6">
              <span class="eyebrow">Visión</span>
              <p class="text-[1.12rem] text-body max-w-[62ch] mt-2">Crecer junto a nuestros clientes de forma sostenible, integrando prácticas responsables con el entorno y convirtiendo el éxito del cliente en nuestra principal carta de presentación.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Procesos Productivos -->
    <section class="sec sec-mist">
      <div class="wrap">
        <div class="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16">
          <!-- Encabezado (sticky en desktop) -->
          <div class="lg:sticky lg:top-28 self-start reveal">
            <span class="pill pill-outline">Nuestros Procesos Productivos</span>
            <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">Control total, de la resina al empaque terminado</h2>
            <p class="text-[1.12rem] text-slate">Usamos tecnología especializada y procesos integrales para producir empaques flexibles de alta calidad con precisión y eficiencia.</p>
            <div class="mt-7 pt-7 border-t border-line">
              <p class="text-slate">Adaptamos cada etapa al formato, material y acabado que tu producto necesita.</p>
            </div>
          </div>

          <!-- Timeline numerado con foto por proceso -->
          <ol class="relative pt-1">
            <li v-for="(p, i) in procesos" :key="p.n"
              class="reveal relative grid grid-cols-[56px_1fr] md:grid-cols-[64px_1fr] gap-x-5 md:gap-x-8 pb-11 last:pb-0">
              <!-- conector -->
              <span v-if="i < procesos.length - 1"
                class="timeline-line absolute left-7 md:left-8 -translate-x-1/2 top-7 md:top-8 bottom-0 w-px bg-line" aria-hidden="true"></span>
              <!-- nodo numérico -->
              <div class="relative z-10">
                <span class="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full border font-display font-bold text-[1.2rem] md:text-[1.35rem]"
                  :class="i === 0 ? 'bg-green-700 text-white border-green-700' : 'bg-paper text-ink border-line'">{{ p.n }}</span>
              </div>
              <!-- contenido -->
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
          <span class="pill pill-outline">Nuestra planta</span>
          <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-5 mb-4">Detrás de cada empaque</h2>
          <p class="text-[1.12rem] text-slate">Extrusión, impresión flexográfica, corte y sellado: el proceso completo, en imágenes.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[150px] md:auto-rows-[190px]">
          <GalleryFigure class="col-span-2 row-span-2" src="/photos/galeria-impresion.jpg" alt="Prensa flexográfica imprimiendo empaque a color" width="1200" height="900" />
          <GalleryFigure src="/photos/galeria-rollos.jpg" alt="Nave de producción con rollos de material" width="800" height="1100" />
          <GalleryFigure src="/photos/galeria-shrinkfilm.jpg" alt="Máquina de shrink film con rollo de película" width="1100" height="730" />
          <GalleryFigure src="/photos/galeria-film.jpg" alt="Detalle de film plástico transparente" width="1100" height="730" />
          <GalleryFigure src="/photos/galeria-rodillos.jpg" alt="Detalle de rodillos de impresión" width="1100" height="730" />
          <GalleryFigure src="/photos/galeria-linea.jpg" alt="Línea de producción en planta" width="1100" height="730" />
        </div>
      </div>
    </section>

    <!-- Certificaciones -->
    <section class="sec sec-mist">
      <div class="wrap">
        <div class="reveal rounded-card bg-green-700 overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12">
            <div>
              <span class="pill bg-white text-green-700">Certificaciones</span>
              <h2 class="text-white text-[clamp(1.6rem,2.8vw,2.2rem)] mt-4">Certificaciones que garantizan calidad, seguridad y confianza.</h2>
              <p class="text-white text-[.98rem] mt-4 max-w-[48ch]">Nuestros empaques de PE y PP son biodegradables, compostables, reciclados y laminados, y cumplen la normativa FDA para contacto con alimentos.</p>
            </div>
            <div class="bg-paper rounded-card p-6 md:p-8">
              <ul class="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <li v-for="c in certs" :key="c.code" class="flex flex-col items-center text-center gap-2">
                  <!-- TODO: isotipo oficial -->
                  <span class="ico-tile w-12 h-12"><BaseIcon :name="c.icon" class="w-6 h-6" /></span>
                  <div class="font-display font-bold text-ink text-[.95rem]">{{ c.code }}</div>
                </li>
              </ul>
              <p class="text-[.76rem] text-slate mt-5 text-center">* Isotipos oficiales pendientes de integrar.</p>
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
