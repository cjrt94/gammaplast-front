// Ajustes globales del sitio (singletons/settings vía /api/content/settings): texto del footer,
// claim del topbar, badges de certificación y descripción de la organización (JSON-LD).
export const useSettings = () => useAsyncData('site-settings', () => $fetch('/api/content/settings'), {
  default: () => ({ footerAbout: '', topbarClaim: '', certBadges: [], orgDescription: '' })
})
