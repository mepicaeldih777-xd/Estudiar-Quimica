import { AtomCount, Compound, Equation, BalanceResult } from './types/chemistry'

/**
 * Parsea una fórmula química sencilla a un mapa de átomos.
 * Ej: H2O -> { H: 2, O: 1 }
 */
export function parseFormula(formula: string): AtomCount {
    const result: AtomCount = {}
    const regex = /([A-Z][a-z]?)(\d*)/g
    let match

    while ((match = regex.exec(formula)) !== null) {
        const symbol = match[1]
        const count = match[2] ? parseInt(match[2]) : 1
        result[symbol] = (result[symbol] || 0) + count
    }

    return result
}

/**
 * Calcula el total de átomos de un lado de la ecuación (reactivos o productos).
 */
export function calculateSideTotals(compounds: Compound[]): AtomCount {
    const totals: AtomCount = {}

    compounds.forEach((comp) => {
        const atomsInFormula = parseFormula(comp.formula)
        Object.entries(atomsInFormula).forEach(([symbol, count]) => {
            totals[symbol] = (totals[symbol] || 0) + count * comp.coefficient
        })
    })

    return totals
}

/**
 * Evalúa si una ecuación química está balanceada.
 */
export function checkBalance(equation: Equation): BalanceResult {
    const reactantTotals = calculateSideTotals(equation.reactants)
    const productTotals = calculateSideTotals(equation.products)

    // Obtener todos los elementos únicos involucrados
    const elements = new Set([...Object.keys(reactantTotals), ...Object.keys(productTotals)])
    let balanced = true

    for (const element of elements) {
        if (reactantTotals[element] !== productTotals[element]) {
            balanced = false
            break
        }
    }

    return {
        balanced,
        counts: {
            reactants: reactantTotals,
            products: productTotals
        }
    }
}

/**
 * Factory para crear una Ecuación desde strings (facilita la creación de tests).
 */
export function createEquation(reactants: { formula: string, coeff: number }[], products: { formula: string, coeff: number }[]): Equation {
    return {
        reactants: reactants.map(r => ({ formula: r.formula, coefficient: r.coeff, atoms: parseFormula(r.formula) })),
        products: products.map(p => ({ formula: p.formula, coefficient: p.coeff, atoms: parseFormula(p.formula) }))
    }
}
