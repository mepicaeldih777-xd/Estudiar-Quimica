import { Breadcrumbs } from '@/components/Navigation'
import { Book, Zap, Target } from 'lucide-react'
import { PeriodicTable } from '@/components/PeriodicTable'

export default function Home() {
    return (
        <div className="home-content">
            <Breadcrumbs path={[]} />

            <header className="hero">
                <h1 className="badge">¡Bienvenido!</h1>
                <h2 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>
                    Domina la Química de forma Adaptativa
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.125rem' }}>
                    Una herramienta diseñada para estudiantes que buscan comprender la Tabla Periódica
                    y el Balanceo Químico mediante una ruta de aprendizaje personalizada.
                </p>
            </header>

            <PeriodicTable />

            <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
                <div className="card">
                    <Book className="topic-icon" style={{ marginBottom: '1rem' }} />
                    <h3>Estudio Jerárquico</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Navega por temas estructurados desde conceptos básicos hasta Propiedades Periódicas avanzadas.
                    </p>
                </div>

                <div className="card">
                    <Zap className="topic-icon" style={{ marginBottom: '1rem' }} />
                    <h3>Actividades Adaptativas</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Actividades que ajustan su dificultad según tu nivel actual de desempeño.
                    </p>
                </div>

                <div className="card">
                    <Target className="topic-icon" style={{ marginBottom: '1rem' }} />
                    <h3>Gamificación</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Supera desafíos, acumula puntos y compite de forma amistosa mientras aprendes.
                    </p>
                </div>
            </div>
        </div>
    )
}
