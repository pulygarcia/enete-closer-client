<script setup lang="ts">
    const whyItems = [
        {
            icon: '',
            title: 'Estado real del vehículo',
            description: 'Cada auto tiene su ficha completa con estado detallado y fotos reales.',
        },
        {
            icon: '',
            title: 'Permuta + diferencia',
            description: 'Usá tu auto actual como parte de pago. Calculamos la diferencia sin vueltas.',
        },
        {
            icon: '',
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
        <p class="text-sm text---footer-text) mb-8">Sin rodeos. Sin sorpresas.</p>

        <div class="flex flex-col gap-4 md:grid md:grid-cols-3">
          <div
            v-for="item in whyItems"
            :key="item.title"
            class="flex gap-4 items-start rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-lg">
              {{ item.icon }}
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