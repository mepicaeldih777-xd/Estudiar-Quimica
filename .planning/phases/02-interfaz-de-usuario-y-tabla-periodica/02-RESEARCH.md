# Phase Research: Phase 2 — Interfaz de Usuario y Tabla Periódica

## Research Theme: Visualización de Datos Químicos y Navegación Jerárquica Minimalista

### Objetivos
Investigar patrones para mostrar la Tabla Periódica y la navegación entre temas jerárquicos de forma limpia.

### Hallazgos Clave

#### 1. Visualización de la Tabla Periódica
- **Grid Layout:** CSS Grid es ideal para los 18 grupos y 7 periodos.
- **Micro-interacciones:** Hover para resaltar grupos del mismo bloque, click para abrir el "Tema" asociado.
- **Componentización:** Cada elemento químico es un componente que recibe datos (número atómico, símbolo, nombre, categoría).

#### 2. Navegación Jerárquica (Tree Navigation)
- **Breadcrumbs:** Indispensables para no perderse en la jerarquía química (ej: Raíz > Metales > Alcalinos).
- **Lista Anidada Lateral:** Una barra lateral permite saltar entre subtemas rápidamente.
- **Indicadores de Estado:** Usar bordes de colores o pequeños badges para indicar "Prioridad" (según adaptatividad).

#### 3. Estética Minimalista
- **Paleta:** Colores pastel para las categorías de elementos (metales, no metales, etc.).
- **Tipografía:** Inter o Roboto para claridad en datos numéricos.

### Conclusión para la Fase 2
- **Plan 01:** Layout principal y Breadcrumbs.
- **Plan 02:** Componente Tabla Periódica funcional.
- **Plan 03:** Integración con la API jerárquica de temas para navegación.
