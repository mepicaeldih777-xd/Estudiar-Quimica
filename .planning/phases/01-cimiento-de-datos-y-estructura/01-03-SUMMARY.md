# Summary: Phase 1 Plan 3

## Objective
Implementar la API (función helper) para consultar temas en formato jerárquico.

## Tasks Completed
- [x] Crear `src/lib/topics-api.ts`.
- [x] Implementar interfaz de TypeScript para `Topic`.
- [x] Crear función `getTopicsAsTree` que consume Supabase y reconstruye el árbol en memoria.

## Outputs
- `src/lib/topics-api.ts`: Helper de datos que centraliza la lógica de jerarquía.

## Verification Results
- `tsc --noEmit`: Excluyendo dependencias no instaladas, la lógica de tipos es correcta.
- Lógica de Árbol: Maneja correctamente temas sin padre como raíces y subtemas anidados.
