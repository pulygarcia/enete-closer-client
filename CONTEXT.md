# CONTEXT.md — Eneté Closer Frontend

> Leer antes de cualquier tarea de código. Actualizarlo manualmente al agregar páginas, stores o servicios nuevos.

---

## Stack Tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Nuxt 4| SSR para catálogo, SPA para admin |
| Lenguaje | TypeScript | Strict mode |
| UI | shadcn-vue + Tailwind CSS | Componentes en `components/ui/` |
| Estado global | Pinia | Un store por dominio |
| Formularios | VeeValidate + Zod | Schemas en `schemas/` |
| HTTP | `$fetch` / `useFetch` | Nunca fetch nativo directo |
| Autenticación | Better Auth client | |

---

## Arquitectura en Capas
```
Página / Componente  →  solo renderizado y eventos de UI
        ↓
Composable           →  lógica de UI, estado local, llama al store o servicio
        ↓
Store (Pinia)        →  estado global compartido entre páginas
        ↓
Service              →  comunicación con la API, sin estado
```

### Reglas estrictas

- **Páginas y componentes** nunca llaman directamente a la API ni al store. Siempre via composable.
- **Servicios** son funciones puras sin estado. Solo hacen llamadas HTTP y devuelven datos tipados.
- **Stores** solo guardan estado que se comparte entre más de una página.
- **Composables** encapsulan la lógica de cada feature: llaman al servicio o store y exponen lo que necesita el componente.
- **Schemas Zod** se definen una sola vez en `schemas/` y se reutilizan en formularios y como tipos TypeScript (`z.infer<>`).

---

## Estructura del Proyecto
```
src/
├── assets/
│   └── css/
│       └── main.css             # Tailwind base + variables globales
├── components/
│   ├── ui/                      # Componentes shadcn-vue (nunca modificar directamente)
│   ├── common/                  # Navbar, Footer, Sidebar, PageHeader, EmptyState...
│   ├── vehicles/
│   │   ├── VehicleCard.vue      # Tarjeta del catálogo público
│   │   ├── VehicleGallery.vue   # Galería de fotos
│   │   ├── VehicleFilters.vue   # Filtros del catálogo
│   │   └── VehicleBadge.vue     # Badge de estado (Disponible/Reservado)
│   ├── owners/
│   └── sales/
├── composables/
│   ├── useVehicles.ts
│   ├── useOwners.ts
│   ├── useConsignments.ts
│   └── useSales.ts
├── layouts/
│   ├── default.vue              # Catálogo público (Navbar + Footer)
│   └── admin.vue                # Panel admin (Sidebar + Header)
├── middleware/
│   └── auth.ts                  # Redirige a /login si no hay sesión activa
├── pages/
│   ├── index.vue                # Catálogo público — listado con filtros
│   ├── login.vue                # Login del administrador
│   ├── vehicles/
│   │   └── [id].vue             # Detalle público de un vehículo
│   └── admin/
│       ├── index.vue            # Dashboard
│       ├── vehicles/
│       │   ├── index.vue        # Listado de vehículos (admin)
│       │   ├── new.vue          # Crear vehículo
│       │   └── [id]/
│       │       └── edit.vue     # Editar vehículo
│       ├── owners/
│       │   ├── index.vue        # Listado de consignantes
│       │   ├── new.vue
│       │   └── [id]/
│       │       └── edit.vue
│       ├── consignments/
│       │   ├── index.vue        # Listado de consignaciones
│       │   └── [id].vue         # Detalle de consignación
│       └── sales/
│           ├── index.vue        # Historial de ventas
│           └── new.vue          # Registrar venta
├── schemas/
│   ├── vehicle.schema.ts        # z.object() para crear/editar vehículo
│   ├── owner.schema.ts
│   ├── consignment.schema.ts
│   └── sale.schema.ts
├── services/
│   ├── vehicle.service.ts
│   ├── owner.service.ts
│   ├── consignment.service.ts
│   └── sale.service.ts
├── stores/
│   ├── auth.store.ts            # Sesión del usuario admin
│   ├── vehicle.store.ts         # Estado de vehículos (listado, filtros activos)
│   ├── owner.store.ts
│   └── ui.store.ts              # Loading global, toasts, estado del sidebar
└── types/
    ├── vehicle.types.ts
    ├── owner.types.ts
    ├── consignment.types.ts
    ├── sale.types.ts
    └── api.types.ts             # ApiResponse<T>, Pagination, FilterParams
```

---

## Estrategia de Rendering

| Página | Ruta | Rendering | Motivo |
|---|---|---|---|
| Catálogo | `/` | SSR | SEO + velocidad de carga |
| Detalle vehículo | `/vehicles/:id` | SSR | Google indexa cada ficha individual |
| Login | `/login` | SPA | No requiere SEO |
| Dashboard admin | `/admin` | SPA (client-only) | No requiere SEO |
| Todas las rutas `/admin/*` | SPA (client-only) | No requiere SEO |

Para forzar client-only en el admin usar en el layout:
```vue
<ClientOnly>
  <NuxtPage />
</ClientOnly>
```

---

## Índice Rápido

| Si buscás… | Archivo |
|---|---|
| Llamadas a la API de vehículos | `services/vehicle.service.ts` |
| Estado global de vehículos | `stores/vehicle.store.ts` |
| Lógica del catálogo | `composables/useVehicles.ts` |
| Validación de formulario de vehículo | `schemas/vehicle.schema.ts` |
| Protección de rutas admin | `middleware/auth.ts` |
| Tipos de la API | `types/api.types.ts` |
| Componentes UI base | `components/ui/` |
| Layout del panel admin | `layouts/admin.vue` |

---

## Patrones de Código

### Service (sin estado)
```typescript
// services/vehicle.service.ts
export const vehicleService = {
  async getAll(filters?: VehicleFilters): Promise<ApiResponse<Vehicle[]>> {
    return $fetch('/api/vehicles', { params: filters })
  },
  async getById(id: string): Promise<ApiResponse<Vehicle>> {
    return $fetch(`/api/vehicles/${id}`)
  },
  async create(data: CreateVehicleDto): Promise<ApiResponse<Vehicle>> {
    return $fetch('/api/vehicles', { method: 'POST', body: data })
  },
}
```

### Schema Zod + VeeValidate
```typescript
// schemas/vehicle.schema.ts
export const createVehicleSchema = z.object({
  brand: z.string().min(1, 'La marca es requerida'),
  model: z.string().min(1, 'El modelo es requerido'),
  year: z.number().min(1990).max(new Date().getFullYear()),
  list_price: z.number().positive('El precio debe ser mayor a 0'),
  owner_price: z.number().positive(),
})

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>
```

---

## Tipos API Genéricos
```typescript
// types/api.types.ts
export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
```

---

## Variables de Entorno
```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NUXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## Convenciones

- **Componentes** → PascalCase (`VehicleCard.vue`)
- **Composables** → prefijo `use` (`useVehicles.ts`)
- **Stores** → sufijo `.store` (`vehicle.store.ts`)
- **Servicios** → sufijo `.service` (`vehicle.service.ts`)
- **Schemas** → sufijo `.schema` (`vehicle.schema.ts`)
- **Tipos** → sufijo `.types` (`vehicle.types.ts`)
- **Idioma del código** → inglés
- **Idioma de mensajes de error y UI** → español