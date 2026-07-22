// Confirmación modal (sin confirm() nativo — regla del repo). Uso:
//   const { confirm } = useConfirm()
//   if (await confirm({ title: '¿Eliminar?', message: '...' })) { ... }
// El <ConfirmDialog /> montado en el layout admin lee este estado y resuelve la promesa.
export const useConfirm = () => {
  const state = useState('admin-confirm', () => ({ show: false, title: '', message: '', confirmLabel: 'Eliminar', _resolve: null }))

  const confirm = ({ title = '¿Confirmar?', message = '', confirmLabel = 'Eliminar' } = {}) =>
    new Promise((resolve) => {
      state.value = { show: true, title, message, confirmLabel, _resolve: resolve }
    })

  const answer = (val) => {
    const r = state.value._resolve
    state.value = { ...state.value, show: false, _resolve: null }
    r?.(val)
  }

  return { state, confirm, answer }
}
