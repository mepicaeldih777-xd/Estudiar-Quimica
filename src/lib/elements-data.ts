export interface ElementData {
    number: number
    symbol: string
    name: string
    mass: number
    category: string
    group: number
    period: number
    electronegativity?: number
}

export const ELEMENTS: ElementData[] = [
    { number: 1, symbol: 'H', name: 'Hidrógeno', mass: 1.008, category: 'No Metal', group: 1, period: 1, electronegativity: 2.2 },
    { number: 2, symbol: 'He', name: 'Helio', mass: 4.002, category: 'Gas Noble', group: 18, period: 1 },
    { number: 3, symbol: 'Li', name: 'Litio', mass: 6.94, category: 'Metal Alcalino', group: 1, period: 2, electronegativity: 0.98 },
    { number: 4, symbol: 'Be', name: 'Berilio', mass: 9.012, category: 'Metal Alcalinotérreo', group: 2, period: 2, electronegativity: 1.57 },
    { number: 5, symbol: 'B', name: 'Boro', mass: 10.81, category: 'Metaloide', group: 13, period: 2, electronegativity: 2.04 },
    { number: 6, symbol: 'C', name: 'Carbono', mass: 12.011, category: 'No Metal', group: 14, period: 2, electronegativity: 2.55 },
    { number: 7, symbol: 'N', name: 'Nitrógeno', mass: 14.007, category: 'No Metal', group: 15, period: 2, electronegativity: 3.04 },
    { number: 8, symbol: 'O', name: 'Oxígeno', mass: 15.999, category: 'No Metal', group: 16, period: 2, electronegativity: 3.44 },
    { number: 9, symbol: 'F', name: 'Flúor', mass: 18.998, category: 'Halógeno', group: 17, period: 2, electronegativity: 3.98 },
    { number: 10, symbol: 'Ne', name: 'Neón', mass: 20.18, category: 'Gas Noble', group: 18, period: 2 },
    { number: 11, symbol: 'Na', name: 'Sodio', mass: 22.99, category: 'Metal Alcalino', group: 1, period: 3, electronegativity: 0.93 },
    { number: 12, symbol: 'Mg', name: 'Magnesio', mass: 24.305, category: 'Metal Alcalinotérreo', group: 2, period: 3, electronegativity: 1.31 },
    { number: 13, symbol: 'Al', name: 'Aluminio', mass: 26.982, category: 'Metal Pobre', group: 13, period: 3, electronegativity: 1.61 },
    { number: 14, symbol: 'Si', name: 'Silicio', mass: 28.085, category: 'Metaloide', group: 14, period: 3, electronegativity: 1.9 },
    { number: 15, symbol: 'P', name: 'Fósforo', mass: 30.974, category: 'No Metal', group: 15, period: 3, electronegativity: 2.19 },
    { number: 16, symbol: 'S', name: 'Azufre', mass: 32.06, category: 'No Metal', group: 16, period: 3, electronegativity: 2.58 },
    { number: 17, symbol: 'Cl', name: 'Cloro', mass: 35.45, category: 'Halógeno', group: 17, period: 3, electronegativity: 3.16 },
    { number: 18, symbol: 'Ar', name: 'Argón', mass: 39.948, category: 'Gas Noble', group: 18, period: 3 },
    { number: 19, symbol: 'K', name: 'Potasio', mass: 39.098, category: 'Metal Alcalino', group: 1, period: 4, electronegativity: 0.82 },
    { number: 20, symbol: 'Ca', name: 'Calcio', mass: 40.078, category: 'Metal Alcalinotérreo', group: 2, period: 4, electronegativity: 1.0 },
    { number: 26, symbol: 'Fe', name: 'Hierro', mass: 55.845, category: 'Metal de Transición', group: 8, period: 4, electronegativity: 1.83 },
    { number: 29, symbol: 'Cu', name: 'Cobre', mass: 63.546, category: 'Metal de Transición', group: 11, period: 4, electronegativity: 1.9 },
    { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'Metal de Transición', group: 12, period: 4, electronegativity: 1.65 },
    { number: 35, symbol: 'Br', name: 'Bromo', mass: 79.904, category: 'Halógeno', group: 17, period: 4, electronegativity: 2.96 },
    { number: 36, symbol: 'Kr', name: 'Kriptón', mass: 83.798, category: 'Gas Noble', group: 18, period: 4 },
]
