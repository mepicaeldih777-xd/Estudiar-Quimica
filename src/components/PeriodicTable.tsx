'use client'

import React, { useState } from 'react'
import { ELEMENTS, ElementData } from '@/lib/elements-data'
import { ElementDetails } from './ElementDetails'

export const PeriodicTable: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<ElementData | null>(null)

    const handleElementClick = (element: ElementData) => {
        setSelectedElement(element)
    }

    const handleClose = () => {
        setSelectedElement(null)
    }

    return (
        <div className="periodic-table-wrapper" style={{ padding: '1rem 0' }}>
            <div 
                className="periodic-table"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(18, 1fr)',
                    gridTemplateRows: 'repeat(7, minmax(80px, auto)) 20px repeat(2, minmax(80px, auto))',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    paddingBottom: '2rem'
                }}
            >
                {ELEMENTS.map((element) => (
                    <ElementTile
                        key={element.number}
                        element={element}
                        onClick={() => handleElementClick(element)}
                    />
                ))}
            </div>

            <ElementDetails element={selectedElement} onClose={handleClose} />
        </div>
    )
}

const categoryStyles: { [key: string]: { bg: string; border: string; color: string } } = {
    'No Metal': { bg: '#ecfdf5', border: '#d1fae5', color: '#065f46' },
    'Gas Noble': { bg: '#f5f3ff', border: '#ede9fe', color: '#5b21b6' },
    'Metal Alcalino': { bg: '#fffbeb', border: '#fef3c7', color: '#92400e' },
    'Metal Alcalinotérreo': { bg: '#fff7ed', border: '#ffedd5', color: '#9a3412' },
    'Metaloide': { bg: '#f0fdfa', border: '#ccfbf1', color: '#134e4a' },
    'Halógeno': { bg: '#fff7ed', border: '#ffedd5', color: '#c2410c' },
    'Metal Pobre': { bg: '#f1f5f9', border: '#e2e8f0', color: '#334155' },
    'Metal de Transición': { bg: '#fff1f2', border: '#ffe4e6', color: '#9f1239' },
    'Lantánido': { bg: '#fdf2f8', border: '#fce7f3', color: '#9d174d' },
    'Actínido': { bg: '#faf5ff', border: '#f3e8ff', color: '#6b21a8' }
}

const ElementTile: React.FC<{ element: ElementData; onClick: () => void }> = ({
    element, onClick
}) => {
    const styles = categoryStyles[element.category] || { bg: '#ffffff', border: '#e2e8f0', color: '#334155' }

    return (
        <div
            className="element-tile"
            onClick={onClick}
            style={{
                gridColumn: element.group,
                gridRow: element.period,
                backgroundColor: styles.bg,
                borderColor: styles.border,
                color: styles.color,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            <div className="element-number" style={{ color: styles.color, opacity: 0.8 }}>{element.number}</div>
            <div className="element-symbol" style={{ color: styles.color }}>{element.symbol}</div>
            <div className="element-name" style={{ color: styles.color, opacity: 0.9 }}>{element.name}</div>
        </div>
    )
}
