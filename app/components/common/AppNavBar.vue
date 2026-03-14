<template>
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
  
        <!-- Logo -->
        <NuxtLink to="/" class="font-display font-extrabold text-xl tracking-tight text-foreground">
          ENETE<span class="text-primary">.</span>
        </NuxtLink>
  
        <!-- Acciones -->
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/vehicles"
            class="hidden sm:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent"
          >
            Ver autos
          </NuxtLink>
  
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-90"
          >
            <WhatsappIcon class="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
  
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import WhatsappIcon from './WhatsappIcon.vue';
  import { whatsappUrl } from '~/lib/utils';
  </script>
