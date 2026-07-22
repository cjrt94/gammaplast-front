// Persistencia de leads (envíos de formularios) en Firestore + subida de CVs a Storage.
// Todo vía Admin SDK (server). Auto-importado por Nitro (server/utils/**).
//
// Filosofía: el registro es la fuente DURABLE del lead (hoy solo se mandan por email y se
// pierden). Por eso se persiste independientemente del email y siempre envuelto en try/catch
// por el llamador → un fallo de Firestore/Storage jamás rompe el submit del usuario.
import { FieldValue } from 'firebase-admin/firestore'
import { randomUUID } from 'node:crypto'

// Guarda un lead en la colección indicada con read:false + createdAt de servidor.
export async function saveLead (collection, data) {
  await adminDb().collection(collection).add({
    ...data,
    read: false,
    createdAt: FieldValue.serverTimestamp()
  })
}

// Sube el CV a Storage bajo cv/<yyyy>/<uuid>-<nombre-seguro> (privado; se sirve por URL firmada
// desde /admin). Devuelve { cvPath, cvFilename } para guardar en el doc del lead.
export async function uploadCv (cv) {
  const safe = cv.filename.replace(/[^\w.\-]+/g, '_').slice(-80)
  const year = new Date().getFullYear()
  const cvPath = `cv/${year}/${randomUUID()}-${safe}`
  await adminBucket().file(cvPath).save(cv.data, {
    contentType: cv.type || 'application/octet-stream',
    metadata: { originalName: cv.filename }
  })
  return { cvPath, cvFilename: cv.filename }
}
