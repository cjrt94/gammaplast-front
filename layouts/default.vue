<script setup>
const route = useRoute()
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
    <AppTopBar />
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
