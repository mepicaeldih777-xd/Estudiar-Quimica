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
        <div className="periodic-table-wrapper">
            <div className="periodic-table">
                {ELEMENTS.map((element) => (
                    <ElementTile
                        key={element.number}
                        element={element}
                        onClick={() => handleElementClick(element)}
                    />
                ))}
                {/* Placeholder tiles for empty space if needed? 
            Standard periodic table grid is 18 columns, 7 rows.
            We use element.group and element.period for positioning.
        */}
            </div>

            <ElementDetails element={selectedElement} onClose={handleClose} />
        </div>
    )
}

const ElementTile: React.FC<{ element: ElementData; onClick: () => void }> = ({
    element, onClick
}) => {
    const categoryClass = element.category.toLowerCase().replace(/\s/g, '-')

    return (
        <div
            className={`element-tile category-${categoryClass}`}
            onClick={onClick}
            style={{
                gridColumn: element.group,
                gridRow: element.period
            }}
        >
            <div className="element-number">{element.number}</div>
            <div className="element-symbol">{element.symbol}</div>
            <div className="element-name">{element.name}</div>
        </div>
    )
}
