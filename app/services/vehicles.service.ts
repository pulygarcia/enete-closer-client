import type { PaginationMeta } from '~/types/api.types'
import type { Vehicle, VehicleFilters } from '~/types/vehicle.types'

export const vehicleService = {
  async getAll(filters?: VehicleFilters): Promise<Vehicle[]> {
    const config = useRuntimeConfig()

    return $fetch<Vehicle[]>(`${config.public.apiBaseUrl}/vehicles`, {
      params: filters,
    })
  },

  async getById(id: string): Promise<Vehicle> {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.apiBaseUrl}/vehicles/${id}`)
  },
}