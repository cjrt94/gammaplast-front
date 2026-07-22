<script setup>
// Barra de guardado fija al pie de los editores. Muestra estado y emite `save`.
defineProps({ saving: Boolean, saved: Boolean, error: String })
defineEmits(['save'])
</script>

<template>
  <div class="sticky bottom-0 mt-8 -mx-7 px-7 py-4 bg-paper border-t border-line flex items-center justify-end gap-4">
    <p v-if="error" role="alert" class="text-[.88rem] text-red-600 mr-auto">{{ error }}</p>
    <p v-else-if="saved" class="text-[.88rem] text-green-700 mr-auto">✓ Guardado</p>
    <button type="button" class="btn btn-green" :disabled="saving" @click="$emit('save')">
      {{ saving ? 'Guardando…' : 'Guardar cambios' }}
    </button>
  </div>
</template>
