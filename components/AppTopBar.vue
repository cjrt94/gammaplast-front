<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="bg-footer text-footer-soft text-[.82rem]">
    <div class="wrap flex flex-wrap items-center justify-between gap-4 min-h-[40px]">
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
