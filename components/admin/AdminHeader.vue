<script setup>
defineProps({ title: String, subtitle: String })
</script>

<template>
  <div class="flex items-start justify-between gap-4 mb-6">
    <div>
      <h1 class="text-[1.5rem]">{{ title }}</h1>
      <p v-if="subtitle" class="text-slate mt-0.5 text-[.95rem]">{{ subtitle }}</p>
    </div>
    <div class="shrink-0"><slot name="action" /></div>
  </div>
</template>
