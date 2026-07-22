<script setup>
definePageMeta({ layout: 'admin' })
const fields = [
  { key: 'empresa', label: 'Empresa' }, { key: 'ruc', label: 'RUC' },
  { key: 'correo', label: 'Correo' }, { key: 'telefono', label: 'Teléfono' },
  { key: 'departamento', label: 'Departamento' }, { key: 'provincia', label: 'Provincia' }, { key: 'distrito', label: 'Distrito' }
]
</script>

<template>
  <AdminLeadInbox collection="advisorRequests" title="Solicitudes de asesor" subtitle="Leads calificados (Contacta un asesor)." :fields="fields" />
</template>
