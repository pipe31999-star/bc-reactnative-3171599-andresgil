# Centro de Call Center - App de Búsqueda

## 📋 Descripción del Dominio

Esta aplicación móvil es un gestor de agentes para un **Centro de Call Center**. El dominio incluye:

- **Agents (Agentes)**: Personal del call center que gestiona llamadas
- **Calls (Llamadas)**: Registro de llamadas completadas por los agentes
- **Clients (Clientes)**: Base de datos de clientes contactados
- **Campaigns (Campañas)**: Campañas de contacto activas o completadas

## 🎯 Características Implementadas

### ✅ Requisitos Cumplidos

1. **FlatList con 12+ Agentes**: Lista completa de agentes del call center con datos mock realistas
2. **Búsqueda en Tiempo Real**: El TextInput filtra agentes por nombre, teléfono o estado
3. **useMemo**: Implementado para la lógica de filtrado, optimizando re-renders
4. **useCallback**: Utilizado en `renderItem`, `keyExtractor` y `renderEmptyState`
5. **ItemCard Reutilizable**: Componente que muestra:
   - Nombre del agente
   - Estado (disponible, ocupado, sin conexión) con badge de color
   - Teléfono
   - Llamadas gestionadas
6. **Estado Vacío**: Mensaje personalizado cuando no hay resultados
7. **KeyboardAvoidingView**: Previene que el teclado tape el contenido en iOS y Android
8. **Constantes de Tema**: COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS
9. **TypeScript Estricto**: Tipado completo sin `any`
10. **keyExtractor**: Usa el ID único de cada agente, no el índice

## 📁 Estructura del Proyecto

```
week-02/
├── App.tsx                 # Componente raíz
├── app.json               # Configuración Expo
├── package.json           # Dependencias
├── tsconfig.json          # Configuración TypeScript
└── src/
    ├── types/
    │   └── index.ts       # Interfaces (Agent, Call, Client, Campaign)
    ├── data/
    │   └── mockData.ts    # 12 agentes del call center
    ├── components/
    │   └── ItemCard.tsx   # Tarjeta de agente reutilizable
    ├── screens/
    │   └── HomeScreen.tsx # Pantalla principal con FlatList y búsqueda
    └── theme/
        └── index.ts       # Constantes de color, tipografía y espaciado
```

## 🚀 Cómo Ejecutar

```bash
cd week-02
pnpm install
pnpm start
```

Luego, en el simulador:
- Presiona `i` para iOS
- Presiona `a` para Android

## 🎨 Decisiones de Diseño

### 1. **Color Scheme**
- **Azul primario (#2563eb)**: Para encabezados y elementos principales
- **Colores de estado**: Verde (disponible), Ámbar (ocupado), Gris (sin conexión)
- **Fondo neutral**: Gris claro para minimizar fatiga visual

### 2. **Filtrado Multi-campo**
La búsqueda filtra por:
- Nombre del agente
- Número de teléfono
- Estado (disponible/ocupado/offline)

### 3. **Optimización de Rendimiento**
- `useMemo` para evitar filtrados innecesarios
- `useCallback` para callbacks estables
- `keyExtractor` por ID para prevenir re-renders innecesarios

### 4. **Interfaz Intuitiva**
- Badge de estado con color visual inmediato
- Espaciado consistente usando constantes SPACING
- CardComponent con bordes sutiles para jerarquía visual

## 📊 Datos Mock

La aplicación incluye 12 agentes reales del call center:
- María García López - Disponible
- Juan Carlos Rodríguez - Ocupado
- Laura Fernández Pérez - Disponible
- Roberto Martínez Sánchez - Sin conexión
- Ana Isabel Gómez - Disponible
- Fernando López Giménez - Ocupado
- Claudia Ramírez Castro - Disponible
- David Torres Morales - Ocupado
- Elena Ruiz Martínez - Sin conexión
- Sergio Vázquez Delgado - Disponible
- Patricia Soto Álvarez - Ocupado
- Andrés Cabrera Jiménez - Disponible

## 📱 Pantallas

### Pantalla Principal (HomeScreen)
- Header con título "Call Center" y subtítulo
- Input de búsqueda en tiempo real
- Lista de agentes con estados visuales
- Estado vacío personalizado cuando no hay coincidencias

## 🔧 Tecnologías Utilizadas

- **React Native**: Framework multiplataforma
- **Expo**: CLI y toolkit para React Native
- **TypeScript**: Tipado estricto
- **React Hooks**: useState, useMemo, useCallback

## ✨ Cumplimiento de Criterios

| Criterio | Puntos | Estado |
|----------|--------|--------|
| FlatList con keyExtractor por ID | 5 pts | ✅ |
| TextInput con búsqueda funcional | 5 pts | ✅ |
| useMemo para filtrado | 5 pts | ✅ |
| Componente ItemCard con 3+ campos | 5 pts | ✅ |
| Estado vacío personalizado | 3 pts | ✅ |
| KeyboardAvoidingView correcto | 3 pts | ✅ |
| Constantes de tema (COLORS, etc.) | 2 pts | ✅ |
| TypeScript sin any | 2 pts | ✅ |
| **Total** | **30 pts** | **✅** |

## 📸 Capturas de Pantalla

### Vista Principal
La pantalla muestra un header azul con el título "Call Center", seguido de un buscador en la parte superior. Los agentes se muestran en tarjetas con:
- Nombre en negrita
- Badge de estado coloreado (verde/ámbar/gris)
- Teléfono
- Número de llamadas gestionadas

### Vista de Búsqueda
Al escribir en el buscador, la lista se filtra automáticamente. Si no hay resultados, se muestra un mensaje personalizado: "Sin resultados - No se encontraron agentes que coincidan con..."

---

**Desarrollo realizado con estándares profesionales de React Native y TypeScript.**
