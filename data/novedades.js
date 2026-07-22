// Formato de fecha para novedades (las notas ahora viven en Firestore; ver /admin/novedades).
export const formatDate = (iso) => {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${meses[m - 1]} ${y}`
}
