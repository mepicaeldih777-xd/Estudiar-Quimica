import { Breadcrumbs } from '@/components/Navigation'
import { getTopicById, getTopicPath } from '@/lib/topics-api'
import { getActivitiesByTopic } from '@/lib/activities-api'
import { ActivityCard } from '@/components/ActivityCard'
import { notFound } from 'next/navigation'
import { Sparkles, ArrowLeft, Target } from 'lucide-react'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'
import { getUserProgressForTopic } from '@/lib/progress-api'
import { cookies } from 'next/headers'

export default async function TopicPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const topic = await getTopicById(id)
    const path = await getTopicPath(id)

    if (!topic) {
        notFound()
    }

    // 1. Determinar el nivel adaptativo de manera dinámica
    let adaptiveLevel = 1
    const cookieStore = await cookies()
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user) {
        // Usuario autenticado: obtener nivel desde la base de datos
        adaptiveLevel = await getUserProgressForTopic(supabase, session.user.id, id)
    } else {
        // Usuario anónimo: obtener nivel desde la cookie o localStorage fallback
        const cookieLevel = cookieStore.get('quimica_nivel_base')?.value
        if (cookieLevel) {
            adaptiveLevel = parseInt(cookieLevel, 10) || 1
        }
    }

    // 2. Obtener actividades filtradas por el nivel adaptativo
    const activities = await getActivitiesByTopic(id, adaptiveLevel)

    return (
        <div className="topic-view">
            <Breadcrumbs path={path} />

            <header className="topic-header">
                <Link href="/" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Volver al Inicio</span>
                </Link>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={24} className="topic-icon" />
                        <h1 style={{ margin: 0 }}>{topic.nombre}</h1>
                    </div>
                    <span className="badge" style={{ 
                        backgroundColor: 'var(--accent-soft)', 
                        color: 'var(--accent)', 
                        border: '1px solid var(--accent)', 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                    }}>
                        Nivel de Maestría: {adaptiveLevel} / 5
                    </span>
                </div>
                <p className="topic-description">{topic.descripcion}</p>
            </header>

            <section className="topic-content card">
                <h3>Definición Importante</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    {topic.definicion || `En este nivel, el estudiante explorará los conceptos fundamentales de ${topic.nombre}. La metodología constructivista permitirá una asimilación progresiva de los temas químicos.`}
                </p>

                {topic.ejemplo && (
                    <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: 'var(--bg-primary)', borderLeft: '4px solid var(--accent)', borderRadius: '0 8px 8px 0' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Ejemplo Clave</h4>
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.6' }}>
                            {topic.ejemplo}
                        </p>
                    </div>
                )}
            </section>

            <section className="activities-section" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Target size={20} color="var(--accent)" />
                    <h3 style={{ margin: 0 }}>Actividades Sugeridas</h3>
                </div>

                {activities.length > 0 ? (
                    <div className="activities-list">
                        {activities.map(activity => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </div>
                ) : (
                    <div className="placeholder-info" style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            No hay actividades específicas para este nivel aún.
                            Prueba con el <Link href="/balancing" style={{ color: 'var(--accent)', fontWeight: 600 }}>Simulador de Balanceo</Link>.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
