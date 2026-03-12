export type Transmission = 'MANUAL' | 'AUTOMATIC'

export interface Owner {
  id: string
  full_name?: string
  phone?: string
  email?: string
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  plate: string
  year: number
  km: number
  transmission: Transmission
  owner_price?: number // privado, solo admin
  list_price: number
  accepts_trade: boolean
  images: string[]
  owner_id: string
    owner?: Pick<Owner, 'id' | 'full_name' | 'phone'> //si la api trae las relaciones y necesitamos owner comlpeto
  status: VehicleStatus
  created_at: string
    updated_at: string
    deleted_at?: string
}

export type VehicleStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export interface VehicleFilters {
  brand?: string
  maxPrice?: number
  acceptsTrade?: boolean
  status?: VehicleStatus
  page?: number
  limit?: number
}