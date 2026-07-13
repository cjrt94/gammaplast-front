// Gamma Plast — configuración Nuxt 3 (JS nativo)
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],

  // Config de sitio compartida (nuxt-site-config): usada por el sitemap y el SEO.
  site: {
    url: 'https://gammaplast.com.pe',
    name: 'Gamma Plast'
  },

  app: {
    head: {
      // El <html lang/dir> lo fija useLocaleHead() por locale (ver layouts/default.vue).
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
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    // Necesario para que useLocaleHead() genere canonical + hreflang absolutos.
    baseUrl: 'https://gammaplast.com.pe',
    locales: [
      { code: 'es', language: 'es-PE', name: 'ES' },
      { code: 'en', language: 'en-US', name: 'EN' }
    ]
  },

  // Sitemap i18n-aware. Las rutas estáticas se descubren solas; las dinámicas
  // (novedades/[slug]) se inyectan desde el endpoint de abajo.
  sitemap: {
    sources: ['/api/__sitemap__/urls']
  }
})
