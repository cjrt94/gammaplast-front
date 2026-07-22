<script setup>
// Gestor de una colección de logos simples { src, alt, order }: editar en línea, agregar,
// eliminar y reordenar, todo con un único "Guardar". Reutilizado por clientes y certificación.
const props = defineProps({
  collection: { type: String, required: true },
  folder: { type: String, default: 'logos' },
  title: String,
  subtitle: String,
  idPrefix: { type: String, default: 'logo' }
})
const crud = useFirestoreCrud(props.collection)
const { saving, saved, error, run } = useSaveState()

const items = ref(null)
const originalIds = ref(new Set())
onMounted(async () => {
  const list = await crud.list()
  items.value = list
  originalIds.value = new Set(list.map((l) => l.id))
})

const onSave = () => run(async () => {
  const kept = new Set()
  for (let i = 0; i < items.value.length; i++) {
    const it = items.value[i]
    const id = it.id || `${props.idPrefix}-${Date.now()}-${i}`
    it.id = id
    kept.add(id)
    await crud.set(id, { id, src: it.src || '', alt: it.alt || '', order: i }, { isNew: !originalIds.value.has(id) })
  }
  for (const id of originalIds.value) if (!kept.has(id)) await crud.remove(id)
  originalIds.value = kept
})
</script>

<template>
  <div v-if="items" class="max-w-[720px]">
    <AdminHeader :title="title" :subtitle="subtitle" />
    <AdminRepeatableList v-model="items" :new-item="() => ({ src: '', alt: '' })" add-label="Agregar logo">
      <template #default="{ item }">
        <input v-model="item.alt" class="field-input mb-2" placeholder="Nombre / texto alternativo">
        <AdminImageUploader v-model="item.src" :folder="folder" label="Logo" />
      </template>
    </AdminRepeatableList>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
