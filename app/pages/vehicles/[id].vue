<template>
  <div class="min-h-screen bg-background">

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="animate-pulse flex flex-col gap-4 w-full max-w-6xl mx-auto px-4 pt-24">
        <div class="h-72 bg-accent rounded-xl w-full" />
        <div class="h-6 bg-accent rounded w-1/2" />
        <div class="h-4 bg-accent rounded w-1/3" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen gap-4">
      <p class="text-muted-foreground">{{ error }}</p>
      <Button variant="outline" as-child>
        <NuxtLink to="/vehicles">Volver al catálogo</NuxtLink>
      </Button>
    </div>

    <template v-else-if="vehicle">

      <!-- Hero con imagen full width -->
      <div class="relative h-[50svh] md:h-[60svh] bg-foreground overflow-hidden">
        <img
          v-if="vehicle.images?.[0]"
          :src="vehicle.images[selectedImage]"
          :alt="`${vehicle.brand} ${vehicle.model}`"
          class="w-full h-full object-cover opacity-80"
        />
        <div v-else class="w-full h-full bg-foreground" />

        <!-- Gradiente inferior -->
        <div class="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />

        <!-- Botón volver -->
        <NuxtLink
          to="/vehicles"
          class="absolute top-20 left-4 md:left-12 flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Volver al catálogo
        </NuxtLink>

        <!-- Info sobre imagen -->
        <div class="absolute bottom-6 left-4 md:left-12 right-4 md:right-12">
          <div class="flex items-end justify-between">
            <div>
              <Badge
                class="mb-3"
                :class="{
                  'bg-status-available text-(--status-available-text)': vehicle.status === 'AVAILABLE',
                  'bg-status-reserved text-(--status-reserved-text)': vehicle.status === 'RESERVED',
                  'bg-status-sold text-(--status-sold-text)': vehicle.status === 'SOLD',
                }"
              >
                {{ statusLabel(vehicle.status) }}
              </Badge>
              <h1 class="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {{ vehicle.brand }} {{ vehicle.model }}
              </h1>
              <p class="text-white/60 text-sm mt-1">{{ vehicle.year }} · {{ vehicle.plate.toUpperCase() }}</p>
            </div>
            <p class="font-display text-3xl md:text-4xl font-extrabold text-primary hidden md:block">
              {{ formatPrice(vehicle.list_price) }}
            </p>
          </div>
        </div>

        <!-- Miniaturas -->
        <div v-if="vehicle.images?.length > 1" class="absolute bottom-6 right-4 md:right-12 flex gap-2">
          <button
            v-for="(img, i) in vehicle.images"
            :key="i"
            @click="selectedImage = i"
            class="w-14 h-10 rounded-lg overflow-hidden border-2 transition-all"
            :class="selectedImage === i ? 'border-primary scale-105' : 'border-white/30'"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Contenido -->
      <div class="mx-auto max-w-6xl px-4 py-10 md:px-12 lg:px-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Columna principal -->
          <div class="lg:col-span-2 flex flex-col gap-6">

            <!-- Precio mobile -->
            <p class="font-display text-3xl font-extrabold text-foreground md:hidden">
              {{ formatPrice(vehicle.list_price) }}
            </p>

            <!-- Ficha técnica -->
            <div>
              <h2 class="font-display font-bold text-foreground text-lg mb-4">Ficha técnica</h2>
              <div class="grid grid-cols-2 divide-x-0 gap-px bg-border rounded-xl overflow-hidden">
                <div
                  v-for="spec in specs"
                  :key="spec.label"
                  class="bg-surface flex flex-col gap-1 px-5 py-4"
                >
                  <span class="text-xs text-muted-foreground uppercase tracking-widest">{{ spec.label }}</span>
                  <span class="text-sm font-semibold text-foreground">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div>
              <h2 class="font-display font-bold text-foreground text-lg mb-2">Descripción</h2>
              <p class="text-sm text-foreground/80 whitespace-pre-line">
                {{ vehicle.description || 'No indicado' }}
              </p>
            </div>

            <!-- Condiciones de permuta -->
            <div>
              <h2 class="font-display font-bold text-foreground text-lg mb-2">Condiciones de permuta</h2>
              <p class="text-sm text-foreground/80 whitespace-pre-line">
                {{ vehicle.trade_conditions || 'No indicado' }}
              </p>
            </div>

            <!-- Formas de pago -->
            <div>
              <h2 class="font-display font-bold text-foreground text-lg mb-4">Formas de pago</h2>
              <div class="flex flex-wrap gap-2">
                <Badge variant="outline" class="border-(--status-available) text-(--status-available-text) px-3 py-1">
                  Efectivo
                </Badge>
                <Badge variant="outline" class="border-(--status-available) text-(--status-available-text) px-3 py-1">
                  Transferencia
                </Badge>
                <Badge
                  variant="outline"
                  class="px-3 py-1"
                  :class="vehicle.accepts_trade
                    ? 'border-(--status-available) text-(--status-available-text)'
                    : 'border-(--status-reserved) text-(--status-reserved-text)'"
                >
                  {{ vehicle.accepts_trade ? 'Acepta permuta' : 'No acepta permuta' }}
                </Badge>
              </div>
            </div>

          </div>

          <!-- Columna lateral -->
          <div class="flex flex-col gap-3">
            <Card>
              <CardContent class="p-5 flex flex-col gap-4">

                <div class="hidden md:block">
                  <p class="text-xs text-muted-foreground uppercase tracking-widest mb-1">Precio de venta</p>
                  <p class="font-display text-3xl font-extrabold text-foreground">
                    {{ formatPrice(vehicle.list_price) }}
                  </p>
                </div>

                <div class="h-px bg-border hidden md:block" />

                <Button class="w-full font-display font-bold" size="lg" as-child>
                  <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer">
                    Consultar por WhatsApp
                  </a>
                </Button>

                <Button variant="outline" class="w-full" as-child>
                  <NuxtLink to="/vehicles">Ver más vehículos</NuxtLink>
                </Button>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { currentVehicle: vehicle, isLoading, error, fetchOne } = useVehicles()
