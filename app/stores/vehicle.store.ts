import type { PaginationMeta } from '~/types/api.types'
import type { Vehicle, VehicleFilters } from '~/types/vehicle.types'
import { vehicleService } from '~/services/vehicles.service'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = ref<Vehicle[]>([])
  const currentVehicle = ref<Vehicle | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const meta = ref<PaginationMeta | null>(null)

  async function fetchAll(filters?: VehicleFilters) {
    isLoading.value = true
    error.value = null
    try {
      const response = await vehicleService.getAll(filters)
      vehicles.value = response
      meta.value = null //esperar pagination meta en response para setear
    } catch (e) {
      error.value = 'No se pudieron cargar los vehículos'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchById(id: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await vehicleService.getById(id)
      currentVehicle.value = response
    } catch (e) {
      error.value = 'No se encontró el vehículo'
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    vehicles.value = []
    currentVehicle.value = null
    error.value = null
    meta.value = null
  }

  return {
    vehicles,
    currentVehicle,
    isLoading,
    error,
    meta,
    fetchAll,
    fetchById,
    clear,
  }
})