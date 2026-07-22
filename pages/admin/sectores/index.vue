<script setup>
// Lista de sectores.
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const crud = useFirestoreCrud('sectors')
const { confirm } = useConfirm()

const rows = ref([])
const loading = ref(true)
const columns = [
  { key: 'banner', label: '', image: true },
  { key: 'label', label: 'Sector' },
  { key: 'short', label: 'Nombre corto' },
  { key: 'slug', label: 'Slug' }
]
const reload = async () => { loading.value = true; rows.value = await crud.list(); loading.value = false }
onMounted(reload)

const onEdit = (row) => navigateTo(localePath(`/admin/sectores/${row.id}`))
const onDelete = async (row) => {
  if (await confirm({ title: '¿Eliminar sector?', message: `Se eliminará "${row.label}". Los productos de este sector quedarán sin categoría.` })) {
    await crud.remove(row.id); await reload()
  }
}
</script>

<template>
  <div>
    <AdminHeader title="Sectores" subtitle="Las 7 categorías del catálogo.">
      <template #action><NuxtLink :to="localePath('/admin/sectores/nuevo')" class="btn btn-green">＋ Nuevo sector</NuxtLink></template>
    </AdminHeader>
    <AdminList :rows="rows" :columns="columns" :loading="loading" @edit="onEdit" @delete="onDelete" />
  </div>
</template>
