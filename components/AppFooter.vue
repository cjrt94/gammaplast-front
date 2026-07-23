<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { data: contact } = await useContact()
const { data: settings } = await useSettings()
const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/nosotros'), label: t('nav.about') },
  { to: localePath('/productos'), label: t('nav.products') },
  { to: localePath('/novedades'), label: t('nav.news') },
  { to: localePath('/contacto'), label: t('nav.contact') },
  { to: localePath('/contacta-un-asesor'), label: t('cta.advisor') }
])
</script>

<template>
  <footer class="bg-footer text-footer-soft pt-16 pb-7">
    <div class="wrap">
      <div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1.4fr] pb-10 border-b border-white/10">
        <div>
          <img src="/logo-white-h.png" alt="Gamma Plast" width="1650" height="560" class="h-11 w-auto mb-5" >
          <p class="max-w-[34ch] text-[.96rem] leading-relaxed">{{ settings.footerAbout || t('footer.about') }}</p>
        </div>
        <div>
          <h4 class="text-white font-display uppercase tracking-label text-[.82rem] mb-4">{{ t('footer.navTitle') }}</h4>
          <ul class="flex flex-col gap-2.5 text-[.96rem]">
            <li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="hover:text-white transition-colors">{{ l.label }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-display uppercase tracking-label text-[.82rem] mb-4">{{ t('footer.contactTitle') }}</h4>
          <ul class="flex flex-col gap-3 text-[.95rem]">
            <li class="flex gap-2.5"><BaseIcon name="pin" class="w-[17px] h-[17px] text-green shrink-0 mt-0.5" />{{ contact.address?.full }}</li>
            <li class="flex gap-2.5"><BaseIcon name="phone" class="w-[17px] h-[17px] text-green shrink-0 mt-0.5" />{{ (contact.phones || []).join(' · ') }}</li>
            <li class="flex gap-2.5"><BaseIcon name="mail" class="w-[17px] h-[17px] text-green shrink-0 mt-0.5" />{{ contact.emails?.[0] }}</li>
          </ul>
        </div>
      </div>
      <div class="flex flex-wrap justify-between items-center gap-5 pt-6 text-[.85rem]">
        <span>{{ t('footer.rights') }}</span>
        <div class="flex flex-wrap gap-4">
          <span v-for="(b, i) in (settings.certBadges || [])" :key="i" class="inline-flex items-center gap-1.5"><BaseIcon :name="b.icon" class="w-3.5 h-3.5 text-green" />{{ b.label }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
