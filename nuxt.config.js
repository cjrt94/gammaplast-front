// Gamma Plast — configuración Nuxt 3 (JS nativo)
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Gamma Plast — Empaques flexibles',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Fabricante peruano de empaques flexibles de PE y PP: reciclables, compostables y con certificación FDA. Diseño, desarrollo y fabricación a medida.'
        },
        { name: 'theme-color', content: '#00B140' }
      ]
    }
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'es', language: 'es-PE', name: 'ES' },
      { code: 'en', language: 'en-US', name: 'EN' }
    ]
  }
})
