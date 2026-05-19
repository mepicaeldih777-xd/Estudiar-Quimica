'use client'

import React, { useState, useEffect } from 'react'
import { Activity } from '@/lib/activities-api'
import { CheckCircle2, XCircle, ArrowRight, Trophy, Sparkles, Award } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getUserProgressForTopic, saveUserProgressForTopic } from '@/lib/progress-api'

interface ActivityRunnerProps {
    activity: Activity
}

export const ActivityRunner: React.FC<ActivityRunnerProps> = ({ activity }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [currentLevel, setCurrentLevel] = useState<number>(1)
    const [levelUpOccurred, setLevelUpOccurred] = useState<boolean>(false)
    const [newLevel, setNewLevel] = useState<number>(1)
    
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                setUser(session.user)
                const lvl = await getUserProgressForTopic(supabase, session.user.id, activity.tema_id)
                setCurrentLevel(lvl)
            } else {
                // Usuario anónimo
                const cookieLevel = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('quimica_nivel_base='))
                    ?.split('=')[1]
                const lvl = cookieLevel ? parseInt(cookieLevel, 10) : 1
                setCurrentLevel(lvl)
            }
        })
    }, [supabase, activity.tema_id])

    const content = activity.contenido as {
        pregunta: string
        opciones: string[]
        respuesta_correcta: string
    }

    const { pregunta, opciones, respuesta_correcta } = content

    const isCorrect = selectedOption === respuesta_correcta

    const handleSubmit = async () => {
        if (!selectedOption) return
        setIsSubmitted(true)

        if (isCorrect) {
            // Lógica Adaptativa: Subir de nivel si completa una actividad de dificultad adecuada
            if (activity.nivel_dificultad >= currentLevel) {
                const nextLvl = Math.min(5, currentLevel + 1)
                if (nextLvl > currentLevel) {
                    setLevelUpOccurred(true)
                    setNewLevel(nextLvl)
                    
                    // Guardar progreso
                    if (user) {
                        await saveUserProgressForTopic(supabase, user.id, activity.tema_id, nextLvl)
                    } else {
                        document.cookie = `quimica_nivel_base=${nextLvl}; path=/; max-age=31536000`
                        localStorage.setItem('quimica_nivel_base', nextLvl.toString())
                    }
                }
            }
        }
    }

    const handleContinue = () => {
        router.push(`/topic/${activity.tema_id}`)
        router.refresh() // Actualizar el Server Component para recargar actividades del nuevo nivel
    }

    return (
        <div className="activity-runner-container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div>
                    <span className="badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{activity.tipo.toUpperCase()}</span>
                    <h1 style={{ margin: 0, fontSize: '1.75rem' }}>{activity.titulo}</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 'bold' }}>
                    <Trophy size={24} />
                    <span>{activity.puntos_recompensa} pts</span>
                </div>
            </header>

            {/* Content Area */}
            <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>{pregunta}</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {opciones.map((opcion, index) => {
                        const isSelected = selectedOption === opcion
                        
                        let optionStyle = {
                            padding: '1.25rem 1.5rem',
                            borderRadius: '12px',
                            border: '2px solid',
                            borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                            backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--bg-primary)',
                            cursor: isSubmitted ? 'default' : 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                            fontWeight: isSelected ? '600' : '400',
                            color: 'var(--text-primary)'
                        }

                        let feedbackIcon = null

                        if (isSubmitted) {
                            if (opcion === respuesta_correcta) {
                                optionStyle.borderColor = '#10b981'
                                optionStyle.backgroundColor = '#ecfdf5'
                                optionStyle.color = '#065f46'
                                feedbackIcon = <CheckCircle2 color="#10b981" />
                            } else if (isSelected) {
                                optionStyle.borderColor = '#ef4444'
                                optionStyle.backgroundColor = '#fef2f2'
                                optionStyle.color = '#991b1b'
                                feedbackIcon = <XCircle color="#ef4444" />
                            }
                        }

                        return (
                            <div 
                                key={index}
                                style={optionStyle}
                                onClick={() => !isSubmitted && setSelectedOption(opcion)}
                            >
                                <span style={{ fontSize: '1.125rem' }}>{opcion}</span>
                                {feedbackIcon}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Actions Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/topic/${activity.tema_id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
                    Salir al tema
                </Link>

                {!isSubmitted ? (
                    <button 
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: selectedOption ? 'var(--accent)' : 'var(--border)',
                            color: selectedOption ? 'white' : 'var(--text-secondary)',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            cursor: selectedOption ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s'
                        }}
                    >
                        Verificar Respuesta
                    </button>
                ) : (
                    <button 
                        onClick={handleContinue}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: isCorrect ? '#10b981' : 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            boxShadow: 'var(--shadow)'
                        }}
                    >
                        {isCorrect ? (
                            <>
                                <Sparkles size={20} />
                                <span>Continuar</span>
                            </>
                        ) : (
                            <>
                                <span>Intentar Otro Tema</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                )}
            </div>
            
            {/* Feedback Message */}
            {isSubmitted && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2',
                    border: `2px solid ${isCorrect ? '#22c55e' : '#f87171'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                }}>
                    <div style={{ marginTop: '0.25rem' }}>
                        {isCorrect ? <CheckCircle2 size={32} color="#16a34a" /> : <XCircle size={32} color="#dc2626" />}
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: isCorrect ? '#166534' : '#991b1b', fontSize: '1.25rem' }}>
                            {isCorrect ? '¡Excelente Trabajo!' : 'No exactamente...'}
                        </h4>
                        <p style={{ margin: 0, color: isCorrect ? '#15803d' : '#b91c1c' }}>
                            {isCorrect 
                                ? `Has ganado +${activity.puntos_recompensa} puntos de maestría. La respuesta correcta es "${respuesta_correcta}".`
                                : `La respuesta correcta es "${respuesta_correcta}". ¡Repasa la teoría e inténtalo de nuevo!`
                            }
                        </p>
                        {levelUpOccurred && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                backgroundColor: '#fef3c7',
                                border: '1px solid #f59e0b',
                                color: '#92400e',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}>
                                <Award size={20} color="#d97706" />
                                <span>¡Subiste de nivel! Tu nivel de maestría para este tema es ahora {newLevel}.</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
