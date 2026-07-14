<script setup>
const route = useRoute()

// SEO i18n: fija <html lang/dir> por locale y emite canonical + hreflang (es/en/x-default)
// + og:locale en todas las rutas. Requiere i18n.baseUrl en nuxt.config.js.
const i18nHead = useLocaleHead()
useHead(i18nHead)

// Reveal on scroll — motor GSAP (decisión de motion #1). ScrollTrigger.batch escalona
// lo que entra junto al viewport. Import dinámico client-only (fuera del SSR/critical path).
// IDEMPOTENTE: solo procesa elementos aún no manejados (WeakSet), para que un cambio de
// ruta o de filtro (?ind=) NO re-oculte lo ya visible ni duplique triggers.
// Tokens espejados de main.css :root: --rise 18px · --dur-reveal .6s · --stag 60ms.
let gsapRef = null
let ST = null
const handled = new WeakSet()
async function setupReveal () {
  if (!import.meta.client) return
  if (!gsapRef) {
    gsapRef = (await import('gsap')).gsap
    ST = (await import('gsap/ScrollTrigger')).ScrollTrigger
    gsapRef.registerPlugin(ST)
  }
  const gsap = gsapRef
  // Mata triggers de elementos ya desmontados (rutas anteriores).
  ST.getAll().forEach((t) => { if (t.trigger && !t.trigger.isConnected) t.kill() })

  const fresh = gsap.utils.toArray('#main .reveal').filter((el) => !handled.has(el))
  if (!fresh.length) { ST.refresh(); return }
  fresh.forEach((el) => handled.add(el)) // marca antes de crear triggers (evita duplicados)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(fresh, { opacity: 1, y: 0 })
    return
  }
  gsap.set(fresh, { opacity: 0, y: 18 })
  ST.batch(fresh, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, overwrite: true
    })
  })
  ST.refresh()
}
onMounted(() => nextTick(setupReveal))
watch(() => route.fullPath, () => nextTick(() => setTimeout(setupReveal, 80)))
onBeforeUnmount(() => ST?.getAll().forEach((t) => t.kill()))
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
