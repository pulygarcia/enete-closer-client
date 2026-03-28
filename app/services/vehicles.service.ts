//import type { PaginationMeta } from '~/types/api.types'
import type { Vehicle, VehicleFilters, Transmission, VehicleCondition, FuelType } from '~/types/vehicle.types'

export type CreateVehiclePayload = {
  brand: string
  model: string
  year: number
  km: number
  transmission: Transmission
  list_price: number
  owner_price: number
  // TODO: ownerId — pendiente módulo consignantes
  accepts_trade?: boolean
  images?: string[]
  description?: string
  condition?: VehicleCondition
  trade_conditions?: string
  fuel?: FuelType
}

export const vehicleService = {
  async getAll(filters?: VehicleFilters): Promise<Vehicle[]> {
    const config = useRuntimeConfig()

    return $fetch<Vehicle[]>(`${config.public.apiBaseUrl}/vehicles`, {
      params: filters,
    })
  },

  async getById(id: string): Promise<Vehicle> {
    const config = useRuntimeConfig()
    const result = await $fetch(`${config.public.apiBaseUrl}/vehicles/${id}`)
    return result as Vehicle
  },

  async create(payload: CreateVehiclePayload): Promise<Vehicle> {
    const config = useRuntimeConfig()
    return $fetch<Vehicle>(`${config.public.apiBaseUrl}/vehicles`, {
      method: 'POST',
      body: payload,
      credentials: 'include',
    })
  },

  async delete(id: string): Promise<void> {
    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiBaseUrl}/vehicles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  },
}