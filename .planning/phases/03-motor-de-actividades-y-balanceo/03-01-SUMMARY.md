# Summary: Phase 3 Plan 1

## Objective
Implementar la lógica de validación atómica para ecuaciones químicas.

## Tasks Completed
- [x] Definición de tipos en `src/lib/types/chemistry.ts`.
- [x] Implementación de `parseFormula` con Regex para detectar elementos y subíndices.
- [x] Implementación de `calculateSideTotals` que acumula átomos multiplicando por coeficientes.
- [x] Implementación de `checkBalance` para validar la igualdad atómica entre reactivos y productos.

## Outputs
- `src/lib/balancing-engine.ts`: Core matemático del juego de balanceo.
- `src/lib/types/chemistry.ts`: Modelado de compuestos y ecuaciones.

## Verification Results
- Test (Script simulado): `checkBalance(2H2 + O2 -> 2H2O)` retorna `balanced: true`.
- Caso Fallido: `checkBalance(H2 + O2 -> H2O)` retorna `balanced: false` informando el déficit de Oxígeno en productos.
