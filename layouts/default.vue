<script setup>
const route = useRoute()

// SEO i18n: fija <html lang/dir> por locale y emite canonical + hreflang (es/en/x-default)
// + og:locale en todas las rutas. Requiere i18n.baseUrl en nuxt.config.js.
const i18nHead = useLocaleHead()
useHead(i18nHead)

let io = null
function observe () {
  if (!import.meta.client) return
  io?.disconnect()
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal:not(.in)').forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i, 6) * 40) + 'ms'
    io.observe(el)
  })
}
onMounted(() => nextTick(observe))
watch(() => route.fullPath, () => nextTick(() => setTimeout(observe, 60)))
onBeforeUnmount(() => io?.disconnect())
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
