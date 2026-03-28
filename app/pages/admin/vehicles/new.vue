<script setup lang="ts">
import { ArrowLeft, Plus, X } from 'lucide-vue-next'
import type { Transmission, VehicleCondition, FuelType } from '~/types/vehicle.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import AcceptsTradeSwitch from '~/components/common/AcceptsTradeSwitch.vue'

definePageMeta({ layout: 'admin' })

const { createVehicle, isLoading } = useVehicles()
const router = useRouter()

const form = reactive({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  km: 0,
  transmission: 'MANUAL' as Transmission,
  fuel: 'Nafta' as FuelType,
  condition: 'Bueno' as VehicleCondition,
  list_price: 0,
  owner_price: 0,
  accepts_trade: false,
  trade_conditions: '',
  description: '',
  images: [] as string[],
  // TODO: ownerId — pendiente módulo consignantes (select + crear inline)
})

const fileInput = ref<HTMLInputElement | null>(null)
// TODO: subir archivos a Cloudinary y reemplazar previews por URLs reales antes de enviar
const imagePreviews = ref<string[]>([])
const error = ref<string | null>(null)

function onFilesSelected(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  const remaining = 3 - imagePreviews.value.length
  files.slice(0, remaining).forEach(file => {
    imagePreviews.value.push(URL.createObjectURL(file))
  })
  if (fileInput.value) fileInput.value.value = ''
}

function removeImage(index: number) {
  URL.revokeObjectURL(imagePreviews.value[index] as string)
  imagePreviews.value.splice(index, 1)
}

async function handleSubmit() {
  error.value = null
  try {
    // TODO: agregar ownerId cuando esté el módulo de consignantes
    await createVehicle({
      ...form,
      trade_conditions: form.accepts_trade ? form.trade_conditions : undefined,
    })
    router.push('/admin/vehicles')
  } catch {
    error.value = 'No se pudo crear el vehículo. Revisá los datos e intentá de nuevo.'
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Header -->
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" as-child>
        <NuxtLink to="/admin/vehicles">
          <ArrowLeft class="w-4 h-4" />
        </NuxtLink>
      </Button>
      <div>
        <h1 class="font-display text-2xl font-extrabold text-foreground">Nuevo vehículo</h1>
        <p class="text-sm text-muted-foreground mt-1">Completá los datos del vehículo</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

      <!-- Datos básicos -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Datos básicos</CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Marca <span class="text-destructive">*</span></label>
            <Input v-model="form.brand" placeholder="Toyota" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Modelo <span class="text-destructive">*</span></label>
            <Input v-model="form.model" placeholder="Corolla" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Año <span class="text-destructive">*</span></label>
            <Input v-model.number="form.year" type="number" min="1900" :max="new Date().getFullYear() + 1" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Kilometraje <span class="text-destructive">*</span></label>
            <Input v-model.number="form.km" type="number" min="0" placeholder="50000" required />
          </div>
        </CardContent>
      </Card>

      <!-- TODO: Select de consignante (ownerId) — pendiente módulo consignantes -->
      <!--       Flujo: buscar owner existente o crear uno nuevo inline                -->

      <!-- Características -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Características</CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Transmisión</label>
            <Select v-model="form.transmission">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent class="bg-white">
                <SelectItem value="MANUAL">Manual</SelectItem>
                <SelectItem value="AUTOMATIC">Automática</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Combustible</label>
            <Select v-model="form.fuel">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent class="bg-white">
                <SelectItem value="Nafta">Nafta</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="GNC">GNC</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
                <SelectItem value="Eléctrico">Eléctrico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Condición</label>
            <Select v-model="form.condition">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent class="bg-white">
                <SelectItem value="Excelente">Excelente</SelectItem>
                <SelectItem value="Muy bueno">Muy bueno</SelectItem>
                <SelectItem value="Bueno">Bueno</SelectItem>
                <SelectItem value="Con detalles">Con detalles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <!-- Precios -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Precios</CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Precio de lista <span class="text-destructive">*</span></label>
            <Input v-model.number="form.list_price" type="number" min="0" placeholder="15000000" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Precio consignante <span class="text-muted-foreground text-xs">(privado)</span></label>
            <Input v-model.number="form.owner_price" type="number" min="0" placeholder="13000000" />
          </div>
        </CardContent>
      </Card>

      <!-- Permuta -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Permuta</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <AcceptsTradeSwitch v-model="form.accepts_trade" />
          <div v-if="form.accepts_trade" class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Condiciones de permuta</label>
            <textarea
              v-model="form.trade_conditions"
              rows="2"
              placeholder="Ej: Solo autos de hasta 5 años..."
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Descripción -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Describí el vehículo, equipamiento, historial de mantenimiento..."
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </CardContent>
      </Card>

      <!-- Imágenes -->
      <Card class="pt-0 overflow-hidden">
        <CardHeader class="bg-accent/60 border-b border-border pt-4">
          <CardTitle class="text-base font-display border-l-2 border-primary pl-2">Imágenes</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="onFilesSelected"
          />
          <Button
            type="button"
            variant="outline"
            :disabled="imagePreviews.length >= 3"
            @click="fileInput?.click()"
          >
            <Plus class="w-4 h-4 mr-2" />
            {{ imagePreviews.length >= 3 ? 'Máximo 3 imágenes' : 'Seleccionar imágenes' }}
          </Button>
          <ul v-if="imagePreviews.length" class="flex flex-col gap-2">
            <li
              v-for="(url, i) in imagePreviews"
              :key="i"
              class="flex items-center gap-2 rounded-md border border-border px-3 py-2"
            >
              <img :src="url" class="w-10 h-10 rounded object-cover shrink-0" :alt="`Imagen ${i + 1}`" />
              <span class="text-xs text-muted-foreground flex-1">Imagen {{ i + 1 }}</span>
              <button type="button" @click="removeImage(i)" class="text-muted-foreground hover:text-destructive transition-colors">
                <X class="w-4 h-4" />
              </button>
            </li>
          </ul>
          <p v-else class="text-sm text-muted-foreground">Sin imágenes agregadas</p>
        </CardContent>
      </Card>

      <!-- Error -->
      <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

      <!-- Acciones -->
      <div class="flex justify-end gap-3">
        <Button variant="outline" as-child>
          <NuxtLink to="/admin/vehicles">Cancelar</NuxtLink>
        </Button>
        <Button type="submit" :disabled="isLoading" class="font-display font-bold text-white">
          {{ isLoading ? 'Guardando...' : 'Guardar vehículo' }}
        </Button>
      </div>

    </form>
  </div>
</template>
