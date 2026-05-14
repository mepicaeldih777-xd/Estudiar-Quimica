import { AssessmentFlow } from '@/components/AssessmentFlow'
import { Breadcrumbs } from '@/components/Navigation'
import { BrainCircuit } from 'lucide-react'

export default function AssessmentPage() {
    const path = [{ id: 'assessment', name: 'Evaluación Inicial' }]

    return (
        <div className="assessment-page">
            <Breadcrumbs path={path} />

            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <BrainCircuit size={48} color="var(--accent)" />
                    <h1 style={{ fontSize: '3rem' }}>Evaluación Diagnóstica</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '1rem auto' }}>
                    Realiza este breve test para que podamos personalizar tu ruta de aprendizaje
                    y asignarte el nivel de dificultad adecuado.
                </p>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <AssessmentFlow />
            </div>
        </div>
    )
}
