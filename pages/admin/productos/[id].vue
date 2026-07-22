<script setup>
// Alta/edición de un producto. id 'nuevo' = crear (id = slugify(name)).
definePageMeta({ layout: 'admin' })
const route = useRoute()
const localePath = useLocalePath()
const crud = useFirestoreCrud('products')
const sectorsCrud = useFirestoreCrud('sectors')
const { saving, saved, error, run } = useSaveState()

const isNew = computed(() => route.params.id === 'nuevo')
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const form = ref(null)
const sectors = ref([])
onMounted(async () => {
  sectors.value = await sectorsCrud.list()
  form.value = isNew.value
    ? { name: '', img: '', sector: sectors.value[0]?.slug || '', desc: '', order: 99 }
    : (await crud.get(route.params.id)) || {}
})

const onSave = () => run(async () => {
  if (!form.value.name) throw new Error('Indica el nombre del producto.')
  const id = isNew.value ? slugify(form.value.name) : route.params.id
  if (isNew.value && await crud.exists(id)) throw new Error(`Ya existe un producto con el id "${id}".`)
  form.value.id = id
  form.value.order = Number(form.value.order) || 0
  await crud.set(id, form.value, { isNew: isNew.value })
  await navigateTo(localePath('/admin/productos'))
})
</script>

<template>
  <div v-if="form" class="max-w-[640px]">
    <AdminHeader :title="isNew ? 'Nuevo producto' : `Editar: ${form.name}`" />
    <div class="card p-5 space-y-4">
      <div><label class="field-label">Nombre</label><input v-model="form.name" class="field-input"></div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div>
          <label class="field-label">Sector</label>
          <select v-model="form.sector" class="field-input"><option v-for="s in sectors" :key="s.slug" :value="s.slug">{{ s.label }}</option></select>
        </div>
        <div><label class="field-label">Orden (dentro del sector)</label><input v-model="form.order" type="number" class="field-input"></div>
      </div>
      <div><label class="field-label">Descripción (opcional)</label><textarea v-model="form.desc" rows="2" class="field-input"></textarea></div>
      <AdminImageUploader v-model="form.img" folder="productos" label="Imagen del producto" />
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
    <NuxtLink :to="localePath('/admin/productos')" class="inline-block mt-4 text-slate hover:text-green-700 text-sm">← Volver a productos</NuxtLink>
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
