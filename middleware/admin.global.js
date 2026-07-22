// Protege todo /admin/** (y su variante con prefijo de locale /en/admin) salvo el login.
// La sesión solo existe en cliente (Web SDK), así que en servidor no hacemos nada: el shell
// de /admin no es indexable ni SEO, y el gate real corre en cliente. Global → ninguna página
// admin puede quedar sin proteger por olvido.
export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return
  if (!to.path.includes('/admin')) return

  const isLogin = to.path.endsWith('/admin/login')
  const { user, ready, init } = useAdminAuth()
  if (!ready.value) await init()

  if (isLogin) {
    if (user.value) return navigateTo('/admin')
    return
  }
  if (!user.value) return navigateTo('/admin/login')
})
