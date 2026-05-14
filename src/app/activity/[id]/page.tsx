import { getActivityById } from '@/lib/activities-api'
import { ActivityRunner } from '@/components/ActivityRunner'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ActivityPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const activity = await getActivityById(id)

    if (!activity) {
        notFound()
    }

    return (
        <div className="activity-view" style={{ minHeight: '100vh', padding: '2rem 3rem' }}>
            <Link href={`/topic/${activity.tema_id}`} style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '2rem'
            }}>
                <ArrowLeft size={16} />
                <span>Volver al Tema</span>
            </Link>

            <ActivityRunner activity={activity} />
        </div>
    )
}
