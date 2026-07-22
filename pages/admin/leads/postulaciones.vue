<script setup>
definePageMeta({ layout: 'admin' })
const fields = [
  { key: 'correo', label: 'Correo' }, { key: 'telefono', label: 'Teléfono' }, { key: 'cvFilename', label: 'CV' }
]
</script>

<template>
  <AdminLeadInbox collection="jobApplications" title="Postulaciones" subtitle="Trabaja con nosotros. El CV se descarga con un enlace temporal." :fields="fields" has-cv />
</template>
