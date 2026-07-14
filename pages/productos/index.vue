<script setup>
const { types, products, industries, industryBySlug } = useCatalog()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const { t, tm, rt } = useI18n()

useSeo({ title: t('seo.products.title'), description: t('seo.products.description') })

const site = 'https://gammaplast.com.pe'
const typeLabel = (slug) => types.find((x) => x.slug === slug)?.label

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  url: site + localePath('/productos'),
  name: t('seo.products.title'),
  description: t('seo.products.description'),
  isPartOf: { '@id': site + '/#website' },
  about: orgRef,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        category: typeLabel(p.type),
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

// FAQ — contenido en i18n (faq.items). NOTA(cliente): validar la respuesta de
// pedido mínimo / tiempos de entrega antes de publicar.
const faqItems = computed(() => tm('faq.items').map((it) => ({ q: rt(it.q), a: rt(it.a) })))
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.value.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a }
  }))
})

// Filtro por industria (etiqueta). null = todas las industrias.
const activeIndustry = ref(null)

// Deep-link opcional: /productos?ind=<slug> (usado desde la Home).
onMounted(() => {
  const q = route.query.ind
  if (typeof q === 'string' && industryBySlug(q)) activeIndustry.value = q
})

function setIndustry (slug) {
  activeIndustry.value = slug
  router.replace({ query: slug ? { ind: slug } : {} })
}

const filtered = computed(() =>
  activeIndustry.value
    ? products.filter((p) => p.industries.includes(activeIndustry.value))
    : products
)

// Productos agrupados por familia de empaque, en el orden de `types`; se omiten las vacías.
const groups = computed(() =>
  types
    .map((t) => ({ ...t, items: filtered.value.filter((p) => p.type === t.slug) }))
    .filter((g) => g.items.length)
)

const activeMeta = computed(() => (activeIndustry.value ? industryBySlug(activeIndustry.value) : null))

const filterBtn = (on) =>
  'inline-flex items-center gap-1.5 rounded-pill px-4 min-h-[40px] font-display font-bold text-[.85rem] ' +
  'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ' +
  (on
    ? 'bg-green text-white border border-green'
    : 'bg-paper text-ink border border-line hover:border-green-700')
</script>

<template>
  <PageHero
    eyebrow="Nuestros productos"
    title="Nuestro catálogo por tipo de empaque"
    intro="Explora nuestra línea de empaques flexibles agrupada por familia. Filtra por industria para ver las soluciones pensadas para tu sector." />

  <!-- Barra de filtro por industria (sticky bajo el header) -->
  <div class="sticky top-[72px] z-30 bg-paper/95 backdrop-blur-md border-b border-line">
    <div class="wrap py-4 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filtrar productos por industria">
      <span class="text-[.85rem] font-display font-bold text-slate mr-1">Industria:</span>
      <button type="button" :class="filterBtn(!activeIndustry)" :aria-pressed="!activeIndustry" @click="setIndustry(null)">
        Todas
      </button>
      <button v-for="i in industries" :key="i.slug" type="button"
        :class="filterBtn(activeIndustry === i.slug)" :aria-pressed="activeIndustry === i.slug"
        @click="setIndustry(i.slug)">
        <BaseIcon :name="i.icon" class="w-4 h-4" /> {{ i.short }}
      </button>
    </div>
  </div>

  <section class="sec">
    <div class="wrap">
      <!-- Contexto del filtro activo -->
      <p v-if="activeMeta" class="reveal text-body max-w-[62ch] mb-2 -mt-2">{{ activeMeta.desc }}</p>
      <p class="reveal text-[.9rem] text-slate mb-10" aria-live="polite">
        {{ filtered.length }} {{ filtered.length === 1 ? 'producto' : 'productos' }}<template v-if="activeMeta"> en {{ activeMeta.label }}</template>
      </p>

      <!-- Grupos por familia de empaque -->
      <div v-for="g in groups" :key="g.slug" class="mb-16 last:mb-0">
        <div class="flex items-start gap-3 mb-6 reveal">
          <span class="ico-tile shrink-0"><BaseIcon :name="g.icon" class="w-6 h-6" /></span>
          <div>
            <h2 class="text-[1.4rem] leading-tight">
              {{ g.label }} <span class="text-slate font-normal text-[.95rem] tabular-nums">· {{ g.items.length }}</span>
            </h2>
            <p class="text-slate text-[.92rem] m-0">{{ g.intro }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
          <article v-for="p in g.items" :key="p.name" class="reveal card card-hover overflow-hidden flex flex-col">
            <div class="relative h-44 sm:h-48 bg-mist">
              <img :src="p.img" :alt="p.name" width="400" height="400" loading="lazy" class="absolute inset-0 h-full w-full object-contain p-4">
            </div>
            <div class="p-4 border-t border-line flex flex-col gap-2 flex-1">
              <h3 class="text-[1.02rem] font-display font-bold text-ink leading-snug">{{ p.name }}</h3>
              <div class="mt-auto flex flex-wrap gap-1.5 pt-1">
                <span v-for="s in p.industries" :key="s" class="pill pill-tint !text-[.7rem] !py-1">{{ industryBySlug(s).short }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Cierre: materiales + CTA -->
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

  <!-- Preguntas frecuentes (con schema FAQPage) -->
  <section class="sec">
    <div class="wrap max-w-[760px]">
      <div class="mb-8 reveal">
        <span class="pill pill-outline">FAQ</span>
        <h2 class="text-[clamp(1.7rem,3vw,2.3rem)] mt-5 mb-3">{{ t('faq.title') }}</h2>
        <p class="text-slate text-[1.05rem]">{{ t('faq.intro') }}</p>
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
</template>
