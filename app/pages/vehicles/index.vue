<template>
  <section class="min-h-screen bg-background">

    <!-- Header -->
    <div class="border-b border-border bg-surface px-4 py-10 pt-24 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">
        <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Catálogo</p>
        <h1 class="font-display text-4xl font-extrabold tracking-tight text-foreground mb-2">
          Vehículos disponibles
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ filteredVehicles.length }} vehículos encontrados
        </p>
      </div>
    </div>

    <!-- Filtros sticky -->
    <div class="sticky top-16 z-40 border-b border-border bg-surface/90 backdrop-blur px-4 py-4 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl flex flex-col sm:flex-row gap-3">

        <Select v-model="selectedBrand">
          <SelectTrigger class="w-full sm:w-48">
            <SelectValue placeholder="Marca" />
          </SelectTrigger>
          <SelectContent class="bg-white">
            <SelectItem value="all">Todas las marcas</SelectItem>
            <SelectItem v-for="brand in brands" :key="brand" :value="brand">
              {{ brand }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedMaxPrice">
          <SelectTrigger class="w-full sm:w-52">
            <SelectValue placeholder="Precio máximo" />
          </SelectTrigger>
          <SelectContent class="bg-white">
            <SelectItem value="all">Cualquier precio</SelectItem>
            <SelectItem
              v-for="price in priceRanges"
              :key="price"
              :value="String(price)"
            >
              Hasta {{ formatPrice(price) }}
            </SelectItem>
          </SelectContent>
        </Select>

        <span class="text-sm text-muted-foreground">Acepta permuta</span>
         <button 
            type="button"
            role="switch"
            :aria-checked="acceptsTrade"
            @click="acceptsTrade = !acceptsTrade"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
            :class="acceptsTrade ? 'bg-primary' : 'bg-input'"
        >
            <span
            class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm transition-transform"
            :class="acceptsTrade ? 'translate-x-5' : 'translate-x-0'"
            />
        </button>

        <Button variant="outline" class="sm:ml-auto" @click="clearFilters">
          Limpiar filtros
        </Button>

      </div>
    </div>

    <!-- Contenido -->
    <div class="px-4 py-8 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <!-- Skeleton -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="rounded-xl border border-border bg-surface overflow-hidden animate-pulse"
          >
            <div class="h-48 bg-accent" />
            <div class="p-4 flex flex-col gap-3">
              <div class="h-4 bg-accent rounded w-3/4" />
              <div class="h-3 bg-accent rounded w-1/2" />
              <div class="h-6 bg-accent rounded w-1/3 mt-2" />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4">
          <p class="text-muted-foreground text-sm">{{ error }}</p>
          <Button variant="outline" @click="loadAll">Reintentar</Button>
        </div>

        <!-- Vacío -->
        <div v-else-if="filteredVehicles.length === 0" class="flex flex-col items-center justify-center py-24 gap-4">
          <p class="font-display font-bold text-foreground">Sin resultados</p>
          <p class="text-sm text-muted-foreground">Probá con otros filtros</p>
          <Button variant="outline" @click="clearFilters">Limpiar filtros</Button>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            :to="`/vehicles/${vehicle.id}`"
            class="group"
            >
            <Card class="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">

                <div class="relative h-56 bg-accent overflow-hidden">
                <img
                    v-if="vehicle.images?.[0]"
                    :src="vehicle.images[0]"
                    :alt="`${vehicle.brand} ${vehicle.model}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div v-else class="w-full h-full bg-accent" />

                <!-- Overlay sutil al hover -->
                <div class="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200" />

                <!-- Badge estado arriba izquierda -->
                <Badge
                    class="absolute top-3 left-3"
                    :class="{
                    'bg-status-available text-(--status-available-text)': vehicle.status === 'AVAILABLE',
                    'bg-status-reserved text-(--status-reserved-text)': vehicle.status === 'RESERVED',
                    }"
                >
                    {{ statusLabel(vehicle.status) }}
                </Badge>

                <!-- Precio sobre la imagen abajo -->
                <div class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-foreground/60 to-transparent">
                    <span class="font-display text-xl font-extrabold text-white">
                    {{ formatPrice(vehicle.list_price) }}
                    </span>
                </div>
                </div>

                <!-- Info mínima -->
                <CardContent class="p-4 flex items-center justify-between">
                <div>
                    <h3 class="font-display font-bold text-foreground leading-tight">
                    {{ vehicle.brand }} {{ vehicle.model }}
                    </h3>
                    <p class="text-xs text-muted-foreground mt-0.5">
                    {{ vehicle.year }} · {{ vehicle.km.toLocaleString('es-AR') }} km
                    </p>
                </div>
                <svg class="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                </CardContent>

            </Card>
            </NuxtLink>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const { vehicles, isLoading, error, loadAll } = useVehicles()
import { formatPrice } from '~/lib/utils'

const selectedBrand = ref('all')
const selectedMaxPrice = ref('all')
const acceptsTrade = ref(false)

onMounted(() => loadAll())

const brands = computed(() =>
  [...new Set((vehicles.value ?? []).map(v => v.brand))]
)

const priceRanges = computed(() => {
  const max = Math.max(...(vehicles.value ?? []).map(v => v.list_price))
  const step = 5000000
  const ranges = []
  for (let price = step; price <= max + step; price += step) {
    ranges.push(price)
  }
  return ranges
})

const filteredVehicles = computed(() => {
  let result = vehicles.value ?? []
  if (selectedBrand.value !== 'all') {
    result = result.filter(v => v.brand === selectedBrand.value)
  }
  if (selectedMaxPrice.value !== 'all') {
    result = result.filter(v => v.list_price <= Number(selectedMaxPrice.value))
  }
  if (acceptsTrade.value) {
    result = result.filter(v => v.accepts_trade)
  }
  return result
})

function clearFilters() {
  selectedBrand.value = 'all'
  selectedMaxPrice.value = 'all'
  acceptsTrade.value = false
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservado',
    SOLD: 'Vendido',
  }
  return labels[status] ?? status
}

useSeoMeta({
  title: 'Catálogo — ENETE Vehículos',
  description: 'Explorá todos los vehículos disponibles en ENETE. Filtrá por marca, precio y permuta.',
})
</script>