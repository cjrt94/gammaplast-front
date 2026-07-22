// Firebase Web SDK — SOLO cliente (`.client.js` ⇒ nunca corre en SSR, mantiene el SDK
// fuera del bundle de servidor). Se usa únicamente en /admin (login + CRUD + subida a Storage).
// Inyecta los handles como $fbAuth / $fbDb / $fbStorage (patrón del back office de Figura).
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const cfg = useRuntimeConfig().public.firebase
  // Sin config (ej. build sin env) → no inicializamos; /admin avisará al intentar login.
  if (!cfg || !cfg.apiKey) return
  const app = getApps().length ? getApps()[0] : initializeApp(cfg)
  return {
    provide: {
      fbAuth: getAuth(app),
      fbDb: getFirestore(app),
      fbStorage: getStorage(app)
    }
  }
})
