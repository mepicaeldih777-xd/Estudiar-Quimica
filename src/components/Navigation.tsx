'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, LayoutGrid, BookOpen, Menu, X } from 'lucide-react'
import { Topic } from '@/lib/topics-api'

interface NavigationProps {
    topics: Topic[]
    currentTopicId?: string
}

export const Sidebar: React.FC<NavigationProps> = ({ topics, currentTopicId }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="mobile-header">
                <Link href="/" className="logo">
                    <LayoutGrid size={24} color="var(--accent)" />
                    <span>Química App</span>
                </Link>
                <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header desktop-only">
                    <Link href="/" className="logo">
                        <LayoutGrid size={24} color="var(--accent)" />
                        <span>Química App</span>
                    </Link>
                </div>

                <div className="section-label">Temas de Estudio</div>
                <div className="topic-list">
                    {topics.map((topic) => (
                        <TopicItem key={topic.id} topic={topic} currentId={currentTopicId} depth={0} onClick={() => setIsOpen(false)} />
                    ))}
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
