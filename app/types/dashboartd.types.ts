import type { Vehicle } from './vehicle.types'

export interface DashboardCounters {
  available: number
  reserved: number
  monthlySales: number
  monthlyCommissions: number
}

export interface DashboardStats {
  counters: DashboardCounters
  recentVehicles: Partial<Vehicle>[]
  recentSales: RecentSale[]
  stalledVehicles: Partial<Vehicle>[]
}

export interface RecentSale {
  id: string
  commission_earned: string | number
  createdAt: string
  vehicle: Partial<Vehicle>
}