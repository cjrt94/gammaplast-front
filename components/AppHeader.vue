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
</script>

<template>
  <header class="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
    <div class="wrap flex items-center gap-7 min-h-[72px]">
      <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="Gamma Plast — inicio">
        <img src="/logo.png" alt="Gamma Plast" class="h-[34px] w-auto" >
      </NuxtLink>

      <nav class="hidden lg:flex gap-8 ml-auto">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
          class="font-display font-semibold text-[.95rem] text-ink py-1.5 relative
                 after:absolute after:left-0 after:right-full after:-bottom-0.5 after:h-0.5 after:bg-green
                 after:transition-all hover:after:right-0"
          active-class="after:right-0">{{ l.label }}</NuxtLink>
      </nav>

      <div class="hidden lg:flex items-center gap-4 ml-auto lg:ml-0">
        <NuxtLink :to="switchLocalePath(otherLocale)"
          class="font-display font-bold text-[.82rem] text-slate hover:text-green-700 uppercase tracking-wide">
          {{ otherLocale }}
        </NuxtLink>
        <NuxtLink :to="localePath('/contacto')" class="btn btn-green">{{ t('cta.advisor') }}</NuxtLink>
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
            class="font-display font-semibold text-ink py-2.5 border-b border-line/70">{{ l.label }}</NuxtLink>
          <div class="flex items-center justify-between pt-4">
            <NuxtLink :to="switchLocalePath(otherLocale)" @click="open = false"
              class="font-display font-bold text-slate uppercase">{{ otherLocale }}</NuxtLink>
            <NuxtLink :to="localePath('/contacto')" class="btn btn-green" @click="open = false">{{ t('cta.advisor') }}</NuxtLink>
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
