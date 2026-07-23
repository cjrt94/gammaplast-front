<script setup>
// Dashboard del back office: accesos a contenido + contadores de leads sin leer.
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const { ready, init } = useAdminAuth()

const leads = [
  { key: 'mensajes', label: 'Mensajes de contacto', to: '/admin/leads/mensajes', col: 'contactMessages' },
  { key: 'asesores', label: 'Solicitudes de asesor', to: '/admin/leads/asesores', col: 'advisorRequests' }
]
const counts = ref({ mensajes: null, asesores: null })

const contenido = [
  ['Home', '/admin/home'], ['Nosotros', '/admin/nosotros'], ['Sectores', '/admin/sectores'],
  ['Productos', '/admin/productos'], ['Materiales', '/admin/materiales'], ['Novedades', '/admin/novedades'],
  ['Certificaciones', '/admin/certificaciones'], ['Logos de clientes', '/admin/logos-clientes'],
  ['Logos de certificación', '/admin/logos-certificacion'], ['Contacto y datos', '/admin/contacto'],
  ['Páginas', '/admin/paginas'], ['SEO y FAQ', '/admin/seo'], ['Ajustes del sitio', '/admin/ajustes']
]

onMounted(async () => {
  if (!ready.value) await init()
  try {
    const { $fbDb } = useNuxtApp()
    const { collection, query, where, getCountFromServer } = await import('firebase/firestore')
    for (const l of leads) {
      const snap = await getCountFromServer(query(collection($fbDb, l.col), where('read', '==', false)))
      counts.value[l.key] = snap.data().count
    }
  } catch (e) {
    // Sin reglas desplegadas o sin red: dejamos los contadores en null (se muestra "—").
    console.warn('[admin] no se pudieron leer los contadores de leads:', e?.message || e)
  }
})
</script>

<template>
  <div>
    <h1 class="text-[1.6rem] mb-1">Bandeja y contenido</h1>
    <p class="text-slate mb-7">Gestiona la información del sitio y revisa los mensajes recibidos.</p>

    <!-- Leads -->
    <div class="grid sm:grid-cols-3 gap-4 mb-9">
      <NuxtLink v-for="l in leads" :key="l.key" :to="localePath(l.to)" class="card card-hover p-5 flex items-center justify-between">
        <div>
          <p class="text-slate text-[.85rem]">{{ l.label }}</p>
          <p class="font-display font-bold text-[1.7rem] leading-tight">{{ counts[l.key] ?? '—' }}</p>
          <p class="text-[.75rem] text-slate">sin leer</p>
        </div>
        <BaseIcon name="arrow" class="w-5 h-5 text-green-700" />
      </NuxtLink>
    </div>

    <!-- Contenido -->
    <p class="eyebrow mb-3">Contenido del sitio</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <NuxtLink v-for="[label, to] in contenido" :key="to" :to="localePath(to)"
        class="card card-hover p-4 flex items-center justify-between text-[.95rem] font-display font-semibold">
        {{ label }} <BaseIcon name="arrow" class="w-4 h-4 text-green-700" />
      </NuxtLink>
    </div>
  </div>
</template>
