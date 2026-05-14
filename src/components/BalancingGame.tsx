'use client'

import React, { useState, useEffect } from 'react'
import { Equation, BalanceResult } from '@/lib/types/chemistry'
import { checkBalance } from '@/lib/balancing-engine'
import { Plus, Minus, CheckCircle2, AlertCircle } from 'lucide-react'

interface BalancingGameProps {
    initialEquation: Equation
    onBalanced?: () => void
}

export const BalancingGame: React.FC<BalancingGameProps> = ({ initialEquation, onBalanced }) => {
    const [equation, setEquation] = useState<Equation>(initialEquation)
    const [result, setResult] = useState<BalanceResult>(checkBalance(initialEquation))

    useEffect(() => {
        const newResult = checkBalance(equation)
        setResult(newResult)
        if (newResult.balanced && onBalanced) {
            onBalanced()
        }
    }, [equation, onBalanced])

    const updateCoefficient = (side: 'reactants' | 'products', index: number, delta: number) => {
        setEquation(prev => {
            const next = { ...prev }
            const sideArr = [...next[side]]
            const currentVal = sideArr[index].coefficient
            sideArr[index] = { ...sideArr[index], coefficient: Math.max(1, currentVal + delta) }
            next[side] = sideArr
            return next
        })
    }

    const elements = Array.from(new Set([...Object.keys(result.counts.reactants), ...Object.keys(result.counts.products)]))

    return (
        <div className="balancing-game card">
            <div className="equation-display">
                <div className="reaction-side">
                    {equation.reactants.map((comp, i) => (
                        <React.Fragment key={`r-${i}`}>
                            <CoefficientControl
                                value={comp.coefficient}
                                onChange={(d) => updateCoefficient('reactants', i, d)}
                            />
                            <span className="formula text-xl font-bold">{formatFormula(comp.formula)}</span>
                            {i < equation.reactants.length - 1 && <span className="plus">+</span>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="arrow">➔</div>

                <div className="reaction-side">
                    {equation.products.map((comp, i) => (
                        <React.Fragment key={`p-${i}`}>
                            <CoefficientControl
                                value={comp.coefficient}
                                onChange={(d) => updateCoefficient('products', i, d)}
                            />
                            <span className="formula text-xl font-bold">{formatFormula(comp.formula)}</span>
                            {i < equation.products.length - 1 && <span className="plus">+</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="status-board">
                <div className="comparison-table">
                    <h3>Balance de Átomos</h3>
                    <div className="atom-grid">
                        {elements.map(el => {
                            const rCount = result.counts.reactants[el] || 0
                            const pCount = result.counts.products[el] || 0
                            const match = rCount === pCount
                            return (
                                <div key={el} className={`atom-row ${match ? 'match' : 'mismatch'}`}>
                                    <span className="symbol">{el}</span>
                                    <div className="counts">
                                        <span>{rCount}</span>
                                        <span className="divider">/</span>
                                        <span>{pCount}</span>
                                    </div>
                                    {match ? <CheckCircle2 size={16} className="status-icon" /> : <AlertCircle size={16} className="status-icon" />}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {result.balanced && (
                    <div className="success-message animation-bounce">
                        <CheckCircle2 size={48} color="#10b981" />
                        <h2 style={{ color: '#065f46' }}>¡Ecuación Balanceada!</h2>
                        <p className="badge">Ganaste 25 puntos de recompensa</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const CoefficientControl: React.FC<{ value: number, onChange: (d: number) => void }> = ({ value, onChange }) => (
    <div className="coefficient-box">
        <button onClick={() => onChange(-1)} disabled={value <= 1}><Minus size={14} /></button>
        <span className="value">{value}</span>
        <button onClick={() => onChange(1)}><Plus size={14} /></button>
    </div>
)

function formatFormula(formula: string) {
    // Convierte H2O en H₂O (no implementado complejo para simplicidad en JSX)
    // Pero devolveremos el string con spans de subíndice si fuera necesario.
    return formula.split(/(\d+)/).map((part, i) =>
        /\d+/.test(part) ? <sub key={i}>{part}</sub> : part
    )
}
