# Call Center App — React Native + TanStack Query v5

## Dominio

Centro de Call Center — Gestión de agentes.

Modelo `Agent`: `id`, `name`, `role`, `department`, `phone`, `email`, `status`, `createdAt`

## API utilizada

Actualmente usa **JSONPlaceholder** (`/users`) como proxy de práctica.
Datos mapeados a un modelo de call center con 5 agentes de prueba.

Para usar **MockAPI** con datos reales:
1. Crea una cuenta en [mockapi.io](https://mockapi.io)
2. Crea un recurso `/agents` con los campos: `name`, `role`, `department`, `phone`, `email`, `status`
3. Agrega 5 registros de prueba
4. Copia la URL base en `src/services/api.ts`

## Requisitos

- Node.js 18+
- pnpm (o npm/yarn)
- Expo Go (en tu dispositivo físico) o un emulador

## Instalación

```bash
cd starter
pnpm install
```

## Ejecución

```bash
pnpm start
```

Escanea el código QR con Expo Go o presiona `a` para Android / `i` para iOS.

## Funcionalidades

| Funcionalidad | Implementación |
|---|---|
| **Lista** | `FlatList` con `useQuery` → GET /users |
| **Detalle** | Navegación a DetailScreen con `useAgent(id)` |
| **Crear** | Formulario en CreateScreen con `useMutation` + `invalidateQueries` |
| **Pull-to-refresh** | `onRefresh={refetch}` + `refreshing={isFetching}` |
| **Loading** | `ActivityIndicator` mientras `isLoading === true` |
| **Error** | Mensaje + botón "Reintentar" cuando `isError === true` |
| **Empty** | `ListEmptyComponent` cuando `data.length === 0` |

## Arquitectura

```
src/
├── services/api.ts           # Axios instance
├── hooks/
│   ├── useAgents.ts          # useQuery (lista + detalle)
│   └── useCreateAgent.ts     # useMutation + invalidateQueries
├── navigation/
│   ├── types.ts              # RootStackParamList
│   └── RootNavigator.tsx     # Stack: Home → Detail → Create
├── screens/
│   ├── HomeScreen.tsx        # FlatList + estados
│   ├── DetailScreen.tsx      # Detalle del agente
│   └── CreateScreen.tsx      # Formulario de creación
├── types/index.ts            # Interface Agent
└── theme/index.ts            # COLORS, SPACING, TYPOGRAPHY
```

## Capturas de pantalla

*(Agrega aquí las capturas de tu app en funcionamiento)*
