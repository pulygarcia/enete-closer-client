import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: import.meta.env.NUXT_PUBLIC_API_BASE_URL?.replace('/api', '') ?? 'http://localhost:3001',
})

export type AuthUser = {
    id: string
    name: string
    email: string
    role: string
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
}

export const { signIn, signOut, useSession } = authClient
