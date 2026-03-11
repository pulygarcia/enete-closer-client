<script setup lang="ts">
    import Stats from '~/components/common/Stats.vue'

    import { whatsappUrl } from '~/lib/utils';
</script>

<template>
  <section class="relative min-h-svh flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">

      <!-- Fondo decorativo -->
      <div class="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent opacity-60 blur-3xl lg:-top-40 lg:-right-40 lg:w-lg lg:h-128" />
      <div class="pointer-events-none absolute bottom-16 -left-10 w-48 h-48 rounded-full border border-border opacity-40 lg:bottom-24 lg:left-[15%] lg:w-64 lg:h-64" />

      <div class="relative max-w-lg lg:max-w-4xl mx-auto w-full">

        <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground lg:text-sm lg:px-4 lg:py-1.5">
          Vehículos en consignación
        </div>

        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-5 lg:mb-6 lg:max-w-3xl">
          Tu próximo auto,<br>
          <em class="not-italic text-primary">sin vueltas.</em>
        </h1>

        <p class="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-sm lg:max-w-xl">
          Encontrá el vehículo que buscás. Aceptamos permuta, efectivo y financiación. Atención directa y sin intermediarios.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 mb-12">
        <Button size="lg" class="font-display font-bold" as-child>
          <NuxtLink to="/vehicles">
            Ver todos los autos
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </NuxtLink>
        </Button>
        <Button size="lg" variant="outline" as-child>
          <a :href="whatsappUrl" target="_blank">
            Consultar por WhatsApp
          </a>
        </Button>
      </div>

      <Stats />

      </div>
    </section>
</template>