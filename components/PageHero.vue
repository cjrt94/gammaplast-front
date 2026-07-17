<script setup>
defineProps({
  eyebrow: String,
  title: String,
  intro: String
})
</script>

<template>
  <section class="sec-mist border-b border-line">
    <div class="wrap py-16">
      <div class="max-w-[820px]">
        <span class="pill pill-outline reveal">{{ eyebrow }}</span>
        <h1 class="text-[clamp(2.2rem,4.6vw,3.4rem)] mt-4 mb-4 reveal">{{ title }}</h1>
        <p v-if="intro" class="text-[1.15rem] text-slate reveal">{{ intro }}</p>
        <slot />
      </div>
    </div>
  </section>
</template>
