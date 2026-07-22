<script setup>
definePageMeta({ layout: 'admin' })
const route = useRoute()
const localePath = useLocalePath()
const crud = useFirestoreCrud('certifications')
const { saving, saved, error, run } = useSaveState()

const isNew = computed(() => route.params.id === 'nuevo')
const ICONS = ['recycle', 'leaf', 'sprout', 'shield', 'award', 'food']
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const form = ref(null)
onMounted(async () => {
  form.value = isNew.value ? { code: '', desc: '', icon: 'award', order: 99 } : (await crud.get(route.params.id)) || {}
})

const onSave = () => run(async () => {
  if (!form.value.code) throw new Error('Indica el código.')
  const id = isNew.value ? slugify(form.value.code) : route.params.id
  if (isNew.value && await crud.exists(id)) throw new Error(`Ya existe una certificación "${id}".`)
  form.value.order = Number(form.value.order) || 0
  await crud.set(id, form.value, { isNew: isNew.value })
  await navigateTo(localePath('/admin/certificaciones'))
})
</script>

<template>
  <div v-if="form" class="max-w-[560px]">
    <AdminHeader :title="isNew ? 'Nueva certificación' : `Editar: ${form.code}`" />
    <div class="card p-5 space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="field-label">Código</label><input v-model="form.code" class="field-input" placeholder="RCS"></div>
        <div><label class="field-label">Orden</label><input v-model="form.order" type="number" class="field-input"></div>
      </div>
      <div><label class="field-label">Descripción</label><input v-model="form.desc" class="field-input" placeholder="Recycled Claim Standard"></div>
      <div>
        <label class="field-label">Ícono</label>
        <select v-model="form.icon" class="field-input"><option v-for="ic in ICONS" :key="ic" :value="ic">{{ ic }}</option></select>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
    <NuxtLink :to="localePath('/admin/certificaciones')" class="inline-block mt-4 text-slate hover:text-green-700 text-sm">← Volver</NuxtLink>
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
