<script setup>
// Subida de imágenes a Firebase Storage (content/<folder>/<timestamp>-<archivo>) → devuelve la
// URL de descarga. Acepta también rutas públicas existentes (/photos, /products, /logos) como
// valor válido, así nada se rompe antes de re-subir. Sin compresión (respeta SVG/PNG de logos).
const props = defineProps({
  modelValue: { type: String, default: '' },
  folder: { type: String, default: 'misc' },
  label: { type: String, default: 'Imagen' },
  accept: { type: String, default: 'image/*' }
})
const emit = defineEmits(['update:modelValue'])

const uploading = ref(false)
const error = ref('')
const isVideo = computed(() => /\.(mp4|webm|mov|ogg)(\?|$)/i.test(props.modelValue || ''))

const onFile = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  error.value = ''
  uploading.value = true
  try {
    const { $fbStorage } = useNuxtApp()
    const { ref: sRef, uploadBytes, getDownloadURL } = await import('firebase/storage')
    const safe = file.name.replace(/[^\w.\-]+/g, '_')
    const path = `content/${props.folder}/${Date.now()}-${safe}`
    const r = sRef($fbStorage, path)
    await uploadBytes(r, file)
    emit('update:modelValue', await getDownloadURL(r))
  } catch (err) {
    console.error('[ImageUploader]', err)
    error.value = 'No se pudo subir la imagen.'
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}
</script>

<template>
  <div>
    <label class="field-label">{{ label }}</label>
    <div class="flex items-start gap-4">
      <div class="w-24 h-24 shrink-0 rounded border border-line bg-mist grid place-items-center overflow-hidden">
        <video v-if="modelValue && isVideo" :src="modelValue" class="w-full h-full object-cover" muted />
        <img v-else-if="modelValue" :src="modelValue" alt="" class="w-full h-full object-contain">
        <span v-else class="text-slate text-xs">sin archivo</span>
      </div>
      <div class="flex-1 space-y-2">
        <input type="file" :accept="accept" class="block text-sm text-slate file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-green-tint file:text-green-700 file:font-semibold file:cursor-pointer" @change="onFile">
        <p v-if="uploading" class="text-[.82rem] text-green-700">Subiendo…</p>
        <p v-if="error" class="text-[.82rem] text-red-600">{{ error }}</p>
        <!-- Ruta editable (para pegar/ajustar manualmente o mantener la actual). -->
        <input :value="modelValue" type="text" class="field-input text-[.82rem] py-2" placeholder="/photos/…  o URL"
          @input="emit('update:modelValue', $event.target.value)">
      </div>
    </div>
  </div>
</template>