import { useWhatsapp } from '#imports'

const {buildUrl} = useWhatsapp();

const whatsappUrl = computed(() => {
  if (!vehicle.value) return '#'
  return buildUrl(
    `Hola, quisiera tener más información sobre ${vehicle.value.brand} ${vehicle.value.model} ${vehicle.value.year} catalogado en el sitio web. Patente: ${vehicle.value.plate.toUpperCase()}`
  )
})

const selectedImage = ref(0)

onMounted(() => fetchOne(route.params.id as string))

const specs = computed(() => [
  { label: 'Año', value: vehicle.value?.year ?? 'No indicado' },
  {
    label: 'Kilometraje',
    value: vehicle.value?.km != null ? `${vehicle.value.km.toLocaleString('es-AR')} km` : 'No indicado',
  },
  { label: 'Transmisión', value: vehicle.value?.transmission ?? 'No indicado' },
  { label: 'Condición', value: vehicle.value?.condition ?? 'No indicado' },
  { label: 'Combustible', value: vehicle.value?.fuel ?? 'No indicado' },
  { label: 'Estado', value: vehicle.value?.status ? statusLabel(vehicle.value.status) : 'No indicado' },
])

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservado',
    SOLD: 'Vendido',
  }
  return labels[status] ?? status
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price)
}

useSeoMeta({
  title: computed(() => vehicle.value
    ? `${vehicle.value.brand} ${vehicle.value.model} ${vehicle.value.year} — ENETE Vehículos`
    : 'ENETE Vehículos'
  ),
  description: computed(() => vehicle.value
    ? `${vehicle.value.brand} ${vehicle.value.model} ${vehicle.value.year} con ${vehicle.value.km.toLocaleString('es-AR')} km.`
    : ''
  ),
})
</script>