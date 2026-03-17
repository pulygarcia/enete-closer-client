import type { DashboardStats } from "~/types/dashboartd.types"

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchStats() {
    isLoading.value = true
    error.value = null
    try {
      stats.value = await dashboardService.getStats()
    } catch (e) {
      error.value = 'No se pudieron cargar las estadísticas'
    } finally {
      isLoading.value = false
    }
  }

  return {
    stats,
    isLoading,
    error,
    fetchStats,
  }
})