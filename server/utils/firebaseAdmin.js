// Firebase Admin SDK — SOLO servidor (Nitro). Lo usan: las rutas /api/content/* (lectura
// pública SSR cacheada), la persistencia de leads y la subida de CVs a Storage.
// Singleton: Nitro reutiliza el módulo entre invocaciones calientes, así que inicializamos una vez.
//
// La service account llega BASE64 en runtimeConfig.firebaseServiceAccount (evita romper el PEM
// multilínea en Vercel). Auto-importado por Nitro (server/utils/**), no requiere import explícito.
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { getAuth } from 'firebase-admin/auth'

let _db = null
let _bucket = null
let _auth = null

function ensureApp () {
  if (getApps().length) return
  const cfg = useRuntimeConfig()
  if (!cfg.firebaseServiceAccount) {
    throw createError({ statusCode: 500, statusMessage: 'Firebase no configurado (falta NUXT_FIREBASE_SERVICE_ACCOUNT).' })
  }
  const sa = JSON.parse(Buffer.from(cfg.firebaseServiceAccount, 'base64').toString('utf8'))
  initializeApp({ credential: cert(sa), storageBucket: cfg.firebaseStorageBucket })
}

export function adminDb () {
  ensureApp()
  return (_db ||= getFirestore())
}

export function adminBucket () {
  ensureApp()
  return (_bucket ||= getStorage().bucket())
}

export function adminAuth () {
  ensureApp()
  return (_auth ||= getAuth())
}
