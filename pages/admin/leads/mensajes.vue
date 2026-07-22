<script setup>
definePageMeta({ layout: 'admin' })
const fields = [
  { key: 'correo', label: 'Correo' }, { key: 'telefono', label: 'Teléfono' }, { key: 'empresa', label: 'Empresa' }
]
</script>

<template>
  <AdminLeadInbox collection="contactMessages" title="Mensajes de contacto" subtitle="Formulario de contacto general." :fields="fields" />
</template>
