'use client'

import React from 'react'
import { X, Info, Sparkles } from 'lucide-react'
import { ElementData } from '@/lib/elements-data'

interface ElementDetailsProps {
    element: ElementData | null
    onClose: () => void
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onClose }) => {
    if (!element) return null

    // Usar grupo y periodo científicos reales si están definidos (para Lantánidos y Actínidos)
    const displayPeriod = element.realPeriod !== undefined ? element.realPeriod : element.period
    const displayGroup = element.realGroup !== undefined ? element.realGroup : element.group.toString()

    return (
        <div className="element-details-overlay" onClick={onClose}>
            <div
                className="element-details-card"
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '2rem' }}
            >
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="details-header">
                    <div className="atomic-number">{element.number}</div>
                    <div className="symbol-large">{element.symbol}</div>
                    <h2 className="element-name" style={{ fontSize: '2rem', margin: '0.5rem 0 0.25rem 0' }}>{element.name}</h2>
                    <span className="badge">{element.category}</span>
                </div>

                <div className="details-grid" style={{ marginBottom: '1.25rem', gap: '1rem', padding: '1rem' }}>
                    <div className="detail-item">
                        <label>Masa Atómica</label>
                        <span>{element.mass} u</span>
                    </div>
                    <div className="detail-item">
                        <label>Grupo / Periodo</label>
                        <span>{displayGroup} / {displayPeriod}</span>
                    </div>
                    {element.electronegativity !== undefined && (
                        <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                            <label>Electronegatividad (Pauling)</label>
                            <span>{element.electronegativity}</span>
                        </div>
                    )}
                </div>

                {/* Explicación / Descripción Educativa */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    background: 'var(--accent-soft)',
                    border: '1px solid var(--border)',
                    padding: '1rem',
                    borderRadius: '12px',
                    color: 'var(--accent)',
                    fontSize: '0.925rem',
                    lineHeight: '1.5',
                    textAlign: 'left',
                    marginBottom: '1rem'
                }}>
                    <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, color: 'var(--text-primary)' }}>{element.description}</p>
                </div>

                {/* Dato Curioso Destacado */}
                {element.curiosity && (
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        background: '#fffbeb',
                        border: '1px solid #fef3c7',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '0.925rem',
                        lineHeight: '1.5',
                        textAlign: 'left'
                    }}>
                        <Sparkles size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#d97706' }} />
                        <div>
                            <strong style={{ display: 'block', color: '#92400e', marginBottom: '0.25rem' }}>Dato Curioso</strong>
                            <p style={{ margin: 0, color: '#78350f' }}>{element.curiosity}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
