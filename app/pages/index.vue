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

const { vehicles, isLoading, loadFeatured } = useVehicles()

useSeoMeta({
  title: 'ENETE Vehículos — Tu próximo vehículo, sin vueltas',
  description: 'Encontrá tu próximo vehículo',
})

onMounted(() => {
  loadFeatured()
})

const featuredVehicles = computed(() => {
  let result = vehicles.value ?? []
  if (acceptsTrade.value) {
    result = result.filter(v => v.accepts_trade)
  }
  return result.slice(0, 6)
})

const brands = computed(() => {
  return [...new Set((vehicles.value ?? []).map(v => v.brand))]
})

const priceRanges = computed(() => {
  const maxPrice = Math.max(...(vehicles.value ?? []).map(v => v.list_price))

  const step = 5000000
  const ranges = []

  for (let price = step; price <= maxPrice + step; price += step) {
    ranges.push(price)
  }

  return ranges
})

const acceptsTrade = ref(true)
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
            <!-- <ClientOnly>/ /TODO: funciona visualmente al clickear pero diempre está unchecked, no se pudo implementar, revisar.
              <Switch
                :checked="acceptsTrade"
                @click="acceptsTrade = !acceptsTrade"
              />
            </ClientOnly> -->
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
          </div>

          <Button class="w-full font-display font-bold cursor-pointer"><!--todo: implementar navigate con filters a page correspondiente-->
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
