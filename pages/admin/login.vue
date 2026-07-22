<script setup>
// Login del back office (email/password, Firebase Auth). Sin layout público.
definePageMeta({ layout: false })

const { login } = useAdminAuth()
const localePath = useLocalePath()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Mensajes amables para los códigos de error de Firebase Auth.
const friendly = (code) => {
  if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(code)) return 'Correo o contraseña incorrectos.'
  if (code === 'auth/too-many-requests') return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.'
  if (code === 'auth/invalid-email') return 'El correo no es válido.'
  return 'No pudimos iniciar sesión. Inténtalo de nuevo.'
}

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(email.value.trim(), password.value)
    await navigateTo(localePath('/admin'))
  } catch (e) {
    error.value = friendly(e?.code)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen grid place-items-center bg-mist px-5">
    <div class="card p-8 w-full max-w-[400px]">
      <div class="mb-6 text-center">
        <span class="eyebrow">Back office</span>
        <h1 class="text-[1.5rem] mt-2">Gamma Plast</h1>
        <p class="text-slate text-[.92rem] mt-1">Ingresa con tu cuenta de staff.</p>
      </div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="field-label">Correo</label>
          <input id="email" v-model="email" type="email" autocomplete="username" required class="field-input" placeholder="tucorreo@gammaplast.com.pe">
        </div>
        <div>
          <label for="password" class="field-label">Contraseña</label>
          <input id="password" v-model="password" type="password" autocomplete="current-password" required class="field-input" placeholder="••••••••">
        </div>
        <p v-if="error" role="alert" class="text-[.88rem] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{{ error }}</p>
        <button type="submit" class="btn btn-green w-full justify-center" :disabled="loading">
          {{ loading ? 'Ingresando…' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>
