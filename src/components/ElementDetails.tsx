'use client'

import React from 'react'
import { X, Info } from 'lucide-react'
import { ElementData } from '@/lib/elements-data'

interface ElementDetailsProps {
    element: ElementData | null
    onClose: () => void
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onClose }) => {
    if (!element) return null

    return (
        <div className="element-details-overlay" onClick={onClose}>
            <div
                className="element-details-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="details-header">
                    <div className="atomic-number">{element.number}</div>
                    <div className="symbol-large">{element.symbol}</div>
                    <h2 className="element-name">{element.name}</h2>
                    <span className="badge">{element.category}</span>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <label>Masa Atómica</label>
                        <span>{element.mass} u</span>
                    </div>
                    <div className="detail-item">
                        <label>Grupo / Periodo</label>
                        <span>{element.group} / {element.period}</span>
                    </div>
                    {element.electronegativity && (
                        <div className="detail-item">
                            <label>Electronegatividad</label>
                            <span>{element.electronegativity}</span>
                        </div>
                    )}
                </div>

                <div className="details-description">
                    <Info size={16} />
                    <p>La información detallada sobre su configuración electrónica y valencia se ajustará según el nivel de adaptatividad del estudiante.</p>
                </div>
            </div>
        </div>
    )
}
