<script setup>
// Imagen que llena su contenedor (object-cover) con zoom sutil al hover del grupo.
// Debe vivir dentro de un ancestro `.group.relative.overflow-hidden`. El zoom se
// neutraliza bajo prefers-reduced-motion (regla global en main.css).
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined }
})
</script>

<template>
  <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy"
    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">
</template>
