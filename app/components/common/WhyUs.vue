<script setup lang="ts">
    const whyItems = [
        {
            icon: 'vehicle',
            title: 'Estado real del vehículo',
            description: 'Cada auto tiene su ficha completa con estado detallado y fotos reales.',
        },
        {
            icon: 'swap',
            title: 'Permuta + diferencia',
            description: 'Usá tu auto actual como parte de pago. Calculamos la diferencia sin vueltas.',
        },
        {
            icon: 'support',
            title: 'Atención directa',
            description: 'Hablás directo con quien sabe. Sin vendedores intermediarios.',
        },
    ]
</script>

<template>
  <section class="bg-foreground px-4 py-12 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">¿Por qué ENETE?</p>
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
          Lo que nos<br>diferencia
        </h2>
        <p class="text-sm text-(--footer-text) mb-8">Sin rodeos. Sin sorpresas.</p>

        <div class="flex flex-col gap-4 md:grid md:grid-cols-3">
          <div
            v-for="item in whyItems"
            :key="item.title"
            class="flex gap-4 items-start rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <!-- Estado real del vehículo -->
              <svg v-if="item.icon === 'vehicle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <!-- Permuta + diferencia -->
              <svg v-else-if="item.icon === 'swap'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
              <!-- Atención directa -->
              <svg v-else-if="item.icon === 'support'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-display font-bold text-white text-sm mb-1">{{ item.title }}</h3>
              <p class="text-xs text-(--footer-text) leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
</template>