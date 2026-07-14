<script setup>
const route = useRoute()

// SEO i18n: fija <html lang/dir> por locale y emite canonical + hreflang (es/en/x-default)
// + og:locale en todas las rutas. Requiere i18n.baseUrl en nuxt.config.js.
const i18nHead = useLocaleHead()
useHead(i18nHead)

// Reveal on scroll — motor GSAP (decisión de motion #1). ScrollTrigger.batch escalona
// lo que entra junto al viewport (mejor que un índice global). Import dinámico client-only
// para no cargar GSAP en SSR ni en el critical path. Tokens espejados de main.css :root:
// --rise 18px · --dur-reveal .6s · --stag 60ms.
let ctx = null
async function setupReveal () {
  if (!import.meta.client) return
  const gsap = (await import('gsap')).gsap
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx?.revert() // limpia triggers de la ruta anterior
  ctx = gsap.context(() => {
    const els = gsap.utils.toArray('#main .reveal') // solo contenido de página (no header/footer persistentes)
    if (!els.length) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(els, { opacity: 0, y: 18 })
      ScrollTrigger.batch(els, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, overwrite: true
        })
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(els, { opacity: 1, y: 0 })
    })
  })
}
onMounted(() => nextTick(setupReveal))
watch(() => route.fullPath, () => nextTick(() => setTimeout(setupReveal, 80)))
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div>
    <a href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3
             focus:bg-green-700 focus:text-white focus:font-display focus:font-bold
             focus:px-4 focus:py-2.5 focus:rounded">
      Saltar al contenido
    </a>
    <AppTopBar />
    <AppHeader />
    <main id="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
