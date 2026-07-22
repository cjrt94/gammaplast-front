<script setup>
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { data: contact } = await useContact()
const phoneRaw = computed(() => contact.value?.phonesRaw?.[0] || '')
const phoneShow = computed(() => contact.value?.phones?.[0] || '')
const email = computed(() => contact.value?.emails?.[0] || '')

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
        <a :href="`tel:${phoneRaw}`" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <BaseIcon name="phone" class="w-[15px] h-[15px] opacity-85" /> {{ phoneShow }}
        </a>
        <a :href="`mailto:${email}`" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <BaseIcon name="mail" class="w-[15px] h-[15px] opacity-85" /> {{ email }}
        </a>
      </div>
    </div>
  </div>
</template>
