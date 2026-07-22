<script setup>
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const crud = useFirestoreCrud('certifications')
const { confirm } = useConfirm()

const rows = ref([])
const loading = ref(true)
const columns = [{ key: 'code', label: 'Código' }, { key: 'desc', label: 'Descripción' }, { key: 'icon', label: 'Ícono' }]
const reload = async () => { loading.value = true; rows.value = await crud.list(); loading.value = false }
onMounted(reload)

const onEdit = (row) => navigateTo(localePath(`/admin/certificaciones/${row.id}`))
const onDelete = async (row) => {
  if (await confirm({ title: '¿Eliminar certificación?', message: `Se eliminará "${row.code}".` })) { await crud.remove(row.id); await reload() }
}
</script>

<template>
  <div>
    <AdminHeader title="Certificaciones" subtitle="Grid de certificaciones de la página Nosotros.">
      <template #action><NuxtLink :to="localePath('/admin/certificaciones/nuevo')" class="btn btn-green">＋ Nueva</NuxtLink></template>
    </AdminHeader>
    <AdminList :rows="rows" :columns="columns" :loading="loading" @edit="onEdit" @delete="onDelete" />
  </div>
</template>
