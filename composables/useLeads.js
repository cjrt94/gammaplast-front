// Lectura y gestión de leads desde /admin (Web SDK, staff autenticado). Ordena por createdAt desc.
let _fs
const fs = () => (_fs ||= import('firebase/firestore'))

export const useLeads = (colName) => {
  const { $fbDb } = useNuxtApp()

  const list = async () => {
    const { collection, getDocs, query, orderBy } = await fs()
    const snap = await getDocs(query(collection($fbDb, colName), orderBy('createdAt', 'desc')))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }
  const markRead = async (id, read = true) => {
    const { doc, updateDoc } = await fs()
    await updateDoc(doc($fbDb, colName, id), { read })
  }
  const remove = async (id) => {
    const { doc, deleteDoc } = await fs()
    await deleteDoc(doc($fbDb, colName, id))
  }
  return { list, markRead, remove }
}

// Formatea un Timestamp de Firestore (o ISO) a fecha/hora legible.
export const formatLeadDate = (ts) => {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : (ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts))
  return d.toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
