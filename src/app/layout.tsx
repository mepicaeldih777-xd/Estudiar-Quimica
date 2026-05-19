import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Navigation'
import { getTopicsAsTree } from '@/lib/topics-api'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
    title: 'Estudiar Química | Aplicativo con IA',
    description: 'Herramienta educativa interactiva y adaptativa para la Tabla Periódica y Balanceo Químico.',
    icons: {
        icon: '/logo.png',
        apple: '/logo.png'
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const topics = await getTopicsAsTree()
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    return (
        <html lang="es">
            <body>
                <div className="layout">
                    <Sidebar topics={topics} user={session?.user} />
                    <main className="main-content" style={{ position: 'relative' }}>
                        
                        {/* Logotipo en la parte superior derecha dentro de la aplicación */}
                        <div 
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '3rem',
                                zIndex: 100,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                background: 'var(--bg-secondary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow)',
                                pointerEvents: 'none'
                            }} 
                            className="desktop-only"
                        >
                            <img 
                                src="/logo.png" 
                                alt="EQ Estudiar Química Logo" 
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    objectFit: 'cover'
                                }} 
                            />
                            <div style={{ textAlign: 'left' }}>
                                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Estudiar Química</span>
                                <span style={{ display: 'block', fontSize: '0.675rem', color: 'var(--text-secondary)' }}>EQ Aplicativo</span>
                            </div>
                        </div>

                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
