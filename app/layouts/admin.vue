<template>
    <SidebarProvider>
      <div class="flex min-h-screen w-full bg-background">
  
        <!-- Sidebar -->
        <Sidebar>
          <SidebarHeader class="px-4 py-4 border-b border-primary/50">
            <NuxtLink to="/" class="font-display font-extrabold text-xl tracking-tight">
              ENETE<span class="text-primary">.</span>
            </NuxtLink>
            <p class="text-xs text-sidebar-foreground/50 mt-0.5">Panel de administración</p>
          </SidebarHeader>
  
          <SidebarContent class="px-2 py-4">
  
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in mainNav" :key="item.to">
                    <SidebarMenuButton
                      as-child
                      :is-active="route.path === item.to"
                    >
                      <NuxtLink :to="item.to" class="flex items-center gap-3">
                        <component :is="item.icon" class="w-4 h-4" />
                        {{ item.label }}
                      </NuxtLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
  
            <SidebarGroup>
              <SidebarGroupLabel>Gestión</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in managementNav" :key="item.to">
                    <SidebarMenuButton
                      as-child
                      :is-active="route.path.startsWith(item.to)"
                    >   
                      <NuxtLink :to="item.to" class="flex items-center gap-3">
                        <component :is="item.icon" class="w-4 h-4" />
                        {{ item.label }}
                      </NuxtLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
  
          </SidebarContent>
  
          <SidebarFooter class="px-2 py-4 border-t border-primary/50">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button class="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                  <Avatar class="w-8 h-8">
                    <AvatarFallback class="bg-primary text-primary-foreground text-xs font-bold">
                      {{ userInitials }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col text-left flex-1 min-w-0">
                    <span class="text-sm font-medium text-sidebar-foreground truncate">{{ user?.name }}</span>
                    <span class="text-xs text-sidebar-foreground/50 truncate">{{ user?.email }}</span>
                  </div>
                  <svg class="w-4 h-4 text-sidebar-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-48">
                <DropdownMenuItem @click="logout" class="text-destructive cursor-pointer">
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
  
        </Sidebar>
  
        <!-- Contenido principal -->
        <SidebarInset class="flex flex-col flex-1 min-w-0">
  
          <!-- Header -->
          <header class="flex items-center gap-4 px-6 h-16 border-b border-border sticky top-0 bg-background z-10">
            <SidebarTrigger />
            <Separator orientation="vertical" class="h-4" />
            <h1 class="font-display font-bold text-foreground text-sm">
              {{ currentPageTitle }}
            </h1>
          </header>
  
          <!-- Página -->
          <main class="flex-1 p-6">
            <slot />
          </main>
  
        </SidebarInset>
  
      </div>
    </SidebarProvider>
  </template>
  
  <script setup lang="ts">
  import {
    LayoutDashboard,
    Car,
    Users,
    FileText,
    ShoppingBag,
  } from 'lucide-vue-next'
  
  const route = useRoute()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  
  const mainNav = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  ]
  
  const managementNav = [
    { to: '/admin/vehicles', label: 'Vehículos', icon: Car },
    { to: '/admin/owners', label: 'Consignantes', icon: Users },
    { to: '/admin/consignments', label: 'Consignaciones', icon: FileText },
    { to: '/admin/sales', label: 'Ventas', icon: ShoppingBag },
  ]
  
  const allNav = [...mainNav, ...managementNav]
  
  const currentPageTitle = computed(() => {
    const current = allNav.find(item =>
      item.to === '/admin'
        ? route.path === '/admin'
        : route.path.startsWith(item.to)
    )
    return current?.label ?? 'Admin'
  })
  
  const userInitials = computed(() => {
    if (!user.value?.name) return 'A'
    return user.value.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  })
  
  async function logout() {
    await authStore.logout()
  }
  </script>