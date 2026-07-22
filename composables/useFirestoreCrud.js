// CRUD sobre Firestore desde /admin (Web SDK, cliente). Gobernado por security rules
// (staff autenticado escribe; leads solo lectura). firebase/firestore se carga dinámico.
let _fs
const fs = () => (_fs ||= import('firebase/firestore'))

// Invalida el cache de /api/content/* tras escribir, para que la web pública muestre el cambio
// al instante. Fire-and-forget: si falla, el cache expira solo en 5 min (degradación suave).
async function revalidateContent () {
  try {
    const { $fbAuth } = useNuxtApp()
    const token = await $fbAuth?.currentUser?.getIdToken()
    if (token) await $fetch('/api/admin/revalidate', { method: 'POST', headers: { authorization: `Bearer ${token}` } })
  } catch (e) {
    console.warn('[admin] no se pudo invalidar el cache:', e?.message || e)
  }
}

export const useFirestoreCrud = (colName) => {
  const { $fbDb } = useNuxtApp()

  // Lista completa ordenada por `order` asc.
  const list = async () => {
    const { collection, getDocs } = await fs()
    const snap = await getDocs(collection($fbDb, colName))
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  const get = async (id) => {
    const { doc, getDoc } = await fs()
    const s = await getDoc(doc($fbDb, colName, id))
    return s.exists() ? { id: s.id, ...s.data() } : null
  }

  // Upsert por id (merge) con updatedAt de servidor; createdAt solo si es nuevo.
  const set = async (id, data, { isNew = false } = {}) => {
    const { doc, setDoc, serverTimestamp } = await fs()
    const payload = { ...data, updatedAt: serverTimestamp() }
    if (isNew) payload.createdAt = serverTimestamp()
    await setDoc(doc($fbDb, colName, id), payload, { merge: true })
    await revalidateContent()
  }

  const remove = async (id) => {
    const { doc, deleteDoc } = await fs()
    await deleteDoc(doc($fbDb, colName, id))
    await revalidateContent()
  }

  const exists = async (id) => {
    const { doc, getDoc } = await fs()
    return (await getDoc(doc($fbDb, colName, id))).exists()
  }

  return { list, get, set, remove, exists }
}

// Azúcar para singletons (colección `singletons`, doc por id).
export const useSingleton = (id) => {
  const crud = useFirestoreCrud('singletons')
  return {
    load: () => crud.get(id),
    save: (data) => crud.set(id, data)
  }
}
