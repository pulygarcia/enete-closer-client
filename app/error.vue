<template>
    <div class="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center overflow-hidden">
  
      <!-- Círculos decorativos animados -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent opacity-60 animate-pulse" />
        <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent opacity-40 animate-pulse delay-700" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border opacity-20 animate-spin" style="animation-duration: 20s;" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-border opacity-20 animate-spin" style="animation-duration: 15s; animation-direction: reverse;" />
      </div>
  
      <!-- Contenido -->
      <div class="relative flex flex-col items-center">
        <div class="relative w-[380px] h-[380px] mx-auto mb-4">
          <AnimatedCar />
        </div>
  
        <!-- 404 -->
        <div class="font-display text-8xl md:text-9xl font-extrabold text-foreground leading-none mb-2 tracking-tighter">
          4<span class="text-primary">0</span>4
        </div>
  
        <p class="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Página no encontrada
        </p>
  
        <h1 class="font-display text-xl md:text-2xl font-extrabold text-foreground mb-3">
          Este auto se perdió en el camino
        </h1>
  
        <p class="text-sm text-muted-foreground max-w-sm leading-relaxed mb-10">
          Puede que el vehículo ya fue vendido o que el enlace no sea correcto. Pero hay muchos más esperándote en el catálogo.
        </p>
  
        <!-- Acciones -->
        <div class="flex flex-col sm:flex-row sm:justify-center gap-3 w-full max-w-xs sm:max-w-md mx-auto">
          <Button class="w-full font-display font-bold" as-child>
            <NuxtLink to="/vehicles">Ver vehículos</NuxtLink>
          </Button>
          <Button variant="outline" class="w-full" as-child>
            <NuxtLink to="/">Ir al inicio</NuxtLink>
          </Button>
        </div>
  
        <!-- WhatsApp -->
        <p class="mt-10 text-xs text-muted-foreground">
          ¿Necesitás ayuda?
          <a :href="whatsappUrl" target="_blank" class="text-primary font-medium hover:underline">
            Escribinos por WhatsApp
          </a>
        </p>
  
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
    import AnimatedCar from './components/common/AnimatedCar.vue';
import { whatsappUrl } from './lib/utils';
  
  definePageMeta({ layout: 'default' })
  
  useSeoMeta({
    title: '404 — Página no encontrada | ENETE Vehículos',
  })
  </script>