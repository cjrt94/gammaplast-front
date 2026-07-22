<script setup>
// Tabla de lista para colecciones. columns: [{ key, label, image? }]. Emite edit/delete por fila.
const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  loading: Boolean,
  rowKey: { type: String, default: 'id' }
})
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="card overflow-hidden">
    <div v-if="loading" class="p-8 text-center text-slate">Cargando…</div>
    <table v-else-if="rows.length" class="w-full text-[.92rem]">
      <thead class="bg-mist border-b border-line text-left">
        <tr>
          <th v-for="c in columns" :key="c.key" class="px-4 py-3 font-display font-semibold text-slate">{{ c.label }}</th>
          <th class="px-4 py-3 w-px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[rowKey]" class="border-b border-line last:border-0 hover:bg-mist/60">
          <td v-for="c in columns" :key="c.key" class="px-4 py-3 align-middle">
            <img v-if="c.image" :src="row[c.key]" alt="" class="w-12 h-12 object-contain rounded bg-mist">
            <span v-else>{{ row[c.key] }}</span>
          </td>
          <td class="px-4 py-3 whitespace-nowrap text-right">
            <button type="button" class="text-green-700 font-semibold hover:underline mr-4" @click="emit('edit', row)">Editar</button>
            <button type="button" class="text-red-600 hover:underline" @click="emit('delete', row)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="p-8 text-center text-slate">No hay elementos todavía.</div>
  </div>
</template>
