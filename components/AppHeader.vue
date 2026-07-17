<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const open = ref(false)

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/nosotros'), label: t('nav.about') },
  { to: localePath('/productos'), label: t('nav.products') },
  { to: localePath('/novedades'), label: t('nav.news') },
  { to: localePath('/contacto'), label: t('nav.contact') }
])
const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))
const switchLangLabel = computed(() =>
  otherLocale.value === 'en' ? 'Cambiar idioma a inglés' : 'Cambiar idioma a español')

// Header "scrolled": compacta altura + muestra el borde inferior al despegar del top.
const scrolled = ref(false)
function onScroll () { scrolled.value = window.scrollY > 8 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b transition-colors duration-base"
    :class="scrolled ? 'border-line' : 'border-transparent'">
    <div class="wrap flex items-center gap-7 transition-[min-height] duration-base"
      :class="scrolled ? 'min-h-[58px]' : 'min-h-[72px]'">
      <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="Gamma Plast — inicio">
        <img src="/logo-h.png" alt="Gamma Plast" width="1650" height="560" class="h-10 w-auto" >
      </NuxtLink>

      <nav class="hidden lg:flex gap-8 ml-auto">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
          class="font-display font-semibold text-[.95rem] text-ink py-1.5 relative
                 after:absolute after:left-0 after:right-full after:-bottom-0.5 after:h-0.5 after:bg-green
                 after:transition-all hover:after:right-0"
          active-class="after:right-0">{{ l.label }}</NuxtLink>
      </nav>

      <div class="hidden lg:flex items-center gap-4 ml-auto lg:ml-0">
        <NuxtLink :to="switchLocalePath(otherLocale)" :aria-label="switchLangLabel"
          class="inline-flex items-center min-h-[44px] px-2 font-display font-bold text-[.82rem] text-slate hover:text-green-700 uppercase tracking-wide">
          {{ otherLocale }}
        </NuxtLink>
        <NuxtLink :to="localePath('/contacta-un-asesor')" class="btn btn-green">{{ t('cta.advisor') }}</NuxtLink>
      </div>

      <button class="lg:hidden ml-auto p-2 text-ink" :aria-expanded="open"
        aria-label="Menú" @click="open = !open">
        <BaseIcon :name="open ? 'close' : 'menu'" class="w-6 h-6" />
      </button>
    </div>

    <transition name="fade">
      <div v-if="open" class="lg:hidden border-t border-line bg-paper">
        <nav class="wrap py-4 flex flex-col gap-1">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" @click="open = false"
            class="flex items-center min-h-[44px] font-display font-semibold text-ink py-3 border-b border-line/70">{{ l.label }}</NuxtLink>
          <div class="flex items-center justify-between pt-4">
            <NuxtLink :to="switchLocalePath(otherLocale)" :aria-label="switchLangLabel" @click="open = false"
              class="inline-flex items-center min-h-[44px] px-2 -ml-2 font-display font-bold text-slate uppercase">{{ otherLocale }}</NuxtLink>
            <NuxtLink :to="localePath('/contacta-un-asesor')" class="btn btn-green" @click="open = false">{{ t('cta.advisor') }}</NuxtLink>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
