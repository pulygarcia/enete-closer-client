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

  async function createVehicle(payload: Parameters<typeof store.createVehicle>[0]) {
    return store.createVehicle(payload)
  }

  async function deleteVehicle(id: string) {
    await store.deleteVehicle(id)
  }

  const brands = computed(() =>
    [...new Set((store.vehicles ?? []).map(v => v.brand))].sort()
  )

  const priceRanges = computed(() => {
    const list = store.vehicles ?? []
    if (list.length === 0) return []
    const max = Math.max(...list.map(v => v.list_price))
    const step = 5_000_000
    const ranges: number[] = []
    for (let price = step; price <= max + step; price += step) {
      ranges.push(price)
    }
    return ranges
  })

  // Catalog filters (client-side, for vehicles/index)
  const selectedBrand = ref('all')
  const selectedMaxPrice = ref('all')
  const catalogAcceptsTrade = ref(false)

  const filteredVehicles = computed(() => {
    let result = store.vehicles ?? []
    if (selectedBrand.value !== 'all') {
      result = result.filter(v => v.brand === selectedBrand.value)
    }
    if (selectedMaxPrice.value !== 'all') {
      result = result.filter(v => v.list_price <= Number(selectedMaxPrice.value))
    }
    if (catalogAcceptsTrade.value) {
      result = result.filter(v => v.accepts_trade)
    }
    return result
  })

  function clearCatalogFilters() {
    selectedBrand.value = 'all'
    selectedMaxPrice.value = 'all'
    catalogAcceptsTrade.value = false
  }

  return {
    vehicles: computed(() => store.vehicles),
    currentVehicle: computed(() => store.currentVehicle),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    meta: computed(() => store.meta),
    brands,
    priceRanges,
    selectedBrand,
    selectedMaxPrice,
    catalogAcceptsTrade,
    filteredVehicles,
    clearCatalogFilters,
    filters,
    search,
    loadFeatured,
    loadAll,
    fetchOne,
    createVehicle,
    deleteVehicle,
  }
}