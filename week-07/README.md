# Semana 07 - Persistencia Local

## Dominio implementado
Aplicación para gestionar seguimientos de un centro de call center. La app permite ver agentes, clientes y campañas, guardar preferencias locales y almacenar un código de acceso de forma segura.

## Implementación
- MMKV: se guardan preferencias de orden, modo compacto y cantidad de elementos por página.
- AsyncStorage: se guarda el listado de ítems en caché para mostrar datos cuando no hay red.
- Expo SecureStore: se almacena un código de acceso sensible de forma segura.

## Estructura
- Pantalla Home: lista de seguimientos con ordenamiento y banner offline.
- Pantalla Create: registro de nuevos seguimientos.
- Pantalla Settings: ajustes de preferencia y almacenamiento seguro.
