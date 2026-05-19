'use client'

import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/Navigation'
import { Target, ListTodo, Plus, Trash2, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

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

    if (!isLoaded) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>

    return (
        <div className="registro-temas-page">
            <Breadcrumbs path={[{ id: 'registro-temas', name: 'Registro de Temas' }]} />

            <header className="page-header">
                <div className="page-title-container">
                    <Target size={48} color="var(--accent)" />
                    <h1 className="page-title">Registro de Temas a Estudiar</h1>
                </div>
                <p className="page-subtitle">
                    Organiza tus propios objetivos de aprendizaje. Aquí puedes registrar los temas
                    o conceptos específicos que necesitas dominar.
                </p>
            </header>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
                                Necesitas acceder a tu cuenta para que tus objetivos se guarden de forma segura en la base de datos.
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
                            <div className="input-group">
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
                                    No tienes ningún objetivo registrado aún. ¡Añade tu primer tema para estudiar!
                                </div>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {tareas.map(tarea => (
                                        <li key={tarea.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            background: tarea.completada ? 'var(--bg-secondary)' : 'transparent',
                                            opacity: tarea.completada ? 0.7 : 1,
                                            transition: 'all 0.2s'
                                        }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', flex: 1 }}>
                                                <input
                                                    type="checkbox"
                                                    checked={tarea.completada}
                                                    onChange={() => alternarCompletada(tarea.id, tarea.completada)}
                                                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--accent)' }}
                                                />
                                                <span style={{
                                                    fontSize: '1.125rem',
                                                    textDecoration: tarea.completada ? 'line-through' : 'none',
                                                    color: tarea.completada ? 'var(--text-secondary)' : 'var(--text-main)'
                                                }}>
                                                    {tarea.texto}
                                                </span>
                                            </label>
                                            <button 
                                                onClick={() => eliminarTarea(tarea.id)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: 'var(--text-secondary)',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                title="Eliminar objetivo"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
