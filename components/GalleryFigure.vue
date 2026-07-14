<script setup>
// Celda de galería (mosaico de planta): figure con reveal + zoom al hover.
// Las clases de tamaño de celda (col-span/row-span) se pasan por `class` y se
// fusionan con la raíz (fallthrough de Vue).
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined }
})
</script>

<template>
  <figure class="reveal group relative overflow-hidden rounded-card">
    <ZoomImage :src="src" :alt="alt" :width="width" :height="height" />
  </figure>
</template>
