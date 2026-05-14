# Phase Research: Phase 3 — Motor de Actividades y Balanceo

## Research Theme: Algoritmos de Balanceo Químico y Generación Adaptativa

### Objetivos
Investigar la mejor forma de representar ecuaciones químicas y validar el balanceo por el estudiante.

### Hallazgos Clave

#### 1. Representación de Ecuaciones
- **Formato JSON:** Reactivos y Productos. 
  Ej: `H2 + O2 -> H2O` 
  Se representa como un array de compuestos con coeficientes variables.
- **Validación:** Comparar el conteo de átomos de cada elemento en ambos lados.
  `Reactivos: H: 2, O: 2` vs `Productos: H: 2, O: 1` (Desbalanceada).

#### 2. Lógica del Juego de Balanceo
- El componente muestra la ecuación con "Inputs" para los coeficientes.
- El estudiante ingresa números y el sistema recalcula en tiempo real los totales de átomos.
- Éxito si `Total_Reactivos[Elemento] == Total_Productos[Elemento]` para todos los elementos.

#### 3. Niveles de Dificultad (1-5)
- **Nivel 1:** Ecuaciones simples (ej: síntesis de agua).
- **Nivel 2:** Ecuaciones con 3 compuestos.
- **Nivel 3:** Ecuaciones con 4+ compuestos y coeficientes mayores.
- **Nivel 4:** Ecuaciones redox básicas.
- **Nivel 5:** Ecuaciones complejas con poliatómicos.

#### 4. Prueba Inicial de Conocimiento
- Un set de 5-10 preguntas rápidas para determinar el nivel inicial (FR1).
- Basado en reconocimiento de símbolos y balanceos muy simples.

### Conclusión para la Fase 3
- **Plan 01:** Motor de validación de balanceo atómico (Lógica de servidor/librería).
- **Plan 02:** Componente de Juego de Balanceo (UI interactiva).
- **Plan 03:** Generación de actividades adaptativas desde la tabla `actividades`.
- **Plan 04:** Prueba de evaluación inicial.
