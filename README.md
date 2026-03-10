# Eneté Closer — Frontend

Frontend de **Eneté Closer**, sistema de gestión de consignación de vehículos y CRM para intermediarios automotores. Construido con **Nuxt 3**, combina un catálogo público optimizado para SEO con un panel de administración completo.

> Para detalles técnicos profundos, páginas, stores y convenciones → ver [CONTEXT.md](./CONTEXT.md)

---

## Stack

| Capa | Tecnología |
|---|---|
| **Framework** | Nuxt 3 |
| **Lenguaje** | TypeScript |
| **UI** | shadcn-vue + Tailwind CSS |
| **Estado global** | Pinia |
| **Formularios** | VeeValidate + Zod |
| **HTTP** | `$fetch` / `useFetch` (Nuxt) |
| **Autenticación** | Better Auth client |

---

## Arquitectura

El proyecto sigue una **arquitectura en capas orientada a servicios**:
```
Página / Componente
      ↓
Composable          ← lógica de UI y estado local
      ↓
Store (Pinia)       ← estado global compartido
      ↓
Service             ← comunicación con la API
      ↓
API NestJS
```

**Regla base:** Las páginas y componentes nunca llaman directamente a la API. Siempre pasan por el servicio.

### Estructura general
```
src/
├── components/
│   ├── ui/              # Componentes shadcn-vue
│   ├── common/          # Navbar, Footer, componentes globales
│   ├── vehicles/
│   ├── owners/
│   └── sales/
├── composables/         # Lógica reutilizable (useVehicles, useOwners...)
├── layouts/
│   ├── default.vue      # Catálogo público
│   └── admin.vue        # Panel admin con sidebar
├── middleware/
│   └── auth.ts          # Protección de rutas admin
├── pages/
│   ├── index.vue        # Catálogo público
│   ├── vehicles/[id].vue
│   └── admin/           # Panel completo
├── schemas/             # Validaciones Zod
├── services/            # Llamadas a la API
├── stores/              # Pinia stores
└── types/               # Tipos TypeScript compartidos
```

### Estrategia de rendering

| Sección | Rendering | Motivo |
|---|---|---|
| Catálogo público | SSR | SEO — Google indexa cada auto |
| Detalle de vehículo | SSR | SEO por ficha individual |
| Panel admin | SPA (client-only) | No requiere SEO |
| Login | SPA | No requiere SEO |

---

## Levantar el proyecto
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Desarrollo
npm run dev
```

| Comando | Descripción |
|---|---|
| `npm run dev` | Desarrollo con hot-reload |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Lint del proyecto |

---

## Variables de entorno

Ver `.env.example` en la raíz del proyecto.
```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NUXT_PUBLIC_APP_URL=http://localhost:3001
```