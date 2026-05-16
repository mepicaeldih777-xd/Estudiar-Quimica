import { AssessmentFlow } from '@/components/AssessmentFlow'
import { Breadcrumbs } from '@/components/Navigation'
import { BrainCircuit } from 'lucide-react'

export default function AssessmentPage() {
    const path = [{ id: 'assessment', name: 'Evaluación Inicial' }]

    return (
        <div className="assessment-page">
            <Breadcrumbs path={path} />

            <header className="page-header">
                <div className="page-title-container">
                    <BrainCircuit size={48} color="var(--accent)" />
                    <h1 className="page-title">Evaluación Diagnóstica</h1>
                </div>
                <p className="page-subtitle">
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
