# Semana 06 — Formularios con React Hook Form + Zod

Aplicación Expo para la gestión de **agentes de call center** con formularios Create/Edit validados con **Zod** y manejados con **React Hook Form**.

## Tech Stack

- **Expo** SDK 56 + **React Native** 0.85
- **React Hook Form** + **Zod** (validación)
- **TanStack Query** (estado de servidor)
- **AsyncStorage** (persistencia local)
- **React Navigation** (Stack)

## Cómo ejecutar

```bash
pnpm install
pnpm start
```

## Estructura

```
src/
├── components/   FormField.tsx          — Controlador genérico reutilizable
├── hooks/        useItems.ts            — Hooks TanStack Query (CRUD)
├── navigation/   types.ts + RootNavigator
├── schemas/      itemSchema.ts          — Esquema Zod
├── screens/      Home, Create, Edit
├── services/     api.ts                 — Capa de acceso a datos (AsyncStorage)
└── types/        index.ts               — Tipos TypeScript
```

## Funcionalidades

- **HomeScreen**: Lista de agentes con navegación a Crear/Editar
- **CreateScreen**: Formulario con validación Zod, loading state, navegación atrás al enviar
- **EditScreen**: Formulario precargado con `reset()` desde datos existentes
- **FormField**: Componente reutilizable que encapsula Controller + TextInput + error
- **Persistencia local** con AsyncStorage y datos de semilla iniciales
