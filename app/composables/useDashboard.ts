export function useDashboard() {
    const store = useDashboardStore()

    async function loadStats(){
      await store.fetchStats();
    }
  
    return {
      stats: computed(() => store.stats),
      isLoading: computed(() => store.isLoading),
      error: computed(() => store.error),
      loadStats
    }
  }