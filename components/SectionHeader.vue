<script setup>
defineProps({
  eyebrow: String,
  title: String,
  intro: String,
  center: Boolean
})
</script>

<template>
  <div class="reveal mb-11" :class="center ? 'text-center max-w-[640px] mx-auto' : 'max-w-[640px]'">
    <span class="pill pill-outline">{{ eyebrow }}</span>
    <h2 class="text-[clamp(1.9rem,3.4vw,2.6rem)] mt-4 mb-3">{{ title }}</h2>
    <p v-if="intro" class="text-[1.12rem] text-slate">{{ intro }}</p>
  </div>
</template>
