<script setup lang="ts">
    import { Car, Clock, ShoppingBag, Banknote } from 'lucide-vue-next'
    import { formatPrice } from '~/lib/utils'

    definePageMeta({ layout: 'admin' })

    const { stats, isLoading, error, loadStats } = useDashboard()

    import { statusLabel } from '~/lib/utils'

    onMounted(() => {
        loadStats()
    })

    
    const counters = computed(() => [
    {
        label: 'Disponibles',
        value: stats.value?.counters.available ?? 0,
        sub: 'Vehículos en catálogo',
        icon: Car,
        cardClass: 'border-(--status-available)',
        iconClass: 'bg-(--status-available) text-(--status-available-text)',
        valueClass: 'text-(--status-available-text)',
    },
    {
        label: 'Reservados',
        value: stats.value?.counters.reserved ?? 0,
        sub: 'En proceso de venta',
        icon: Clock,
        cardClass: 'border-(--status-reserved)',
        iconClass: 'bg-(--status-reserved) text-(--status-reserved-text)',
        valueClass: 'text-(--status-reserved-text)',
    },
    {
        label: 'Ventas del mes',
        value: stats.value?.counters.monthlySales ?? 0,
        sub: 'Operaciones cerradas',
        icon: ShoppingBag,
        cardClass: 'border-(--status-available)',
        iconClass: 'bg-(--status-available) text-(--status-available-text)',
        valueClass: 'text-foreground',
    },
    {
        label: 'Comisiones',
        value: formatPrice(stats.value?.counters.monthlyCommissions ?? 0),
        sub: 'Ganancia del mes',
        icon: Banknote,
        cardClass: 'border-(--status-available) bg-(--status-available)/20',
        iconClass: 'text-(--status-available-text) bg-(--status-available)',
        valueClass: 'text-(--status-available-text)',
    },
    ])

    function formatDate(date: string) {
        if(!date) return '-'
        const parsed = new Date(date)
        if (isNaN(parsed.getTime())) return '—'

        return new Intl.DateTimeFormat('es-AR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date))
    }
</script>

<template>
    <div class="flex flex-col gap-6">
  
      <!-- Header -->
      <div>
        <h1 class="font-display text-2xl font-extrabold text-foreground">Dashboard</h1>
        <p class="text-sm text-muted-foreground mt-1">Resumen del negocio</p>
      </div>
  
      <!-- Skeleton -->
      <template v-if="isLoading">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="n in 4" :key="n" class="h-28 rounded-xl bg-accent animate-pulse" />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="n in 2" :key="n" class="h-64 rounded-xl bg-accent animate-pulse" />
        </div>
      </template>
  
      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4">
        <p class="text-muted-foreground text-sm">{{ error }}</p>
        <Button variant="outline" @click="loadStats">Reintentar</Button>
      </div>
  
      <template v-else-if="stats">
  
        <!-- Contadores -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card v-for="counter in counters" :key="counter.label" :class="counter.cardClass">
                <CardContent class="p-5 flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {{ counter.label }}
                    </p>
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="counter.iconClass">
                    <component :is="counter.icon" class="w-4 h-4" />
                    </div>
                </div>
                <p class="font-display text-3xl font-extrabold" :class="counter.valueClass">
                    {{ counter.value }}
                </p>
                <p class="text-xs text-muted-foreground">{{ counter.sub }}</p>
                </CardContent>
            </Card>
        </div>
  
        <!-- Listas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
  
          <!-- Últimos vehículos -->
          <Card>
            <CardContent class="p-5">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-display font-bold text-foreground">Últimos vehículos</h2>
                <Button variant="ghost" size="sm" as-child>
                  <NuxtLink to="/admin/vehicles">Ver todos</NuxtLink>
                </Button>
              </div>
              <div class="flex flex-col gap-3">
                <div
                  v-for="vehicle in stats.recentVehicles"
                  :key="vehicle.id"
                  class="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium text-foreground">
                      {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
                    </span>
                    <span class="text-xs text-muted-foreground">
                      {{ formatPrice(Number(vehicle.list_price)) }}
                    </span>
                  </div>
                  <Badge
                    :class="{
                      'bg-status-available text-(--status-available-text)': vehicle.status === 'AVAILABLE',
                      'bg-status-reserved text-(--status-reserved-text)': vehicle.status === 'RESERVED',
                      'bg-status-sold text-(--status-sold-text)': vehicle.status === 'SOLD',
                    }"
                  >
                    {{ statusLabel(vehicle.status ?? '') }}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <!-- Últimas ventas -->
          <Card>
            <CardContent class="p-5">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-display font-bold text-foreground">Últimas ventas</h2>
                <Button variant="ghost" size="sm" as-child>
                  <NuxtLink to="/admin/sales">Ver todas</NuxtLink>
                </Button>
              </div>
              <div class="flex flex-col gap-3">
                <div
                  v-for="sale in stats.recentSales"
                  :key="sale.id"
                  class="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium text-foreground">
                      {{ sale.vehicle?.brand }} {{ sale.vehicle?.model }} {{ sale.vehicle?.year }}
                    </span>
                    <span class="text-xs text-muted-foreground">
                      {{ formatDate(sale.createdAt) }}
                    </span>
                  </div>
                  <span class="text-sm font-bold text-foreground">
                    {{ formatPrice(Number(sale.commission_earned)) }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <!-- Vehículos sin movimiento -->
          <Card class="lg:col-span-2">
            <CardContent class="p-5">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h2 class="font-display font-bold text-foreground">Sin movimiento</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Disponibles hace más de 30 días</p>
                </div>
              </div>
              <div v-if="stats.stalledVehicles.length === 0" class="py-8 text-center text-sm text-muted-foreground">
                Todos los vehículos tienen movimiento reciente
              </div>
              <div v-else class="flex flex-col gap-3">
                <div
                  v-for="vehicle in stats.stalledVehicles"
                  :key="vehicle.id"
                  class="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium text-foreground">
                      {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
                    </span>
                    <span class="text-xs text-muted-foreground">
                      Último cambio: {{ formatDate(vehicle.updated_at as string) }}
                    </span>
                  </div>
                  <span class="text-sm font-bold text-foreground">
                    {{ formatPrice(Number(vehicle.list_price)) }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
  
        </div>
  
      </template>
    </div>
  </template>