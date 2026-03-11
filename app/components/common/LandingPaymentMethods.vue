<script setup lang="ts">
    const paymentMethods = [
        { icon: '', label: 'Efectivo', sub: 'Pesos o dólares' },
        { icon: '', label: 'Transferencia', sub: 'CBU / Alias' },
        { icon: '', label: 'Permuta', sub: 'Tu auto como pago' },
        { icon: '', label: 'Financiado', sub: 'Cuotas accesibles' },
    ]
</script>

<template>
  <section class="bg-accent px-4 py-12 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Formas de pago</p>
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Pagá como<br>te quede cómodo
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="method in paymentMethods"
            :key="method.label"
            class="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-5 text-center"
          >
            <span class="text-2xl">{{ method.icon }}</span>
            <span class="font-display text-sm font-bold text-foreground">{{ method.label }}</span>
            <span class="text-xs text-muted-foreground">{{ method.sub }}</span>
          </div>
        </div>

      </div>
    </section>
</template>