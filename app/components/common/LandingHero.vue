<script setup lang="ts">
    import Stats from '~/components/common/Stats.vue'
    import AnimatedCar from '~/components/common/AnimatedCar.vue'

    import { whatsappUrl } from '~/lib/utils';
</script>

<template>
  <section class="landing-hero relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
    <!-- BG grilla -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.9]">
      <div class="absolute inset-0 landing-hero__grid" />
      <div class="absolute -top-28 -right-24 h-112 w-md rounded-full bg-accent/60 blur-3xl" />
      <div class="absolute -bottom-32 left-[10%] h-88 w-88 rounded-full bg-primary/20 blur-3xl" />
      <div class="absolute top-16 left-6 h-20 w-20 rounded-full border border-border/60" />
      <div class="absolute bottom-20 right-[12%] h-40 w-40 rounded-full border border-border/40" />
    </div>

    <div class="relative mx-auto max-w-6xl">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <div class="mb-6 inline-flex items-center gap-3 rounded-full border border-border/70 bg-surface/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground backdrop-blur">
            <span class="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(0,0,0,0.06)]" />
            Vehículos en consignación
          </div>

          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight text-foreground">
            Tu próximo auto,
            <span class="block">
              <span class="landing-hero__title-accent">sin vueltas</span><span class="text-primary">.</span>
            </span>
          </h1>

          <p class="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Encontrá el vehículo que buscás. Aceptamos permuta, efectivo y financiación. Atención directa y sin intermediarios.
          </p>

          <div class="mt-7 flex flex-wrap gap-2">
            <Badge variant="outline">Permuta</Badge>
            <Badge variant="outline">Financiación</Badge>
            <Badge variant="outline">Atención directa</Badge>
          </div>

          <!-- CTAs -->
          <div class="mt-10 flex flex-col sm:flex-row gap-3">
            <Button size="lg" class="font-display font-bold" as-child>
              <NuxtLink to="/vehicles" class="group">
                Ver todos los autos
                <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <a :href="whatsappUrl" target="_blank" rel="noreferrer">
                Consultar por WhatsApp
              </a>
            </Button>
          </div>

          <div class="mt-12">
            <Stats />
          </div>
        </div>

        <!-- card -->
        <div class="relative hidden md:block">
          <div class="landing-hero__panel relative overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur">
            <div class="absolute inset-0 landing-hero__panel-bg" />

            <div class="relative p-6 sm:p-7">
              <div class="flex items-start justify-between gap-6">
                <div>
                  <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Compra con claridad
                  </p>
                  <p class="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                    Publicaciones reales,<br class="hidden sm:block" />
                    respuesta rápida.
                  </p>
                </div>

                <div class="shrink-0 rounded-xl border border-border bg-surface/80 px-3 py-2">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                  <p class="mt-0.5 text-sm font-semibold text-foreground">Disponible</p>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <div class="rounded-xl border border-border bg-surface/80 px-3 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Permuta</p>
                  <p class="mt-1 text-sm font-semibold text-foreground">Sí</p>
                </div>
                <div class="rounded-xl border border-border bg-surface/80 px-3 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Financia</p>
                  <p class="mt-1 text-sm font-semibold text-foreground">Opcional</p>
                </div>
                <div class="rounded-xl border border-border bg-surface/80 px-3 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stock</p>
                  <p class="mt-1 text-sm font-semibold text-foreground">Actualizado</p>
                </div>
              </div>

              <div class="mt-7">
                <div class="relative rounded-xl border border-border bg-accent/30 overflow-hidden">
                  <div class="w-full overflow-hidden">
                    <div class="car-scene relative w-[380px] h-[380px] mx-auto">
                      <AnimatedCar />
                    </div>
                  </div>
                  <div class="px-5 pb-5 flex items-center justify-between gap-4">
                    <p class="text-sm font-medium text-muted-foreground">
                      Explorá y compará en segundos.
                    </p>
                    <NuxtLink to="/vehicles" class="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      Ver catálogo
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pointer-events-none absolute -inset-x-10 -bottom-10 h-24 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
}

.landing-hero__grid {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(closest-side at 55% 30%, rgba(0,0,0,0.95), rgba(0,0,0,0.35) 55%, transparent 80%);
}

.landing-hero__title-accent {
  color: var(--primary);
  display: inline-block;
  position: relative;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.10);
}

.landing-hero__title-accent::after {
  content: "";
  position: absolute;
  left: -0.08em;
  right: -0.10em;
  bottom: 0.08em;
  height: 0.33em;
  background: currentColor;
  opacity: 0.16;
  border-radius: 999px;
  filter: blur(0.2px);
  z-index: -1;
}

.car-scene {
  transform-origin: top center;
}

@media (max-width: 480px) {
  .car-scene {
    transform: scale(0.7);
    margin-bottom: -114px; /* 380 * 0.30 */
  }
}

@media (min-width: 481px) and (max-width: 640px) {
  .car-scene {
    transform: scale(0.85);
    margin-bottom: -57px; /* 380 * 0.15 */
  }
}

.landing-hero__panel-bg {
  background:
    radial-gradient(900px 360px at 15% 0%, rgba(0,0,0,0.08), transparent 60%),
    radial-gradient(760px 320px at 100% 20%, rgba(0,0,0,0.06), transparent 55%);
}

</style>