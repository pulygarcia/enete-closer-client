import type { DashboardStats } from "~/types/dashboartd.types"

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const config = useRuntimeConfig()
    const response = await $fetch<DashboardStats>(`${config.public.apiBaseUrl}/dashboard/stats`,
      {
        credentials: 'include'
      }
    )
    return response
  },
}