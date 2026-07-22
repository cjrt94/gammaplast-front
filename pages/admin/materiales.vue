<script setup>
// Editor de estructuras y materiales (singletons/materials): colores + monocapa + laminado.
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('materials')
const { saving, saved, error, run } = useSaveState()

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || { colores: [], monocapa: [], laminado: [] }
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[720px]">
    <AdminHeader title="Estructuras y materiales" subtitle="Se muestran en el bloque de cierre de Productos." />
    <div class="space-y-6">
      <div class="card p-5 space-y-3">
        <label class="field-label">Colores (hex, ej. #22c55e)</label>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-for="(c, i) in form.colores" :key="i" class="w-6 h-6 rounded-full border border-line" :style="{ background: c }" :title="c"></span>
        </div>
        <AdminStringList v-model="form.colores" placeholder="#22c55e" add-label="Agregar color" />
      </div>
      <div class="card p-5 space-y-3">
        <label class="field-label">Monocapa</label>
        <AdminStringList v-model="form.monocapa" placeholder="PE Baja densidad virgen" add-label="Agregar material" />
      </div>
      <div class="card p-5 space-y-3">
        <label class="field-label">Laminado</label>
        <AdminStringList v-model="form.laminado" placeholder="BOPP" add-label="Agregar material" />
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
