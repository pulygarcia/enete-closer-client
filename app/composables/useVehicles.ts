import type { VehicleFilters } from '~/types/vehicle.types'
import { useVehicleStore } from '~/stores/vehicle.store'

export function useVehicles() {
  const store = useVehicleStore()

  const filters = ref<VehicleFilters>({})

  async function search(newFilters?: VehicleFilters) {
    filters.value = { ...filters.value, ...newFilters }
    await store.fetchAll(filters.value)
  }

  async function loadFeatured() {
    await store.fetchAll()
  }

  async function loadAll() {
    await store.fetchAll({ status: 'AVAILABLE' })
  }

  async function fetchOne(id: string) {
    await store.fetchById(id)
  }

  return {
    vehicles: computed(() => store.vehicles),
    currentVehicle: computed(() => store.currentVehicle),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    meta: computed(() => store.meta),
    filters,
    search,
    loadFeatured,
    loadAll,
    fetchOne,
  }
}