<template>
  <div>
    <!-- HERO -->
    <section class="relative min-h-svh flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">

      <!-- Fondo decorativo -->
      <div class="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent opacity-60 blur-3xl lg:-top-40 lg:-right-40 lg:w-lg lg:h-128" />
      <div class="pointer-events-none absolute bottom-16 -left-10 w-48 h-48 rounded-full border border-border opacity-40 lg:bottom-24 lg:left-[15%] lg:w-64 lg:h-64" />

      <div class="relative max-w-lg lg:max-w-4xl mx-auto w-full">

        <!-- Tag -->
        <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground lg:text-sm lg:px-4 lg:py-1.5">
          🚗 Vehículos en consignación
        </div>

        <!-- Título -->
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-5 lg:mb-6 lg:max-w-3xl">
          Tu próximo auto,<br>
          <em class="not-italic text-primary">sin vueltas.</em>
        </h1>

        <!-- Subtítulo -->
        <p class="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-sm lg:max-w-xl">
          Encontrá el vehículo que buscás. Aceptamos permuta, efectivo y financiación. Atención directa y sin intermediarios.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 mb-12 lg:mb-16">
          <NuxtLink
            to="/vehicles"
            class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-display font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-1 sm:max-w-xs lg:px-8 lg:py-4"
          >
            Ver todos los autos
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </NuxtLink>
          <a
            :href="whatsappUrl"
            target="_blank"
            class="flex items-center justify-center rounded-xl border border-border px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent sm:flex-1 sm:max-w-xs lg:px-8 lg:py-4"
          >
            Consultar por WhatsApp
          </a>
        </div>

        <!-- Stats -->
        <div class="flex gap-8 lg:gap-16 border-t border-border pt-8 lg:pt-10">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-1">
            <span class="font-display text-2xl lg:text-3xl font-extrabold text-foreground">{{ stat.value }}</span>
            <span class="text-xs lg:text-sm text-muted-foreground">{{ stat.label }}</span>
          </div>
        </div>

      </div>
    </section>

    <!-- BUSCADOR RÁPIDO -->
    <section class="border-y border-border bg-surface px-4 py-6 md:px-12 lg:px-24">
      <div class="mx-auto max-w-2xl">
        <p class="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Buscador rápido
        </p>

        <div class="flex flex-col gap-3 max-w-2xl lg:max-w-5xl lg:flex-row lg:flex-wrap lg:items-end lg:gap-4">
          <select class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground appearance-none lg:min-w-[180px] lg:flex-1 lg:max-w-[220px]">
            <option value="">Marca del vehículo</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Volkswagen</option>
            <option>Renault</option>
            <option>Chevrolet</option>
          </select>

          <select class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground appearance-none lg:min-w-[180px] lg:flex-1 lg:max-w-[220px]">
            <option value="">Precio máximo</option>
            <option>Hasta $5.000.000</option>
            <option>Hasta $10.000.000</option>
            <option>Hasta $15.000.000</option>
            <option>Hasta $20.000.000</option>
          </select>

          <label class="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 cursor-pointer lg:min-w-[180px] lg:flex-1 lg:max-w-[220px]">
            <span class="text-sm text-muted-foreground">Acepta permuta</span>
            <input type="checkbox" v-model="acceptsTrade" class="hidden" />
            <div
              class="w-11 h-6 rounded-full transition-colors relative shrink-0"
              :class="acceptsTrade ? 'bg-primary' : 'bg-border'"
            >
              <div
                class="absolute top-1 w-4 h-4 rounded-full bg-surface transition-transform"
                :class="acceptsTrade ? 'translate-x-6' : 'translate-x-1'"
              />
            </div>
          </label>

          <button class="w-full rounded-xl bg-primary py-3 font-display font-bold text-primary-foreground transition-colors hover:bg-primary/90 lg:w-auto lg:min-w-[140px] lg:px-6">
            Buscar
          </button>
        </div>
      </div>
    </section>

    <!-- VEHÍCULOS DESTACADOS -->
    <section class="px-4 py-12 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <!-- Header -->
        <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Catálogo</p>
        <div class="mb-8 flex items-end justify-between">
          <div>
            <h2 class="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Vehículos<br>disponibles
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">Todos con estado detallado y precio transparente.</p>
          </div>
          <NuxtLink
            to="/vehicles"
            class="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </NuxtLink>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="vehicle in featuredVehicles"
            :key="vehicle.id"
            class="group rounded-xl border border-border bg-surface overflow-hidden transition-shadow hover:shadow-md"
          >
            <!-- Imagen -->
            <div class="relative h-48 bg-accent flex items-center justify-center">
              <span class="text-4xl opacity-20"><!--bg icon--></span>
              <span
                class="absolute top-3 left-3 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
                :class="{
                  'bg-green-100 text-green-700': vehicle.status === 'AVAILABLE',
                  'bg-amber-100 text-amber-700': vehicle.status === 'RESERVED',
                }"
              >
                {{ vehicle.status === 'AVAILABLE' ? 'Disponible' : 'Reservado' }}
              </span>
            </div>

            <!-- Body -->
            <div class="p-4">
              <h3 class="font-display font-bold text-foreground mb-2">
                {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
              </h3>

              <div class="flex gap-4 text-xs text-muted-foreground mb-4">
                <span>{{ vehicle.km.toLocaleString('es-AR') }} km</span>
                <span>{{ vehicle.transmission === 'MANUAL' ? 'Manual' : 'Automático' }}</span>
              </div>

              <div class="flex items-center justify-between border-t border-border pt-3">
                <span class="font-display text-lg font-extrabold text-foreground">
                  {{ formatPrice(vehicle.list_price) }}
                </span>
                <span
                  v-if="vehicle.accepts_trade"
                  class="rounded text-xs font-semibold bg-accent text-accent-foreground px-2 py-0.5"
                >
                  Acepta permuta
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ver todos mobile -->
        <NuxtLink
          to="/vehicles"
          class="mt-6 flex sm:hidden items-center justify-center gap-2 w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
        >
          Ver todos los vehículos
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>

      </div>
    </section>

    <!-- POR QUÉ ENETE -->
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

    <!-- FORMAS DE PAGO -->
    <section class="bg-accent px-4 py-12 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Formas de pago</p>
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Pagá como<br>te quede cómodo
        </h2>
        <p class="text-sm text-muted-foreground mb-8">Múltiples opciones para que no haya excusas.</p>

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

    <!-- CTA FINAL -->
    <section class="bg-primary px-4 py-16 md:px-12 lg:px-24">
      <div class="mx-auto max-w-2xl text-center">

        <h2 class="font-display text-4xl font-extrabold tracking-tight text-primary-foreground mb-3">
          ¿Encontraste<br>lo que buscabas?
        </h2>
        <p class="text-sm text-primary-foreground/70 leading-relaxed mb-8">
          Escribinos por WhatsApp y te respondemos al instante.<br>Sin formularios, sin esperas.
        </p>

        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 rounded-xl bg-foreground px-8 py-4 font-display font-bold text-white transition-opacity hover:opacity-90"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.428a.75.75 0 0 0 .915.915l5.573-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.512-5.24-1.406l-.375-.222-3.882 1.024 1.024-3.747-.244-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Hablar por WhatsApp
        </a>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const phone = config.public.whatsappPhone ?? '5491100000000'
const whatsappUrl = `https://wa.me/${phone}?text=Hola%2C%20vi%20un%20auto%20en%20ENETE%20y%20quiero%20consultar`

const stats = [
  { value: '24+', label: 'Autos disponibles' },
  { value: '100%', label: 'Atención directa' },
  { value: '10', label: 'Puntuación por clientes' },
]

useSeoMeta({
  title: 'ENETE Vehículos — Tu próximo auto, sin vueltas',
  description: 'Encontrá tu próximo vehículo en ENETE. Aceptamos permuta, efectivo y financiación. Atención directa.',
})

const acceptsTrade = ref(true)
const featuredVehicles = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2021, km: 45000, transmission: 'AUTOMATIC', list_price: 14500000, status: 'AVAILABLE', accepts_trade: true },
  { id: 2, brand: 'Ford', model: 'Ranger XLS', year: 2020, km: 72000, transmission: 'MANUAL', list_price: 18200000, status: 'RESERVED', accepts_trade: true },
  { id: 3, brand: 'Volkswagen', model: 'Polo', year: 2022, km: 28000, transmission: 'AUTOMATIC', list_price: 11800000, status: 'AVAILABLE', accepts_trade: false },
]

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

const paymentMethods = [
  { icon: '', label: 'Efectivo', sub: 'Pesos o dólares' },
  { icon: '', label: 'Transferencia', sub: 'CBU / Alias' },
  { icon: '', label: 'Permuta', sub: 'Tu auto como pago' },
  { icon: '', label: 'Financiado', sub: 'Cuotas accesibles' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
}
</script>