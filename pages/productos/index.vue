<script setup>
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// Catálogo + SEO/FAQ desde Firestore (CMS). await → SSR/JSON-LD esperan los datos.
const { data: catalog } = await useFetch('/api/content/catalog', { default: () => ({ sectors: [], products: [], materials: {} }) })
const sectors = computed(() => catalog.value.sectors || [])
const products = computed(() => catalog.value.products || [])
const materials = computed(() => catalog.value.materials || {})
const sectorBySlug = (slug) => sectors.value.find((s) => s.slug === slug)
const sectorLabel = (slug) => sectorBySlug(slug)?.label

const { seo, title: seoTitle, description: seoDesc } = await usePageSeo('products')
const site = 'https://gammaplast.com.pe'

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  url: site + localePath('/productos'),
  name: seoTitle,
  description: seoDesc,
  isPartOf: { '@id': site + '/#website' },
  about: orgRef,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: products.value.length,
    itemListElement: products.value.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        category: sectorLabel(p.sector),
        material: 'Plástico flexible (PE/PP)',
        brand: orgRef
      }
    }))
  }
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.products'), path: localePath('/productos') }
]))

// FAQ — contenido desde el CMS (seo.faq).
const faqItems = computed(() => (seo.value.faq && seo.value.faq.items) || [])
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.value.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a }
  }))
})

// Filtro por sector. null = todos.
const activeSector = ref(null)

// Deep-link opcional: /productos?sec=<slug> (usado desde la Home).
onMounted(() => {
  const q = route.query.sec
  if (typeof q === 'string' && sectorBySlug(q)) activeSector.value = q
})

function setSector (slug) {
  activeSector.value = slug
  router.replace({ query: slug ? { sec: slug } : {} })
}

// Grupos por sector, en el orden de `sectors`; se omiten los vacíos y se respeta el filtro.
const groups = computed(() =>
  sectors.value
    .filter((s) => !activeSector.value || s.slug === activeSector.value)
    .map((s) => ({ ...s, items: products.value.filter((p) => p.sector === s.slug) }))
    .filter((g) => g.items.length)
)

const filterBtn = (on) =>
  'inline-flex items-center gap-1.5 rounded-pill px-4 min-h-[40px] font-display font-bold text-[.85rem] ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ' +
  (on
    ? 'bg-green text-white border border-green'
    : 'bg-paper text-ink border border-line hover:border-green-700')
</script>

