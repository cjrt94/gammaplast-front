<script setup>
// Lista repetible con reordenar (↑/↓) y eliminar. El editor de cada fila va por slot.
// Los ítems son objetos: editar sus props muta el objeto (reactividad profunda) y el padre
// lee el array actualizado al guardar.
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  newItem: { type: Function, default: () => ({}) },
  addLabel: { type: String, default: 'Agregar' }
})
const emit = defineEmits(['update:modelValue'])
const items = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })

const add = () => { items.value = [...items.value, props.newItem()] }
const removeAt = (i) => { items.value = items.value.filter((_, j) => j !== i) }
const move = (i, d) => {
  const j = i + d
  if (j < 0 || j >= items.value.length) return
  const a = [...items.value]
  ;[a[i], a[j]] = [a[j], a[i]]
  items.value = a
}
</script>

<template>
  <div class="space-y-3">
    <div v-for="(item, i) in items" :key="i" class="card p-4 flex gap-3 items-start">
      <span class="text-slate text-xs font-mono pt-1 w-5 shrink-0">{{ i + 1 }}</span>
      <div class="flex-1 min-w-0"><slot :item="item" :index="i" /></div>
      <div class="flex flex-col gap-1 shrink-0">
        <button type="button" class="w-7 h-7 rounded border border-line text-slate hover:border-green disabled:opacity-30" :disabled="i === 0" aria-label="Subir" @click="move(i, -1)">↑</button>
        <button type="button" class="w-7 h-7 rounded border border-line text-slate hover:border-green disabled:opacity-30" :disabled="i === items.length - 1" aria-label="Bajar" @click="move(i, 1)">↓</button>
        <button type="button" class="w-7 h-7 rounded border border-line text-red-600 hover:border-red-400" aria-label="Eliminar" @click="removeAt(i)">✕</button>
      </div>
    </div>
    <button type="button" class="btn btn-ghost text-sm py-2" @click="add">＋ {{ addLabel }}</button>
  </div>
</template>
