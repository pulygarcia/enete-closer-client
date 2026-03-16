<template>
    <div class="min-h-screen bg-background flex items-center justify-center px-4">
  
      <!-- bg -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent opacity-60 animate-pulse" />
        <div class="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-accent opacity-40 animate-pulse" style="animation-delay: 700ms" />
      </div>
  
      <div class="relative w-full max-w-sm">
  
        <div class="text-center mb-8">
          <NuxtLink to="/" class="font-display font-extrabold text-2xl tracking-tight text-foreground">
            ENETE<span class="text-primary">.</span>
          </NuxtLink>
          <p class="text-sm text-muted-foreground mt-1">Panel de administración</p>
        </div>
  
        <Card>
          <CardContent class="p-6 flex flex-col gap-5">
  
            <div>
              <h1 class="font-display font-bold text-xl text-foreground">Iniciar sesión</h1>
              <p class="text-sm text-muted-foreground mt-1">Ingresá tus credenciales para continuar</p>
            </div>
  
            <VeeForm :validation-schema="schema" @submit="onSubmit" class="flex flex-col gap-4">
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-foreground">Email</label>
                <VeeField name="email" v-slot="{ field, errorMessage }">
                  <Input v-bind="field" type="email" placeholder="admin@enete.com" :class="errorMessage ? 'border-destructive' : ''" />
                  <p v-if="errorMessage" class="text-xs text-destructive mt-1">{{ errorMessage }}</p>
                </VeeField>
              </div>
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-foreground">Contraseña</label>
                <VeeField name="password" v-slot="{ field, errorMessage }">
                  <Input v-bind="field" type="password" placeholder="••••••••" :class="errorMessage ? 'border-destructive' : ''" />
                  <p v-if="errorMessage" class="text-xs text-destructive mt-1">{{ errorMessage }}</p>
                </VeeField>
              </div>
  
              <!-- Error general -->
              <p v-if="authError" class="text-xs text-destructive text-center">{{ authError }}</p>
  
              <Button type="submit" class="w-full font-display font-bold" size="lg" :disabled="isLoading">
                {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
              </Button>
  
            </VeeForm>
  
          </CardContent>
        </Card>

        <p class="text-center text-xs text-muted-foreground mt-6">
          <NuxtLink to="/" class="hover:text-foreground transition-colors">
            Volver al sitio
          </NuxtLink>
        </p>
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { z } from 'zod'
  import type {GenericObject} from 'vee-validate'
  
  definePageMeta({ layout: false })
  
  const authStore = useAuthStore()
  const authError = ref<string | null>(null)
  
  const schema = toTypedSchema(z.object({
    email: z.string({required_error: 'El email es requerido'}).email('Email inválido'),
    password: z.string({required_error: 'La contraseña es requerida'}).min(6, 'Mínimo 6 caracteres'),
  }))
  
  const { isLoading } = storeToRefs(authStore)
  
  async function onSubmit(values: GenericObject) {
    authError.value = null
    try {
      await authStore.login(values.email, values.password)
    } catch (e: any) {
      authError.value = e.message ?? 'Credenciales incorrectas'
    }
  }
  </script>