<template>
  <div>
    <PageHero
      eyebrow="Nuestros productos"
      title="Una solución de empaque para cada sector"
      intro="Explora nuestra línea de empaques flexibles agrupada por sector. Filtra para ver las soluciones pensadas para tu industria." />

    <!-- Barra de filtro por sector (sticky bajo el header; 2 filas al envolver) -->
    <div class="sticky top-[72px] z-30 bg-paper/95 backdrop-blur-md border-b border-line">
      <div class="wrap py-4 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filtrar productos por sector">
        <span class="text-[.85rem] font-display font-bold text-slate mr-1">Sector:</span>
        <button type="button" :class="filterBtn(!activeSector)" :aria-pressed="!activeSector" @click="setSector(null)">
          Todos
        </button>
        <button v-for="s in sectors" :key="s.slug" type="button"
          :class="filterBtn(activeSector === s.slug)" :aria-pressed="activeSector === s.slug"
          @click="setSector(s.slug)">
          <BaseIcon :name="s.icon" class="w-4 h-4" /> {{ s.short }}
        </button>
      </div>
    </div>

    <section class="sec">
      <div class="wrap">
        <!-- Grupos por sector (separados por encabezado + divisor, sin franja/foto) -->
        <div v-for="g in groups" :key="g.slug" class="mb-14 last:mb-0 pt-12 border-t border-line first:border-0 first:pt-0 scroll-mt-32" :id="g.slug">
          <!-- Encabezado de sector -->
          <div class="flex items-start gap-3.5 mb-6 reveal">
            <span class="ico-tile shrink-0"><BaseIcon :name="g.icon" class="w-6 h-6" /></span>
            <div>
              <h2 class="text-[1.5rem] md:text-[1.8rem] leading-tight">
                {{ g.label }} <span class="text-slate font-normal text-[.95rem] tabular-nums">· {{ g.items.length }}</span>
              </h2>
              <p class="text-slate text-[.98rem] max-w-[62ch] mt-1">{{ g.desc }}</p>
            </div>
          </div>

          <TransitionGroup tag="div" name="flip" class="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
            <article v-for="p in g.items" :key="p.name" class="card card-hover overflow-hidden flex flex-col">
              <!-- Más vertical (4:5) y object-contain para que el producto se vea completo. -->
              <div class="relative aspect-[4/5] bg-mist">
                <img :src="p.img" :alt="p.name" width="400" height="500" loading="lazy"
                  class="absolute inset-0 h-full w-full object-contain p-3">
              </div>
              <div class="p-4 border-t border-line">
                <h3 class="text-[1.02rem] font-display font-bold text-ink leading-snug">{{ p.name }}</h3>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </div>
    </section>

    <!-- Cierre: estructuras y materiales + CTA (feedback cliente: incluir junto al CTA de asesor) -->
    <section class="sec-mist py-14">
      <div class="wrap">
        <div class="max-w-[640px] mb-9 reveal">
          <span class="pill pill-outline">Estructuras y materiales</span>
          <h2 class="text-[clamp(1.7rem,3vw,2.3rem)] mt-5 mb-3">Materiales a la medida de tu producto</h2>
          <p class="text-slate text-[1.05rem]">Trabajamos estructuras monocapa, laminados y coextrusiones, en distintos colores y acabados.</p>
          <div class="flex items-center gap-2 mt-5" aria-label="Colores disponibles">
            <span class="text-[.8rem] font-display font-bold text-slate mr-1">Colores:</span>
            <span v-for="c in materials.colores" :key="c" class="w-5 h-5 rounded-full border border-line"
              :style="{ backgroundColor: c }" />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-5">
          <div class="card p-6 md:p-7 reveal">
            <h3 class="font-display font-bold text-ink text-[1.15rem] mb-4">Monocapa</h3>
            <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              <li v-for="m in materials.monocapa" :key="m" class="flex items-center gap-2 text-body text-[.98rem]">
                <BaseIcon name="check" class="w-4 h-4 text-green-700 shrink-0" />{{ m }}
              </li>
            </ul>
          </div>
          <div class="card p-6 md:p-7 reveal">
            <h3 class="font-display font-bold text-ink text-[1.15rem] mb-4">Laminado y coextrusión</h3>
            <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              <li v-for="m in materials.laminado" :key="m" class="flex items-center gap-2 text-body text-[.98rem]">
                <BaseIcon name="check" class="w-4 h-4 text-green-700 shrink-0" />{{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-9 flex flex-wrap items-center justify-between gap-5 rounded-card bg-green-tint p-7 reveal">
          <div class="flex flex-wrap gap-3">
            <span class="chip"><BaseIcon name="check" />Grado alimentario FDA</span>
            <span class="chip"><BaseIcon name="recycle" />Reciclables y compostables</span>
          </div>
          <NuxtLink :to="localePath('/contacta-un-asesor')" class="btn btn-green">Contacta a un asesor</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Preguntas frecuentes (con schema FAQPage) -->
    <section class="sec">
      <div class="wrap max-w-[760px]">
        <div class="mb-8 reveal">
          <span class="pill pill-outline">FAQ</span>
          <h2 class="text-[clamp(1.7rem,3vw,2.3rem)] mt-5 mb-3">{{ seo.faq?.title }}</h2>
          <p class="text-slate text-[1.05rem]">{{ seo.faq?.intro }}</p>
        </div>
        <ul class="flex flex-col gap-3">
          <li v-for="(f, i) in faqItems" :key="i" class="reveal card">
            <details class="group faq">
              <summary class="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden p-5 font-display font-bold text-ink">
                <span>{{ f.q }}</span>
                <BaseIcon name="arrow" class="w-4 h-4 shrink-0 rotate-90 text-green-700 transition-transform group-open:-rotate-90" />
              </summary>
              <p class="px-5 pb-5 -mt-1 text-body leading-relaxed">{{ f.a }}</p>
            </details>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
