# Roadmap: App Química Adaptativa

## Overview
Esta hoja de ruta detalla el desarrollo de una aplicación educativa para el estudio de la Tabla Periódica y el Balanceo Químico, utilizando un enfoque constructivista y adaptativo.

## Milestones

- 🚧 **v1.0 Cimiento de Datos y Estructura** - Fase 1 (En curso)
- 📋 **v1.1 Interfaz y Funcionalidad Core** - Fases 2-3 (Planeado)
- 📋 **v1.2 Adaptatividad y Gamificación** - Fases 4-5 (Planeado)

## Phases

### 🚧 v1.0 Cimiento de Datos y Estructura (En curso)

**Milestone Goal:** Configurar el esquema de base de datos y la visualización jerárquica inicial de temas.

#### Phase 1: Cimiento de Datos y Estructura
**Goal**: Establecer las tablas base (`temas` y `actividades`) y la lógica jerárquica para el contenido de química.
**Depends on**: Nothing
**Requirements**: [FR3, NFR1]
**Success Criteria**:
  1. Las tablas `temas` y `actividades` existen en el backend.
  2. Es posible crear un tema hijo asociado a un tema padre (jerarquía).
  3. Se pueden consultar los temas en una estructura de árbol.
  4. Datos semilla de la tabla periódica básica están cargados.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Configuración de la Base de Datos (Tablas y Relaciones).
- [ ] 01-02: Implementación de la Lógica Jerárquica e Inserción de Semillas.
- [ ] 01-03: Desarrollo de la API/Función básica de consulta jerárquica.

### 📋 v1.1 Interfaz y Funcionalidad Core (Planeado)

#### Phase 2: Interfaz de Usuario y Tabla Periódica
**Goal**: Visualización e interacción con los elementos químicos.
**Depends on**: Phase 1
**Requirements**: [FR5, NFR1]
**Success Criteria**:
  1. Tabla Periódica visualizada en el front-end con diseño minimalista.
  2. Selección de elementos muestra información básica.

#### Phase 3: Motor de Actividades y Balanceo
**Goal**: Lógica de ejercicios de química.
**Depends on**: Phase 2
**Requirements**: [FR2, FR4]
**Success Criteria**:
  1. Los usuarios pueden realizar ejercicios de balanceo.
  2. Los puntos se calculan correctamente.

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Cimiento de Datos | 3/3 | Complete   | 2026-03-03 | - |
| 2. Interfaz UI | 3/3 | Complete   | 2026-03-03 | - |
| 3. Motor Actividades | 4/4 | Complete   | 2026-03-03 | - |
| 4. Adaptatividad | v1.2 | 0/2 | Not started | - |
| 5. Pulido y PWA | v1.2 | 0/1 | Not started | - |
