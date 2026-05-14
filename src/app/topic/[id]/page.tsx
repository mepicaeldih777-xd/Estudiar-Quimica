import { Breadcrumbs } from '@/components/Navigation'
import { getTopicById, getTopicPath } from '@/lib/topics-api'
import { getActivitiesByTopic } from '@/lib/activities-api'
import { ActivityCard } from '@/components/ActivityCard'
import { notFound } from 'next/navigation'
import { Sparkles, ArrowLeft, Target } from 'lucide-react'
import Link from 'next/link'

export default async function TopicPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const topic = await getTopicById(id)
    const path = await getTopicPath(id)
    const activities = await getActivitiesByTopic(id, 1) // Nivel adaptativo inicial 1

    if (!topic) {
        notFound()
    }

    return (
        <div className="topic-view">
            <Breadcrumbs path={path} />

            <header className="topic-header">
                <Link href="/" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Volver al Inicio</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <Sparkles size={24} className="topic-icon" />
                    <h1 style={{ margin: 0 }}>{topic.nombre}</h1>
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
