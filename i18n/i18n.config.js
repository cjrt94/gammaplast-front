import es from './locales/es.json'
import en from './locales/en.json'

// EN cae a ES mientras las traducciones estén pendientes (ver PLAN §9.10)
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'es',
  messages: { es, en }
}))
