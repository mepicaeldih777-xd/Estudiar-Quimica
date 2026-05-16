'use client'

import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/Navigation'
import { Target, ListTodo, Plus, Trash2 } from 'lucide-react'

// Interfaz para definir el tipo de Tarea (Tema)
interface Tarea {
    id: string
    texto: string
    completada: boolean
}

export default function RegistroTemasPage() {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [nuevaTarea, setNuevaTarea] = useState('')
    const [isLoaded, setIsLoaded] = useState(false) // Para evitar desajustes de hidratación en Next.js con localStorage

    // Cargar las tareas desde el localStorage cuando se monta el componente
    useEffect(() => {
        const tareasGuardadas = localStorage.getItem('registro_temas_quimica')
        if (tareasGuardadas) {
            setTareas(JSON.parse(tareasGuardadas))
        } else {
            // Valores por defecto para nuevos usuarios
            setTareas([
                { id: '1', texto: 'Aprender Configuración Electrónica', completada: false },
                { id: '2', texto: 'Comprender Electronegatividad', completada: true },
                { id: '3', texto: 'Practicar Balanceo Redox', completada: false }
            ])
        }
        setIsLoaded(true)
    }, [])

    // Guardar en localStorage cada vez que la lista cambia
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('registro_temas_quimica', JSON.stringify(tareas))
        }
    }, [tareas, isLoaded])

    const agregarTarea = () => {
        if (!nuevaTarea.trim()) return

        const tarea: Tarea = {
            id: crypto.randomUUID(),
            texto: nuevaTarea.trim(),
            completada: false
        }

        setTareas([tarea, ...tareas])
        setNuevaTarea('')
    }

    const alternarCompletada = (id: string) => {
        setTareas(tareas.map(t => 
            t.id === id ? { ...t, completada: !t.completada } : t
        ))
    }

    const eliminarTarea = (id: string) => {
        setTareas(tareas.filter(t => t.id !== id))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            agregarTarea()
        }
    }

    // Previene SSR mismatch al no renderizar la lista hasta que no se haya montado
    if (!isLoaded) return null

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
                                            onChange={() => alternarCompletada(tarea.id)}
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
                </div>
            </div>
        </div>
    )
}
