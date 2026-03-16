import { signOut, signIn, useSession, type AuthUser, authClient } from "~/lib/client";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthUser | null>(null)
    const isLoading = ref(false)
  
    async function login(email: string, password: string) {
      isLoading.value = true
      try {
        const { data, error } = await signIn.email({ email, password })
        if (error) throw new Error(error.message)
        user.value = data.user as AuthUser
        await navigateTo('/admin')
      } finally {
        isLoading.value = false
      }
    }
  
    async function logout() {
      await signOut()
      user.value = null
      await navigateTo('/auth/login')
    }
  
    async function fetchSession() {
      const session = authClient.getSession();
      user.value = (await session).data?.user as AuthUser?? null
    }
  
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'ADMIN')
  
    return { user, isLoading, isAuthenticated, isAdmin, login, logout, fetchSession }
  })