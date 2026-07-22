<script setup>
// Editor de un array de strings (teléfonos, emails, listas de materiales…).
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  addLabel: { type: String, default: 'Agregar' },
  multiline: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const items = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })

const update = (i, val) => { const a = [...items.value]; a[i] = val; items.value = a }
const add = () => { items.value = [...items.value, ''] }
const removeAt = (i) => { items.value = items.value.filter((_, j) => j !== i) }
</script>

<template>
  <div class="space-y-2">
    <div v-for="(s, i) in items" :key="i" class="flex gap-2">
      <textarea v-if="multiline" :value="s" rows="3" class="field-input" :placeholder="placeholder" @input="update(i, $event.target.value)"></textarea>
      <input v-else :value="s" type="text" class="field-input" :placeholder="placeholder" @input="update(i, $event.target.value)">
      <button type="button" class="w-10 shrink-0 rounded border border-line text-red-600 hover:border-red-400" aria-label="Eliminar" @click="removeAt(i)">✕</button>
    </div>
    <button type="button" class="btn btn-ghost text-sm py-2" @click="add">＋ {{ addLabel }}</button>
  </div>
</template>
