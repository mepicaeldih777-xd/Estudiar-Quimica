'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, LayoutGrid, BookOpen } from 'lucide-react'
import { Topic } from '@/lib/topics-api'

interface NavigationProps {
    topics: Topic[]
    currentTopicId?: string
}

export const Sidebar: React.FC<NavigationProps> = ({ topics, currentTopicId }) => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <Link href="/" className="logo">
                    <LayoutGrid size={24} color="var(--accent)" />
                    <span>Química App</span>
                </Link>
            </div>

            <div className="section-label">Temas de Estudio</div>
            <div className="topic-list">
                {topics.map((topic) => (
                    <TopicItem key={topic.id} topic={topic} currentId={currentTopicId} depth={0} />
                ))}
            </div>
        </nav>
    )
}

const TopicItem: React.FC<{ topic: Topic; currentId?: string; depth: number }> = ({
    topic, currentId, depth
}) => {
    const isActive = topic.id === currentId
    const hasChildren = topic.children && topic.children.length > 0

    return (
        <div className="topic-item-container">
            <Link
                href={`/topic/${topic.id}`}
                className={`topic-item ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 12 + 12}px` }}
            >
                <BookOpen size={16} className="topic-icon" />
                <span className="topic-name">{topic.nombre}</span>
                {hasChildren && <ChevronRight size={14} className="chevron" />}
            </Link>

            {hasChildren && (
                <div className="topic-children">
                    {topic.children?.map((child: Topic) => (
                        <TopicItem key={child.id} topic={child} currentId={currentId} depth={depth + 1} />
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
