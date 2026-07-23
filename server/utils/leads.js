// Persistencia de leads (envíos de formularios) en Firestore. Vía Admin SDK (server).
// Auto-importado por Nitro (server/utils/**).
//
// Filosofía: el registro es la fuente DURABLE del lead (antes solo se mandaban por email y se
// perdían). Por eso se persiste independientemente del email y siempre envuelto en try/catch
// por el llamador → un fallo de Firestore jamás rompe el submit del usuario.
import { FieldValue } from 'firebase-admin/firestore'

// Guarda un lead en la colección indicada con read:false + createdAt de servidor.
export async function saveLead (collection, data) {
  await adminDb().collection(collection).add({
    ...data,
    read: false,
    createdAt: FieldValue.serverTimestamp()
  })
}
