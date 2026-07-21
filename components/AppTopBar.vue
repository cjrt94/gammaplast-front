<script setup>
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// En Home el header va transparente sobre el hero de video: la barra superior se oculta
// para que el hero arranque a sangre desde el borde de la ventana (como en la referencia).
const isHome = computed(() => route.path === localePath('/'))
</script>

<template>
  <div v-if="!isHome" class="bg-footer text-footer-soft text-[.82rem]">
    <div class="wrap flex flex-wrap items-center justify-between gap-4 min-h-[40px] py-2">
      <div class="hidden sm:flex items-center gap-2">
        <span class="w-[7px] h-[7px] rounded-full bg-green inline-block" />
        {{ t('topbar.claim') }}
      </div>
      <div class="flex flex-wrap items-center gap-5">
        <a href="tel:+51908865429" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <BaseIcon name="phone" class="w-[15px] h-[15px] opacity-85" /> +51 908 865 429
        </a>
        <a href="mailto:comercial@gammaplast.com.pe" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <BaseIcon name="mail" class="w-[15px] h-[15px] opacity-85" /> comercial@gammaplast.com.pe
        </a>
      </div>
    </div>
  </div>
</template>
