<script setup>
// Lista de novedades.
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const crud = useFirestoreCrud('novedades')
const { confirm } = useConfirm()

const rows = ref([])
const loading = ref(true)
const columns = [
  { key: 'image', label: '', image: true },
  { key: 'title', label: 'Título' },
  { key: 'date', label: 'Fecha' },
  { key: 'estado', label: 'Estado' }
]
const reload = async () => {
  loading.value = true
  const list = await crud.list()
  rows.value = list.map((n) => ({ ...n, estado: n.published === false ? 'Borrador' : 'Publicada' }))
  loading.value = false
}
onMounted(reload)

const onEdit = (row) => navigateTo(localePath(`/admin/novedades/${row.id}`))
const onDelete = async (row) => {
  if (await confirm({ title: '¿Eliminar novedad?', message: `Se eliminará "${row.title}".` })) {
    await crud.remove(row.id); await reload()
  }
}
</script>

<template>
  <div>
    <AdminHeader title="Novedades" subtitle="Noticias del blog.">
      <template #action><NuxtLink :to="localePath('/admin/novedades/nuevo')" class="btn btn-green">＋ Nueva novedad</NuxtLink></template>
    </AdminHeader>
    <AdminList :rows="rows" :columns="columns" :loading="loading" @edit="onEdit" @delete="onDelete" />
  </div>
</template>
