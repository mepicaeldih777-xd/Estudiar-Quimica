import { BalancingGame } from '@/components/BalancingGame'
import { createEquation } from '@/lib/balancing-engine'
import { Breadcrumbs } from '@/components/Navigation'
import { FlaskConical } from 'lucide-react'

export default function BalancingPage() {
    const exampleEquation = createEquation(
        [
            { formula: 'H2', coeff: 1 },
            { formula: 'O2', coeff: 1 }
        ],
        [
            { formula: 'H2O', coeff: 1 }
        ]
    )

    const path = [{ id: 'balancing', name: 'Simulador de Balanceo' }]

    return (
        <div className="balancing-page">
            <Breadcrumbs path={path} />

            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FlaskConical size={32} color="var(--accent)" />
                    <h1 style={{ fontSize: '2.5rem' }}>Simulador de Balanceo Químico</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                    Ajusta los coeficientes para cumplir con la Ley de Conservación de la Materia.
                </p>
            </header>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <BalancingGame initialEquation={exampleEquation} />
            </div>

            <section className="instructions" style={{ marginTop: '4rem' }}>
                <h3>¿Cómo jugar?</h3>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
                    <li>Utiliza los botones <strong>+</strong> y <strong>-</strong> para cambiar la cantidad de moléculas.</li>
                    <li>Observa la tabla inferior: los indicadores cambiarán a <strong>verde</strong> cuando el número de átomos coincida.</li>
                    <li>¡Logra que todos los elementos estén en verde para completar el desafío!</li>
                </ul>
            </section>
        </div>
    )
}
