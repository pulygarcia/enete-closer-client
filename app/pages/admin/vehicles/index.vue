<script setup lang="ts">
  import { Plus, MoreHorizontal, ChevronDown } from 'lucide-vue-next'
  import type { Vehicle, VehicleStatus } from '~/types/vehicle.types'
  import { statusLabel, formatPrice } from '~/lib/utils'
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '~/components/ui/table'
  import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '~/components/ui/alert-dialog'
  import { Card, CardContent } from '~/components/ui/card'
  import { Badge } from '~/components/ui/badge'
  import { Button } from '~/components/ui/button'
  import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '~/components/ui/dropdown-menu'

  definePageMeta({ layout: 'admin' })

  const { vehicles, isLoading, error, loadAll, deleteVehicle } = useVehicles()

  onMounted(() => loadAll())

  const vehicleToDelete = ref<Vehicle | null>(null)
  const isDeleteOpen = ref(false)
  const statusChange = ref<{ vehicle: Vehicle; newStatus: VehicleStatus } | null>(null)

  function confirmDelete(vehicle: Vehicle) {
    vehicleToDelete.value = vehicle
    isDeleteOpen.value = true
  }

  function confirmStatusChange(vehicle: Vehicle, newStatus: VehicleStatus) {
    statusChange.value = { vehicle, newStatus }
  }

  async function handleDelete() {
    const vehicle = vehicleToDelete.value
    if (!vehicle) return
    await deleteVehicle(vehicle.id)
    isDeleteOpen.value = false
    vehicleToDelete.value = null
  }

  async function handleStatusChange() {
    if (!statusChange.value) return
    // await vehicleService.updateStatus(statusChange.value.vehicle.id, statusChange.value.newStatus)
    // await loadAll()
    statusChange.value = null
  }

  function availableStatuses(current: VehicleStatus) {
    const all = [
      { value: 'AVAILABLE' as VehicleStatus, label: 'Disponible' },
      { value: 'RESERVED' as VehicleStatus, label: 'Reservado' },
      { value: 'SOLD' as VehicleStatus, label: 'Vendido' },
    ]
    return all.filter(s => s.value !== current)
  }
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-extrabold text-foreground">Vehículos</h1>
        <p class="text-sm text-muted-foreground mt-1">{{ vehicles?.length }} vehículos en total</p>
      </div>
      <Button class="font-display font-bold text-white" as-child>
        <NuxtLink to="/admin/vehicles/new">
          <Plus class="w-4 h-4 mr-2" />
          Nuevo vehículo
        </NuxtLink>
      </Button>
    </div>

    <!-- Skeleton -->
    <div v-if="isLoading" class="flex flex-col gap-3">
      <Skeleton v-for="n in 5" :key="n" class="h-14 w-full" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4">
      <p class="text-muted-foreground text-sm">{{ error }}</p>
      <Button variant="outline" @click="loadAll">Reintentar</Button>
    </div>

    <div v-else-if="!isLoading && vehicles?.length === 0 && !error" class="flex flex-col items-center justify-center py-16 gap-2">
      <p class="font-display font-bold text-foreground">Sin vehículos</p>
      <p class="text-sm text-muted-foreground">No hay vehículos cargados todavía</p>
    </div>
    
    <!-- Tabla -->
    <Card v-else-if="vehicles && vehicles?.length > 0">
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehículo</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Km</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Permuta</TableHead>
              <TableHead class="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              class="hover:bg-accent/50"
            >
              <!-- Vehículo -->
              <TableCell>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-accent overflow-hidden shrink-0">
                    <img
                      v-if="vehicle.images?.[0]"
                      :src="vehicle.images[0]"
                      :alt="`${vehicle.brand} ${vehicle.model}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="font-medium text-sm text-foreground">
                      {{ vehicle.brand }} {{ vehicle.model }}
                    </p>
                    <p class="text-xs text-muted-foreground">{{ vehicle.year }}</p>
                  </div>
                </div>
              </TableCell>

              <!-- Patente -->
              <TableCell class="text-sm font-mono text-muted-foreground uppercase">
                {{ vehicle.plate }}
              </TableCell>

              <!-- Km -->
              <TableCell class="text-sm text-muted-foreground">
                {{ vehicle.km.toLocaleString('es-AR') }} km
              </TableCell>

              <!-- Precio -->
              <TableCell class="text-sm font-bold text-foreground">
                {{ formatPrice(vehicle.list_price) }}
              </TableCell>

              <!-- Estado -->
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <button
                      class="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-opacity hover:opacity-80"
                      :class="{
                        'bg-status-available text-(--status-available-text)': vehicle.status === 'AVAILABLE',
                        'bg-status-reserved text-(--status-reserved-text)': vehicle.status === 'RESERVED',
                        'bg-status-sold text-(--status-sold-text)': vehicle.status === 'SOLD',
                      }"
                    >
                      {{ statusLabel(vehicle.status) }}
                      <ChevronDown class="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="bg-background">
                    <DropdownMenuItem
                      v-for="s in availableStatuses(vehicle.status)"
                      :key="s.value"
                      @click="confirmStatusChange(vehicle, s.value)"
                      class="cursor-pointer"
                    >
                      {{ s.label }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  class="text-xs"
                  :class="vehicle.accepts_trade
                    ? 'border-(--status-available) text-(--status-available-text)'
                    : 'border-border text-muted-foreground'"
                >
                  {{ vehicle.accepts_trade ? 'Sí' : 'No' }}
                </Badge>
              </TableCell>

              <!-- Acciones -->
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="bg-background">
                    <DropdownMenuItem as-child class="cursor-pointer">
                      <NuxtLink :to="`/admin/vehicles/${vehicle.id}/edit`">
                        Editar
                      </NuxtLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="text-destructive"
                      @click="confirmDelete(vehicle)"
                    >
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Alert dialog eliminar -->
    <AlertDialog :open="isDeleteOpen" @update:open="isDeleteOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar vehículo?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás por eliminar el {{ vehicleToDelete?.brand }} {{ vehicleToDelete?.model }} {{ vehicleToDelete?.year }}.
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isDeleteOpen = false; vehicleToDelete = null">Cancelar</AlertDialogCancel>
          <AlertDialogAction class="bg-destructive text-white hover:bg-destructive/90" @click="handleDelete">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Alert dialog cambio de estado -->
    <AlertDialog :open="!!statusChange" @update:open="statusChange = null"> <!--!!statusChange <--convierte cualquier valor a booleano (null o undefined terminan false)  -->
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cambiar estado?</AlertDialogTitle>
          <AlertDialogDescription>
            Cambiás el estado del {{ statusChange?.vehicle.brand }} {{ statusChange?.vehicle.model }} a
            <strong>{{ statusChange ? statusLabel(statusChange.newStatus) : '' }}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="statusChange = null">Cancelar</AlertDialogCancel>
          <AlertDialogAction @click="handleStatusChange">Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
