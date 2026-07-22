// Estado de sesión del staff para /admin (Firebase Auth, Web SDK — solo cliente).
// Rol único: cualquier usuario autenticado = admin (los usuarios se crean a mano en consola /
// vía Admin SDK, no hay alta pública). firebase/auth se importa dinámico para no entrar al SSR.
export const useAdminAuth = () => {
  const user = useState('admin-user', () => null)
  const ready = useState('admin-auth-ready', () => false)

  // Resuelve el estado inicial una vez (onAuthStateChanged). No-op en servidor.
  const init = () => {
    if (import.meta.server || ready.value) return Promise.resolve()
    const { $fbAuth } = useNuxtApp()
    if (!$fbAuth) { ready.value = true; return Promise.resolve() }
    return new Promise((resolve) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        onAuthStateChanged($fbAuth, (u) => {
          user.value = u ? { uid: u.uid, email: u.email } : null
          ready.value = true
          resolve()
        })
      })
    })
  }

  const login = async (email, password) => {
    const { $fbAuth } = useNuxtApp()
    if (!$fbAuth) throw new Error('Firebase no está configurado.')
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    const cred = await signInWithEmailAndPassword($fbAuth, email, password)
    user.value = { uid: cred.user.uid, email: cred.user.email }
    return user.value
  }

  const logout = async () => {
    const { $fbAuth } = useNuxtApp()
    const { signOut } = await import('firebase/auth')
    await signOut($fbAuth)
    user.value = null
  }

  return { user, ready, init, login, logout }
}
