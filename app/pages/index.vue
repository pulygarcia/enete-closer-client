<script setup lang="ts">
//common components
import LandingHero from '~/components/common/LandingHero.vue'
import LandingCTA from '~/components/common/LandingCTA.vue'
import LandingPaymentMethods from '~/components/common/LandingPaymentMethods.vue'
import WhyUs from '~/components/common/WhyUs.vue'
import HighlightedVehiclesHeader from '~/components/common/HighlightedVehiclesHeader.vue'
//shadcn components
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'

import { formatPrice } from '~/lib/utils'


useSeoMeta({
  title: 'ENETE Vehículos — Tu próximo vehículo, sin vueltas',
  description: 'Encontrá tu próximo vehículo',
})

const acceptsTrade = ref(true)
const featuredVehicles = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2021, km: 45000, transmission: 'AUTOMATIC', list_price: 14500000, status: 'AVAILABLE', accepts_trade: true },
  { id: 2, brand: 'Ford', model: 'Ranger XLS', year: 2020, km: 72000, transmission: 'MANUAL', list_price: 18200000, status: 'RESERVED', accepts_trade: true },
  { id: 3, brand: 'Volkswagen', model: 'Polo', year: 2022, km: 28000, transmission: 'AUTOMATIC', list_price: 11800000, status: 'AVAILABLE', accepts_trade: false },
]

const brands = computed(() => {
  return [...new Set(featuredVehicles.map(v => v.brand))]
})

const priceRanges = computed(() => {
  const maxPrice = Math.max(...featuredVehicles.map(v => v.list_price))

  const step = 5000000
  const ranges = []

  for (let price = step; price <= maxPrice + step; price += step) {
    ranges.push(price)
  }

  return ranges
})
</script>

<template>
  <div>
    <LandingHero />

    <!-- BUSCADOR RÁPIDO -->
    <section class="border-y border-border bg-surface px-4 py-6 md:px-12 lg:px-24">
      <div class="mx-auto max-w-2xl">
        <p class="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Buscador rápido
        </p>

        <div class="flex flex-col gap-3 max-w-2xl mx-auto">
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Marca del vehículo" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem v-for="brand in brands" :key="brand" :value="brand">
                {{ brand }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Precio máximo" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem v-for="price in priceRanges" :key="price" :value="price">
                Hasta {{ formatPrice(price) }}
              </SelectItem>
            </SelectContent>
          </Select>

          <div class="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
            <span class="text-sm text-muted-foreground">Acepta permuta</span>
            <Switch v-model:checked="acceptsTrade" />
          </div>

          <Button class="w-full font-display font-bold cursor-pointer">
            Buscar
          </Button>

        </div>
      </div>
    </section>

    <!-- VEHÍCULOS DESTACADOS -->
    <section class="px-4 py-12 md:px-12 lg:px-24">
      <div class="mx-auto max-w-6xl">

        <HighlightedVehiclesHeader />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="vehicle in featuredVehicles"
            :key="vehicle.id"
            class="group overflow-hidden transition-shadow hover:shadow-md"
          >
            <!-- Imagen -->
            <div class="relative h-48 bg-accent flex items-center justify-center">
              <span class="text-4xl opacity-20"><!--icon-image--></span>
              <Badge
                class="absolute top-3 left-3"
                :class="{
                  'bg-(--status-available) text-(--status-available-text)': vehicle.status === 'AVAILABLE',
                  'bg-(--status-reserved) text-(--status-reserved-text)': vehicle.status === 'RESERVED',
                }"
              >
                {{ vehicle.status === 'AVAILABLE' ? 'Disponible' : 'Reservado' }}
              </Badge>
            </div>

            <CardContent class="p-4">
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
                <Badge v-if="vehicle.accepts_trade" variant="secondary">
                  Acepta permuta
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- mobile -->
        <NuxtLink
          to="/vehicles"
          class="mt-6 flex sm:hidden items-center justify-center gap-2 w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
        >
          Ver todos los vehículos
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>

      </div>
    </section>

    <WhyUs />

    <LandingPaymentMethods />

    <LandingCTA />
  </div>
</template>
