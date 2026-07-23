<script setup>
// Layout del back office: sidebar de navegación + barra superior con usuario y salir.
// Nada de AppHeader/Footer públicos ni reveal/GSAP.
const { user, logout } = useAdminAuth()
const localePath = useLocalePath()
const route = useRoute()

const nav = [
  { group: 'Contenido', items: [
    { label: 'Home', to: '/admin/home' },
    { label: 'Nosotros', to: '/admin/nosotros' },
    { label: 'Sectores', to: '/admin/sectores' },
    { label: 'Productos', to: '/admin/productos' },
    { label: 'Materiales', to: '/admin/materiales' },
    { label: 'Novedades', to: '/admin/novedades' },
    { label: 'Certificaciones', to: '/admin/certificaciones' },
    { label: 'Logos de clientes', to: '/admin/logos-clientes' },
    { label: 'Logos de certificación', to: '/admin/logos-certificacion' },
    { label: 'Contacto y datos', to: '/admin/contacto' },
    { label: 'Páginas', to: '/admin/paginas' },
    { label: 'SEO y FAQ', to: '/admin/seo' },
    { label: 'Ajustes del sitio', to: '/admin/ajustes' }
  ] },
  { group: 'Bandeja', items: [
    { label: 'Mensajes de contacto', to: '/admin/leads/mensajes' },
    { label: 'Solicitudes de asesor', to: '/admin/leads/asesores' },
    { label: 'Postulaciones', to: '/admin/leads/postulaciones' }
  ] }
]

const isActive = (to) => {
  const t = localePath(to)
  return route.path === t || route.path.startsWith(t + '/')
}
const onLogout = async () => { await logout(); navigateTo(localePath('/admin/login')) }
</script>

<template>
  <div class="min-h-screen flex bg-mist text-ink">
    <!-- Sidebar -->
    <aside class="w-64 shrink-0 bg-ink text-white/90 flex flex-col sticky top-0 h-screen">
      <NuxtLink :to="localePath('/admin')" class="flex items-center gap-2 px-5 h-16 border-b border-white/10 font-display font-bold text-white">
        Gamma Plast <span class="pill pill-green text-[.66rem] py-0.5 px-2">admin</span>
      </NuxtLink>
      <nav class="flex-1 overflow-y-auto py-4">
        <div v-for="g in nav" :key="g.group" class="mb-5">
          <p class="px-5 mb-1.5 text-[.66rem] font-display font-bold uppercase tracking-[.16em] text-white/40">{{ g.group }}</p>
          <NuxtLink v-for="it in g.items" :key="it.to" :to="localePath(it.to)"
            class="block px-5 py-2 text-[.92rem] transition-colors"
            :class="isActive(it.to) ? 'bg-green-700 text-white font-semibold' : 'text-white/75 hover:bg-white/5 hover:text-white'">
            {{ it.label }}
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <!-- Columna principal -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 shrink-0 bg-paper border-b border-line flex items-center justify-between px-7">
        <span class="font-display font-bold text-[1.05rem]">Back office</span>
        <div class="flex items-center gap-4">
          <span class="text-[.85rem] text-slate">{{ user?.email }}</span>
          <button type="button" class="btn btn-ghost text-[.85rem] py-2 px-4" @click="onLogout">Cerrar sesión</button>
        </div>
      </header>
      <main class="flex-1 p-7 overflow-y-auto">
        <slot />
      </main>
    </div>

    <!-- Confirmación global (sin confirm() nativo). -->
    <AdminConfirmDialog />
  </div>
</template>
