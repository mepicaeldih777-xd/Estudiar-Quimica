'use client'

import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/Navigation'
import { Target, ListTodo, Plus, Trash2, LogIn, Sparkles, BookOpen, BrainCircuit, X, Check, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { generateStudyPlan, type StudyPlan } from '@/lib/plan-generator'

interface Tarea {
    id: string
    texto: string
    completada: boolean
}

export default function RegistroTemasPage() {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [nuevaTarea, setNuevaTarea] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    
    // Estados para el Plan de Estudio Generado
    const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null)
    const [activeTab, setActiveTab] = useState<'ruta' | 'teoria' | 'quiz'>('ruta')
    
    // Estados del Quiz Didáctico
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [quizScore, setQuizScore] = useState(0)
    const [quizFinished, setQuizFinished] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        // Listen to auth state changes in real time
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    setUser(session.user)
                    await fetchTareas(session.user.id)
                } else {
                    setUser(null)
                    setTareas([])
                    setIsLoaded(true)
                }
            }
        )

        // Also check immediately in case session already exists
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) setIsLoaded(true)
        })

        return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchTareas = async (userId: string) => {
        const { data, error } = await supabase
            .from('registro_temas')
            .select('*')
            .eq('user_id', userId)
            .order('creado_en', { ascending: false })
        
        if (error) {
            setErrorMsg('Error al cargar temas: ' + error.message)
        } else if (data) {
            setTareas(data as Tarea[])
        }
        setIsLoaded(true)
    }

    const agregarTarea = async () => {
        if (!nuevaTarea.trim() || !user) return

        const texto = nuevaTarea.trim()
        setNuevaTarea('')
        setErrorMsg(null)

        // Optimistic update
        const tempId = crypto.randomUUID()
        const nueva = { id: tempId, texto, completada: false }
        setTareas([nueva, ...tareas])

        const { data, error } = await supabase
            .from('registro_temas')
            .insert([{ user_id: user.id, texto, completada: false }])
            .select()

        if (error) {
            setErrorMsg('Error al añadir tema: ' + error.message)
            // Revert on error
            setTareas(tareas.filter(t => t.id !== tempId))
        } else if (data && data.length > 0) {
            // Update with real DB ID
            setTareas(prev => prev.map(t => t.id === tempId ? data[0] : t))
        }
    }

    const alternarCompletada = async (id: string, completadaActual: boolean) => {
        if (!user) return

        // Optimistic update
        setTareas(tareas.map(t => 
            t.id === id ? { ...t, completada: !completadaActual } : t
        ))

        const { error } = await supabase
            .from('registro_temas')
            .update({ completada: !completadaActual })
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) {
            // Revert on error
            setTareas(tareas.map(t => 
                t.id === id ? { ...t, completada: completadaActual } : t
            ))
        }
    }

    const eliminarTarea = async (id: string) => {
        if (!user) return
        
        const backup = [...tareas]
        // Optimistic update
        setTareas(tareas.filter(t => t.id !== id))

        // Si el plan seleccionado corresponde al tema eliminado, cerrarlo
        const deletedTask = backup.find(t => t.id === id)
        if (selectedPlan && deletedTask && selectedPlan.tema === deletedTask.texto) {
            setSelectedPlan(null)
        }

        const { error } = await supabase
            .from('registro_temas')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) {
            // Revert on error
            setTareas(backup)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            agregarTarea()
        }
    }

    // Generar el plan de estudio para un tema específico
    const handleGenerarPlan = (temaTexto: string) => {
        const plan = generateStudyPlan(temaTexto)
        setSelectedPlan(plan)
        setActiveTab('ruta')
        
        // Reiniciar estados del quiz
        setCurrentQuestionIdx(0)
        setSelectedOption(null)
        setIsCorrect(null)
        setQuizScore(0)
        setQuizFinished(false)
    }

    // Lógica para responder el quiz
    const handleSelectOption = (option: string) => {
        if (selectedOption !== null) return // Responder solo una vez por pregunta
        setSelectedOption(option)
        const correct = option === selectedPlan?.quiz[currentQuestionIdx].respuestaCorrecta
        setIsCorrect(correct)
        if (correct) {
            setQuizScore(prev => prev + 1)
        }
    }

    const handleNextQuestion = () => {
        setSelectedOption(null)
        setIsCorrect(null)
        if (selectedPlan && currentQuestionIdx + 1 < selectedPlan.quiz.length) {
            setCurrentQuestionIdx(prev => prev + 1)
        } else {
            setQuizFinished(true)
        }
    }

    if (!isLoaded) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>

    return (
        <div className="registro-temas-page" style={{ paddingBottom: '4rem' }}>
            <Breadcrumbs path={[{ id: 'registro-temas', name: 'Registro de Temas' }]} />

            <header className="page-header">
                <div className="page-title-container">
                    <Target size={48} color="var(--accent)" />
                    <h1 className="page-title">Registro de Temas a Estudiar</h1>
                </div>
                <p className="page-subtitle">
                    Organiza tus propios objetivos de aprendizaje. Aquí puedes registrar los temas
                    o conceptos específicos que necesitas dominar y generar planes de estudio didácticos.
                </p>
            </header>

            <div className={`registro-temas-layout ${selectedPlan ? 'split' : ''}`}>
                
                {/* Panel Izquierdo: Lista de Temas */}
                <div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <ListTodo size={24} color="var(--accent)" />
                            <h2 style={{ margin: 0 }}>Mis Objetivos</h2>
                        </div>

                        {errorMsg && (
                            <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {errorMsg}
                            </div>
                        )}

                        {!user ? (
                            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                                <LogIn size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ marginBottom: '1rem' }}>Inicia sesión para guardar tus temas</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    Necesitas acceder a tu cuenta para que tus objetivos se guarden de forma segura y puedas generar planes de estudio.
                                </p>
                                <Link 
                                    href="/login"
                                    style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: 'var(--accent)', color: 'white', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}
                                >
                                    Iniciar Sesión
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="input-group" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <input
                                        type="text"
                                        value={nuevaTarea}
                                        onChange={(e) => setNuevaTarea(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ej. Estudiar Estequiometría..."
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <button 
                                        className="btn" 
                                        onClick={agregarTarea}
                                        disabled={!nuevaTarea.trim()}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '1rem 1.5rem',
                                            background: !nuevaTarea.trim() ? 'var(--border)' : 'var(--accent)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            cursor: !nuevaTarea.trim() ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s'
                                        }}>
                                        <Plus size={20} />
                                        Añadir
                                    </button>
                                </div>

                                {tareas.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No tienes ningún objetivo registrado aún. ¡Añade tu primer tema para comenzar!
                                    </div>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {tareas.map(tarea => (
                                            <li 
                                                key={tarea.id} 
                                                className={`task-item ${tarea.completada ? 'completada' : ''}`}
                                                style={{
                                                    borderLeft: selectedPlan && selectedPlan.tema === tarea.texto ? '4px solid var(--accent)' : undefined
                                                }}
                                            >
                                                <label className="task-item-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={tarea.completada}
                                                        onChange={() => alternarCompletada(tarea.id, tarea.completada)}
                                                        className="task-item-checkbox"
                                                    />
                                                    <span className="task-item-text">
                                                        {tarea.texto}
                                                    </span>
                                                </label>
                                                
                                                <div className="task-item-actions">
                                                    <button
                                                        onClick={() => handleGenerarPlan(tarea.texto)}
                                                        className="task-study-btn"
                                                    >
                                                        <Sparkles size={14} />
                                                        Estudiar
                                                    </button>

                                                    <button 
                                                        onClick={() => eliminarTarea(tarea.id)}
                                                        className="task-delete-btn"
                                                        title="Eliminar objetivo"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Panel Derecho: Plan de Estudio e Interacciones */}
                {selectedPlan && (
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', animation: 'slideIn 0.3s ease-out' }}>
                        
                        {/* Cabecera del Plan */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <BrainCircuit size={28} color="var(--accent)" />
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedPlan.titulo}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tema: {selectedPlan.tema}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedPlan(null)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs Navegables */}
                        <div className="study-tabs-container">
                            <button
                                onClick={() => setActiveTab('ruta')}
                                className={`study-tab-btn ${activeTab === 'ruta' ? 'active' : ''}`}
                            >
                                🗺️ Ruta de Estudio
                            </button>
                            <button
                                onClick={() => setActiveTab('teoria')}
                                className={`study-tab-btn ${activeTab === 'teoria' ? 'active' : ''}`}
                            >
                                📖 Teoría Clave
                            </button>
                            <button
                                onClick={() => setActiveTab('quiz')}
                                className={`study-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                            >
                                🧠 Práctica Didáctica
                            </button>
                        </div>

                        {/* Contenedor dinámico según Tab */}
                        <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
                            
                            {/* Pestaña: Ruta de Estudio (Roadmap) */}
                            {activeTab === 'ruta' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1.75rem', top: '1rem', bottom: '1rem', width: '2px', background: 'var(--border)' }}></div>
                                    {selectedPlan.fases.map((fase, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
                                            <div style={{
                                                width: '1.75rem',
                                                height: '1.75rem',
                                                borderRadius: '50%',
                                                background: 'var(--accent)',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.85rem',
                                                boxShadow: '0 0 0 4px var(--card-bg)'
                                            }}>
                                                {idx + 1}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>{fase.titulo}</h4>
                                                <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{fase.descripcion}</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                                    {fase.material.map((mat, mIdx) => (
                                                        <span key={mIdx} style={{ fontSize: '0.75rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                                                            {mat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pestaña: Teoría */}
                            {activeTab === 'teoria' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Introducción</h4>
                                        <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                            {selectedPlan.teoria.introduccion}
                                        </p>
                                    </div>

                                    {selectedPlan.teoria.formulaDestacada && (
                                        <div style={{
                                            padding: '1.25rem',
                                            background: 'var(--bg-secondary)',
                                            borderLeft: '4px solid var(--accent)',
                                            borderRadius: '0 8px 8px 0',
                                            textAlign: 'center',
                                            margin: '0.5rem 0'
                                        }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Ecuación Clave</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0.25rem 0', fontFamily: 'monospace' }}>
                                                {selectedPlan.teoria.formulaDestacada.formula}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {selectedPlan.teoria.formulaDestacada.descripcion}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Conceptos Esenciales</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {selectedPlan.teoria.conceptos.map((conc, idx) => (
                                                <li key={idx} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                                    <strong style={{ color: 'var(--text-main)' }}>{conc.clave}:</strong> <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{conc.valor}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ padding: '1rem', background: 'rgba(52, 168, 83, 0.08)', border: '1px dashed rgba(52, 168, 83, 0.3)', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2e7d32', fontWeight: 600, marginBottom: '0.25rem' }}>
                                            <BookOpen size={16} />
                                            <span>Caso Práctico</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                            {selectedPlan.teoria.ejemplo}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pestaña: Quiz Didáctico */}
                            {activeTab === 'quiz' && (
                                <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                                    
                                    {!quizFinished ? (
                                        <div>
                                            {/* Progreso de preguntas */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                                <span>Pregunta {currentQuestionIdx + 1} de {selectedPlan.quiz.length}</span>
                                                <span>Puntaje: {quizScore} / {selectedPlan.quiz.length}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${((currentQuestionIdx) / selectedPlan.quiz.length) * 100}%`,
                                                    height: '100%',
                                                    background: 'var(--accent)',
                                                    transition: 'width 0.3s ease-in-out'
                                                }}></div>
                                            </div>

                                            {/* Pregunta */}
                                            <h4 style={{ fontSize: '1.1rem', margin: '0 0 1.25rem 0', color: 'var(--text-main)' }}>
                                                {selectedPlan.quiz[currentQuestionIdx].pregunta}
                                            </h4>

                                            {/* Opciones de respuesta */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {selectedPlan.quiz[currentQuestionIdx].opciones.map((option, oIdx) => {
                                                    const isSelected = selectedOption === option
                                                    const isCorrectAns = option === selectedPlan.quiz[currentQuestionIdx].respuestaCorrecta
                                                    
                                                    // Estilo adaptativo según respuesta
                                                    let bg = 'transparent'
                                                    let border = '1px solid var(--border)'
                                                    let text = 'var(--text-primary)'

                                                    if (selectedOption !== null) {
                                                        if (isCorrectAns) {
                                                            bg = 'rgba(76, 175, 80, 0.12)'
                                                            border = '1px solid #4caf50'
                                                            text = '#2e7d32'
                                                        } else if (isSelected) {
                                                            bg = 'rgba(244, 67, 54, 0.12)'
                                                            border = '1px solid #f44336'
                                                            text = '#c62828'
                                                        }
                                                    } else {
                                                        // Hover state handled in inline hover styles logic if desired
                                                    }

                                                    return (
                                                        <button
                                                            key={oIdx}
                                                            onClick={() => handleSelectOption(option)}
                                                            disabled={selectedOption !== null}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1rem',
                                                                borderRadius: '8px',
                                                                background: bg,
                                                                border: border,
                                                                color: text,
                                                                textAlign: 'left',
                                                                fontSize: '0.95rem',
                                                                fontWeight: isSelected ? 'bold' : 'normal',
                                                                cursor: selectedOption !== null ? 'default' : 'pointer',
                                                                transition: 'all 0.2s',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <span>{option}</span>
                                                            {selectedOption !== null && isCorrectAns && (
                                                                <Check size={18} color="#4caf50" />
                                                            )}
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            {/* Retroalimentación explícita */}
                                            {selectedOption !== null && (
                                                <div style={{
                                                    marginTop: '1.5rem',
                                                    padding: '1rem',
                                                    background: 'var(--bg-secondary)',
                                                    borderRadius: '8px',
                                                    border: '1px solid var(--border)',
                                                    animation: 'fadeIn 0.2s ease-in'
                                                }}>
                                                    <span style={{
                                                        display: 'block',
                                                        fontWeight: 700,
                                                        color: isCorrect ? '#2e7d32' : '#c62828',
                                                        marginBottom: '0.25rem'
                                                    }}>
                                                        {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
                                                    </span>
                                                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                        {selectedPlan.quiz[currentQuestionIdx].explicacion}
                                                    </p>
                                                    <button
                                                        onClick={handleNextQuestion}
                                                        style={{
                                                            marginTop: '1rem',
                                                            padding: '0.6rem 1.25rem',
                                                            background: 'var(--accent)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem',
                                                            width: '100%',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {currentQuestionIdx + 1 < selectedPlan.quiz.length ? 'Siguiente Pregunta' : 'Finalizar Actividad'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        /* Pantalla de Fin de Quiz */
                                        <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                                            <div style={{
                                                width: '5rem',
                                                height: '5rem',
                                                borderRadius: '50%',
                                                background: 'rgba(255, 193, 7, 0.15)',
                                                color: '#ffc107',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '0.5rem',
                                                boxShadow: '0 4px 20px rgba(255, 193, 7, 0.2)'
                                            }}>
                                                <Award size={48} />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: '0 0 0.5rem 0' }}>¡Actividad Completada!</h3>
                                                <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
                                                    Has demostrado gran dedicación en el tema de **{selectedPlan.tema}**.
                                                </p>
                                                <div style={{ fontSize: '1.125rem', color: 'var(--text-main)', fontWeight: 700 }}>
                                                    Tu resultado: {quizScore} de {selectedPlan.quiz.length} correctas ({Math.round((quizScore / selectedPlan.quiz.length) * 100)}%)
                                                </div>
                                            </div>

                                            <div style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border)',
                                                padding: '1rem 1.5rem',
                                                borderRadius: '8px',
                                                width: '100%',
                                                maxWidth: '300px'
                                            }}>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Recompensa de Estudio</span>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', display: 'block', marginTop: '0.25rem' }}>
                                                    +{quizScore * 25} Puntos XP
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    // Reiniciar el quiz
                                                    setCurrentQuestionIdx(0)
                                                    setSelectedOption(null)
                                                    setIsCorrect(null)
                                                    setQuizScore(0)
                                                    setQuizFinished(false)
                                                }}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'transparent',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '8px',
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    transition: 'all 0.2s',
                                                    width: '100%',
                                                    maxWidth: '300px'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                Volver a intentar
                                            </button>
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>

                    </div>
                )}

            </div>
            
            {/* Animación local en CSS en línea */}
            <style jsx global>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}
