<script setup>
// Alta/edición de un sector. id 'nuevo' = crear.
definePageMeta({ layout: 'admin' })
const route = useRoute()
const localePath = useLocalePath()
const crud = useFirestoreCrud('sectors')
const { saving, saved, error, run } = useSaveState()

const isNew = computed(() => route.params.id === 'nuevo')
const ICONS = ['food', 'agro', 'shirt', 'package', 'spray', 'retail', 'industry']
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const form = ref(null)
onMounted(async () => {
  if (isNew.value) {
    form.value = { slug: '', label: '', short: '', icon: 'food', desc: '', banner: '', order: 99 }
  } else {
    form.value = (await crud.get(route.params.id)) || {}
  }
})

const onSave = () => run(async () => {
  const id = isNew.value ? slugify(form.value.slug || form.value.label) : route.params.id
  if (!id) throw new Error('Indica un slug o un nombre.')
  if (isNew.value && await crud.exists(id)) throw new Error(`Ya existe un sector con el slug "${id}".`)
  form.value.slug = id
  form.value.order = Number(form.value.order) || 0
  await crud.set(id, form.value, { isNew: isNew.value })
  await navigateTo(localePath('/admin/sectores'))
})
</script>

<template>
  <div v-if="form" class="max-w-[640px]">
    <AdminHeader :title="isNew ? 'Nuevo sector' : `Editar: ${form.label}`" />
    <div class="card p-5 space-y-4">
      <div>
        <label class="field-label">Slug (identificador en la URL){{ isNew ? '' : ' — no editable' }}</label>
        <input v-model="form.slug" class="field-input" :disabled="!isNew" placeholder="alimentos-y-bebidas">
      </div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="field-label">Nombre</label><input v-model="form.label" class="field-input"></div>
        <div><label class="field-label">Nombre corto (chip de filtro)</label><input v-model="form.short" class="field-input"></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div>
          <label class="field-label">Ícono</label>
          <select v-model="form.icon" class="field-input"><option v-for="ic in ICONS" :key="ic" :value="ic">{{ ic }}</option></select>
        </div>
        <div><label class="field-label">Orden</label><input v-model="form.order" type="number" class="field-input"></div>
      </div>
      <div><label class="field-label">Descripción</label><textarea v-model="form.desc" rows="2" class="field-input"></textarea></div>
      <AdminImageUploader v-model="form.banner" folder="sectores" label="Banner del sector" />
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
    <NuxtLink :to="localePath('/admin/sectores')" class="inline-block mt-4 text-slate hover:text-green-700 text-sm">← Volver a sectores</NuxtLink>
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
