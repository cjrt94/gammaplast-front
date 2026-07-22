<script setup>
// Lista de productos con filtro por sector.
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const crud = useFirestoreCrud('products')
const sectorsCrud = useFirestoreCrud('sectors')
const { confirm } = useConfirm()

const all = ref([])
const sectors = ref([])
const loading = ref(true)
const filter = ref('')
const columns = [
  { key: 'img', label: '', image: true },
  { key: 'name', label: 'Producto' },
  { key: 'sectorLabel', label: 'Sector' }
]

const reload = async () => {
  loading.value = true
  ;[all.value, sectors.value] = await Promise.all([crud.list(), sectorsCrud.list()])
  const bySlug = Object.fromEntries(sectors.value.map((s) => [s.slug, s.label]))
  all.value = all.value.map((p) => ({ ...p, sectorLabel: bySlug[p.sector] || p.sector }))
  loading.value = false
}
onMounted(reload)

const rows = computed(() => filter.value ? all.value.filter((p) => p.sector === filter.value) : all.value)
const onEdit = (row) => navigateTo(localePath(`/admin/productos/${row.id}`))
const onDelete = async (row) => {
  if (await confirm({ title: '¿Eliminar producto?', message: `Se eliminará "${row.name}".` })) {
    await crud.remove(row.id); await reload()
  }
}
</script>

<template>
  <div>
    <AdminHeader title="Productos" :subtitle="`${all.length} productos en el catálogo.`">
      <template #action><NuxtLink :to="localePath('/admin/productos/nuevo')" class="btn btn-green">＋ Nuevo producto</NuxtLink></template>
    </AdminHeader>
    <div class="mb-4">
      <select v-model="filter" class="field-input max-w-[280px]">
        <option value="">Todos los sectores</option>
        <option v-for="s in sectors" :key="s.slug" :value="s.slug">{{ s.label }}</option>
      </select>
    </div>
    <AdminList :rows="rows" :columns="columns" :loading="loading" @edit="onEdit" @delete="onDelete" />
  </div>
</template>
