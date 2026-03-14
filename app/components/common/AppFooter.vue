<template>
    <footer class="bg-(--footer-bg) text-(--footer-text)">
      <div class="mx-auto max-w-7xl px-4 py-10">

        <div class="mb-6">
          <div class="font-display font-extrabold text-lg text-white mb-1">
            ENETE<span class="text-primary">.</span>
          </div>
          <p class="text-sm">Vehículos — Tu próximo auto, sin vueltas.</p>
        </div>
  
        <!-- Links -->
        <nav class="flex flex-col gap-2 text-sm mb-8">
          <NuxtLink to="/vehicles" class="text-muted-foreground hover:text-white transition-colors">Ver catálogo</NuxtLink>
          <NuxtLink to="/#payment" class="text-muted-foreground hover:text-white transition-colors">Formas de pago</NuxtLink>
          <a :href="whatsappUrl" target="_blank" class="text-muted-foreground hover:text-white transition-colors">WhatsApp</a>
        </nav>
  
        <!-- Bottom -->
        <div class="pt-6 border-t border-white/10 text-xs text-stone-600">
          © {{ year }} ENETE Vehículos. Todos los derechos reservados.
        </div>
  
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  import { whatsappUrl } from '~/lib/utils';
  const year = new Date().getFullYear()
  </script>