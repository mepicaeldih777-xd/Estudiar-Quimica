# Phase Research: Phase 1 — Cimiento de Datos y Estructura

## Research Theme: Bases de Datos para Sistemas Educativos Adaptativos y Jerárquicos

### Objetivos
Investigar la mejor implementación para la estructura recursiva de `temas` y la gestión de la adaptatividad en la tabla `actividades`.

### Hallazgos Clave

#### 1. Estructura Jerárquica (Recursión)
Para el tipo de jerarquía que el usuario solicita ("varios niveles"), la mejor práctica es utilizar una relación de auto-referencia (`parent_id`).
- **Opción A (Relaciones Adyacentes):** Usar `parent_id`. Es simple para insertar y mover ramas. Adecuado para un número moderado de temas.
- **Opción B (Ltree/Path):** Usar una cadena que represente la ruta (ej: "1.2.3"). Mucho más rápido para consultas profundas ("trae todos los descendientes de X").
- **Decisión:** Empezar con `parent_id` por simplicidad dado que es un proyecto personal inicial, pero preparar el sistema para consultas recursivas (CTE en PostgreSQL/Supabase).

#### 2. Datos Semilla (Tabla Periódica)
La Tabla Periódica se divide jerárquicamente en:
- Bloques (s, p, d, f)
- Grupos (columnas) y Periodos (filas)
- Categorías (Metales, No Metales, etc.)
- Elementos (Nivel hoja)

#### 3. Adaptatividad de Actividades
La tabla `actividades` debe permitir filtrado rápido por nivel de dificultad. Se recomienda:
- Columnas de metadatos JSON para flexibilidad constructivista.
- `nivel_dificultad` (1-5) para ajustes rápidos sin cambiar el tipo de actividad.

#### 4. Stack Recomendado (Basado en la visión GSD)
- **Frontend:** Next.js / Vite + React (para PWA).
- **Styling:** CSS Puro / Tailwind (según usuario, preferimos CSS Puro rico).
- **Backend/DB:** Supabase (PostgreSQL para recursión nativa).
- **Iconos:** Lucide-React.

### Conclusión para la Fase 1
- **Paso 1:** Crear el proyecto básico de frontend.
- **Paso 2:** Definir el esquema SQL exacto para Supabase.
- **Paso 3:** Implementar un script de "Seeding" que cargue la jerarquía inicial:
    - Raíz: Tabla Periódica
        - Grupos (18 subtemas)
            - Elementos (Subtemas de hoja)
