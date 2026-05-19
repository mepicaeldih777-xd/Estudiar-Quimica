'use client'

import React, { useState, useEffect } from 'react'
import { ASSESSMENT_QUESTIONS } from '@/lib/assessment-data'
import { CheckCircle, ArrowRight, BrainCircuit, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { initUserProgressFromAssessment } from '@/lib/progress-api'

export const AssessmentFlow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(session.user)
            }
        })
    }, [supabase])

    const handleNext = async () => {
        let currentScore = score
        if (selectedOption === ASSESSMENT_QUESTIONS[currentIndex].correctAnswer) {
            currentScore += 1
            setScore(currentScore)
        }

        if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentIndex(i => i + 1)
            setSelectedOption(null)
        } else {
            const calculatedLevel = Math.max(1, currentScore) // 1-5
            
            // Guardar en cookies y localStorage para persistencia offline
            document.cookie = `quimica_nivel_base=${calculatedLevel}; path=/; max-age=31536000`
            localStorage.setItem('quimica_nivel_base', calculatedLevel.toString())

            // Si está autenticado, guardar en Supabase
            if (user) {
                try {
                    await initUserProgressFromAssessment(supabase, user.id, calculatedLevel)
                } catch (err) {
                    console.error('Error saving assessment to database:', err)
                }
            }

            setFinished(true)
        }
    }

    const reset = () => {
        setCurrentIndex(0)
        setScore(0)
        setFinished(false)
        setSelectedOption(null)
    }

    const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex]

    if (finished) {
        const level = Math.max(1, score) // El nivel es el score (0-5) mapeado a 1-5
        return (
            <div className="assessment-complete card" style={{ textAlign: 'center', padding: '4rem' }}>
                <BrainCircuit size={64} color="var(--accent)" style={{ margin: '0 auto 2rem' }} />
                <h1>Evaluación Finalizada</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Tu nivel de conocimiento químico actual es:
                </p>
                <div className="level-result-badge">
                    Nivel {level}
                </div>
                <p className="topic-description" style={{ margin: '1rem auto 3rem', maxWidth: '400px' }}>
                    Hemos ajustado la dificultad de tus actividades para que coincidan con tu progreso.
                    ¡Ya puedes empezar a estudiar!
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                        Empezar a Estudiar
                    </Link>
                    <button onClick={reset} className="btn-secondary" style={{ padding: '0.75rem 2rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>
                        <RotateCcw size={18} /> Reintentar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="assessment-quiz card" style={{ padding: '3rem' }}>
            <div className="quiz-progress" style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', height: '4px' }}>
                {ASSESSMENT_QUESTIONS.map((_, i) => (
                    <div key={i} style={{ flex: 1, background: i <= currentIndex ? 'var(--accent)' : 'var(--border)', borderRadius: '4px' }} />
                ))}
            </div>

            <span className="badge" style={{ marginBottom: '1rem' }}>Pregunta {currentIndex + 1} de {ASSESSMENT_QUESTIONS.length}</span>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>{currentQuestion.question}</h2>

            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {currentQuestion.options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`option-btn ${selectedOption === opt ? 'selected' : ''}`}
                        style={{
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: selectedOption === opt ? '2px solid var(--accent)' : '1px solid var(--border)',
                            background: selectedOption === opt ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: selectedOption === opt ? 'var(--accent)' : 'inherit',
                            fontWeight: selectedOption === opt ? 600 : 400,
                            transition: 'all 0.2s'
                        }}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        background: !selectedOption ? 'var(--border)' : 'var(--accent)',
                        color: '#fff',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        cursor: !selectedOption ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {currentIndex < ASSESSMENT_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    )
}
