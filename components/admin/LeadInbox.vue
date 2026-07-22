<script setup>
// Bandeja de leads: lista (más recientes primero), marca leído/no leído, elimina y —para
// postulaciones— descarga el CV vía ruta autenticada. `fields` define qué columnas mostrar.
const props = defineProps({
  collection: { type: String, required: true },
  title: String,
  subtitle: String,
  fields: { type: Array, default: () => [] }, // [{ key, label }]
  hasCv: { type: Boolean, default: false }
})
const { list, markRead, remove } = useLeads(props.collection)
const { confirm } = useConfirm()

const rows = ref(null)
const cvBusy = ref('')
const reload = async () => { rows.value = await list() }
onMounted(reload)

const unread = computed(() => (rows.value || []).filter((r) => r.read === false).length)

const toggleRead = async (row) => { await markRead(row.id, !row.read); row.read = !row.read }
const onDelete = async (row) => {
  if (await confirm({ title: '¿Eliminar registro?', message: 'Esta acción no se puede deshacer.' })) {
    await remove(row.id); await reload()
  }
}
const downloadCv = async (row) => {
  cvBusy.value = row.id
  try {
    const { $fbAuth } = useNuxtApp()
    const token = await $fbAuth.currentUser.getIdToken()
    const { url } = await $fetch('/api/admin/cv-url', { method: 'POST', body: { cvPath: row.cvPath }, headers: { authorization: `Bearer ${token}` } })
    window.open(url, '_blank')
  } catch (e) {
    console.error('[cv]', e)
  } finally {
    cvBusy.value = ''
  }
}
</script>

<template>
  <div>
    <AdminHeader :title="title" :subtitle="subtitle" />
    <p v-if="rows" class="text-slate text-[.9rem] mb-4">{{ rows.length }} registro(s) · {{ unread }} sin leer</p>

    <div v-if="!rows" class="text-slate">Cargando…</div>
    <div v-else-if="!rows.length" class="card p-8 text-center text-slate">No hay registros todavía.</div>
    <div v-else class="space-y-3">
      <article v-for="row in rows" :key="row.id" class="card p-5" :class="row.read === false ? 'border-green' : ''">
        <div class="flex items-start justify-between gap-4 mb-2">
          <div class="flex items-center gap-2">
            <span v-if="row.read === false" class="w-2 h-2 rounded-full bg-green-600" aria-label="Sin leer"></span>
            <h3 class="font-display font-bold">{{ row.nombre }} {{ row.apellido }}</h3>
          </div>
          <time class="text-slate text-[.8rem] shrink-0">{{ formatLeadDate(row.createdAt) }}</time>
        </div>
        <dl class="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-[.9rem] mb-3">
          <div v-for="f in fields" :key="f.key" class="flex gap-2">
            <dt class="text-slate">{{ f.label }}:</dt>
            <dd class="min-w-0 break-words">{{ row[f.key] || '—' }}</dd>
          </div>
        </dl>
        <p v-if="row.mensaje" class="text-body text-[.95rem] bg-mist rounded p-3 mb-3 whitespace-pre-wrap">{{ row.mensaje }}</p>
        <div class="flex flex-wrap items-center gap-3 text-[.85rem]">
          <button type="button" class="btn btn-ghost py-1.5 px-3" @click="toggleRead(row)">{{ row.read === false ? 'Marcar leída' : 'Marcar no leída' }}</button>
          <button v-if="hasCv && row.cvPath" type="button" class="btn btn-ghost py-1.5 px-3" :disabled="cvBusy === row.id" @click="downloadCv(row)">
            {{ cvBusy === row.id ? 'Generando…' : 'Descargar CV' }}
          </button>
          <span v-else-if="hasCv" class="text-slate">Sin CV en Storage</span>
          <button type="button" class="text-red-600 hover:underline ml-auto" @click="onDelete(row)">Eliminar</button>
        </div>
      </article>
    </div>
  </div>
</template>
