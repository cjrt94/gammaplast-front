// Lectura de contenido desde Firestore (Admin SDK) para las rutas /api/content/*.
// Auto-importado por Nitro. Ordena por `order` y limpia campos internos que no serializan
// bien por useFetch (Timestamps de createdAt/updatedAt) y que las páginas no usan.

function clean (obj) {
  const { createdAt, updatedAt, ...rest } = obj
  return rest
}

// Colección completa, ordenada por `order` asc.
export async function fetchCollection (name) {
  const snap = await adminDb().collection(name).get()
  return snap.docs
    .map((d) => clean({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

// Un singleton (singletons/<id>) o null si no existe.
export async function fetchSingleton (id) {
  const doc = await adminDb().collection('singletons').doc(id).get()
  return doc.exists ? clean(doc.data()) : null
}

// Novedades publicadas, ordenadas (order asc = fecha desc, como el orden original).
export async function fetchNovedades () {
  const all = await fetchCollection('novedades')
  return all.filter((n) => n.published !== false)
}

// Una novedad por slug (doc id) o null.
export async function fetchNovedad (slug) {
  const doc = await adminDb().collection('novedades').doc(slug).get()
  if (!doc.exists) return null
  const d = clean({ id: doc.id, ...doc.data() })
  return d.published === false ? null : d
}
