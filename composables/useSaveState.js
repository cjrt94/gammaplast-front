// Estado de guardado para los editores del admin: saving / saved / error + run(fn).
export const useSaveState = () => {
  const saving = ref(false)
  const saved = ref(false)
  const error = ref('')

  const run = async (fn) => {
    saving.value = true
    saved.value = false
    error.value = ''
    try {
      await fn()
      saved.value = true
      setTimeout(() => { saved.value = false }, 2500)
    } catch (e) {
      console.error('[admin save]', e)
      error.value = e?.message || 'No se pudo guardar. Inténtalo de nuevo.'
    } finally {
      saving.value = false
    }
  }

  return { saving, saved, error, run }
}
