<script setup>
// Alta/edición de una novedad. id 'nuevo' = crear (id = slug indicado o slugify(title)).
definePageMeta({ layout: 'admin' })
const route = useRoute()
const localePath = useLocalePath()
const crud = useFirestoreCrud('novedades')
const { saving, saved, error, run } = useSaveState()

const isNew = computed(() => route.params.id === 'nuevo')
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const form = ref(null)
onMounted(async () => {
  form.value = isNew.value
    ? { slug: '', title: '', date: '', image: '', excerpt: '', body: [''], order: 0, published: true }
    : (await crud.get(route.params.id)) || {}
})

const onSave = () => run(async () => {
  if (!form.value.title) throw new Error('Indica el título.')
  const id = isNew.value ? slugify(form.value.slug || form.value.title) : route.params.id
  if (isNew.value && await crud.exists(id)) throw new Error(`Ya existe una novedad con el slug "${id}".`)
  form.value.slug = id
  form.value.order = Number(form.value.order) || 0
  await crud.set(id, form.value, { isNew: isNew.value })
  await navigateTo(localePath('/admin/novedades'))
})
</script>

<template>
  <div v-if="form" class="max-w-[720px]">
    <AdminHeader :title="isNew ? 'Nueva novedad' : `Editar: ${form.title}`" />
    <div class="card p-5 space-y-4">
      <div><label class="field-label">Título</label><input v-model="form.title" class="field-input"></div>
      <div class="grid sm:grid-cols-3 gap-3">
        <div>
          <label class="field-label">Slug{{ isNew ? '' : ' — no editable' }}</label>
          <input v-model="form.slug" class="field-input" :disabled="!isNew" placeholder="mi-noticia">
        </div>
        <div><label class="field-label">Fecha</label><input v-model="form.date" type="date" class="field-input"></div>
        <div>
          <label class="field-label">Estado</label>
          <select v-model="form.published" class="field-input"><option :value="true">Publicada</option><option :value="false">Borrador</option></select>
        </div>
      </div>
      <div><label class="field-label">Extracto</label><textarea v-model="form.excerpt" rows="2" class="field-input"></textarea></div>
      <AdminImageUploader v-model="form.image" folder="novedades" label="Imagen destacada" />
      <div><label class="field-label">Cuerpo (párrafos)</label><AdminStringList v-model="form.body" multiline add-label="Agregar párrafo" /></div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
    <NuxtLink :to="localePath('/admin/novedades')" class="inline-block mt-4 text-slate hover:text-green-700 text-sm">← Volver a novedades</NuxtLink>
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
