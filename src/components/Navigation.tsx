'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, BookOpen, Menu, X, LogOut, User } from 'lucide-react'
import { Topic } from '@/lib/topics-api'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface NavigationProps {
    topics: Topic[]
    currentTopicId?: string
    user?: any
}

export const Sidebar: React.FC<NavigationProps> = ({ topics, currentTopicId, user }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>
            <div className="mobile-header">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img 
                        src="/logo.jpg" 
                        alt="EQ Logo" 
                        style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} 
                    />
                    <span>Química App</span>
                </Link>
                <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header desktop-only">
                    <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img 
                            src="/logo.jpg" 
                            alt="EQ Logo" 
                            style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <span>Química App</span>
                    </Link>
                </div>

                <div className="section-label">Temas de Estudio</div>
                <div className="topic-list" style={{ flex: 1, overflowY: 'auto' }}>
                    {topics.map((topic) => (
                        <TopicItem key={topic.id} topic={topic} currentId={currentTopicId} depth={0} onClick={() => setIsOpen(false)} />
                    ))}
                </div>

                <div className="auth-section" style={{ padding: '1rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                    {user ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {user.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                ) : (
                                    <User size={16} />
                                )}
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user.user_metadata?.full_name || user.email}
                                </span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
                            >
                                <LogOut size={16} />
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/login"
                            style={{ display: 'block', textAlign: 'center', padding: '0.75rem', background: 'var(--accent)', color: 'white', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}
                            onClick={() => setIsOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </nav>
            
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
        </>
    )
}

const TopicItem: React.FC<{ topic: Topic; currentId?: string; depth: number; onClick?: () => void }> = ({
    topic, currentId, depth, onClick
}) => {
    const isActive = topic.id === currentId
    const hasChildren = topic.children && topic.children.length > 0

    return (
        <div className="topic-item-container">
            <Link
                href={`/topic/${topic.id}`}
                className={`topic-item ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 12 + 12}px` }}
                onClick={onClick}
            >
                <BookOpen size={16} className="topic-icon" />
                <span className="topic-name">{topic.nombre}</span>
                {hasChildren && <ChevronRight size={14} className="chevron" />}
            </Link>

            {hasChildren && (
                <div className="topic-children">
                    {topic.children?.map((child: Topic) => (
                        <TopicItem key={child.id} topic={child} currentId={currentId} depth={depth + 1} onClick={onClick} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const Breadcrumbs: React.FC<{ path: { id: string; name: string }[] }> = ({ path }) => {
    return (
        <div className="breadcrumbs">
            <Link href="/">Home</Link>
            {path.map((step) => (
                <React.Fragment key={step.id}>
                    <ChevronRight size={14} className="separator" />
                    <Link href={`/topic/${step.id}`}>{step.name}</Link>
                </React.Fragment>
            ))}
        </div>
    )
}
