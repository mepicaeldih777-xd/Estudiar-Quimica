import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Navigation'
import { getTopicsAsTree } from '@/lib/topics-api'

export const metadata: Metadata = {
    title: 'Química App | Aprendizaje Adaptativo',
    description: 'Herramienta educativa para la Tabla Periódica y Balanceo Químico',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const topics = await getTopicsAsTree()

    return (
        <html lang="es">
            <body>
                <div className="layout">
                    <Sidebar topics={topics} />
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
