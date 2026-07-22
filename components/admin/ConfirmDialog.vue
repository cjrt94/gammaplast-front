<script setup>
// Diálogo de confirmación global (montado en el layout admin). Sin confirm() nativo.
const { state, answer } = useConfirm()
</script>

<template>
  <Teleport to="body">
    <div v-if="state.show" class="fixed inset-0 z-[100] grid place-items-center bg-ink/50 px-5" @keydown.esc="answer(false)">
      <div class="card p-6 w-full max-w-[400px]" role="alertdialog" aria-modal="true" :aria-label="state.title">
        <h2 class="text-[1.15rem] mb-2">{{ state.title }}</h2>
        <p v-if="state.message" class="text-slate text-[.92rem] mb-5">{{ state.message }}</p>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn btn-ghost py-2 px-4 text-[.9rem]" @click="answer(false)">Cancelar</button>
          <button type="button" class="btn py-2 px-4 text-[.9rem] bg-red-600 text-white hover:bg-red-700" @click="answer(true)">{{ state.confirmLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
