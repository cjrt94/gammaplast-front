// SEO por página desde el CMS (singletons/seo vía /api/content/seo). Aplica useSeo con el
// título/descripción de la página indicada y devuelve el objeto seo completo (para FAQ y para
// alimentar el JSON-LD). Key fija ⇒ una sola petición compartida.
export const usePageSeo = async (pageKey, opts = {}) => {
  const { data: seo } = await useAsyncData('site-seo', () => $fetch('/api/content/seo'), {
    default: () => ({ pages: {}, faq: {} })
  })
  const page = (seo.value.pages && seo.value.pages[pageKey]) || {}
  useSeo({ title: page.title, description: page.description, ...opts })
  return { seo, title: page.title || '', description: page.description || '' }
}
