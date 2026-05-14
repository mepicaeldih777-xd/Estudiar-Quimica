export interface AtomCount {
    [symbol: string]: number
}

export interface Compound {
    formula: string
    atoms: AtomCount
    coefficient: number
}

export interface Equation {
    reactants: Compound[]
    products: Compound[]
}

export interface BalanceResult {
    balanced: boolean
    counts: {
        reactants: AtomCount
        products: AtomCount
    }
}
