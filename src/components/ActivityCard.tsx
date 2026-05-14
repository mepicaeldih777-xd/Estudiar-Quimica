'use client'

import React from 'react'
import { Activity } from '@/lib/activities-api'
import { Puzzle, HelpCircle, Trophy, PlayCircle } from 'lucide-react'
import Link from 'next/link'

interface ActivityCardProps {
    activity: Activity
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const isHard = activity.nivel_dificultad >= 4
    const isMedium = activity.nivel_dificultad === 3

    const getIcon = () => {
        switch (activity.tipo) {
            case 'quiz': return <HelpCircle size={24} className="icon-quiz" />
            case 'desafio': return <Trophy size={24} className="icon-desafio" />
            default: return <Puzzle size={24} className="icon-ejercicio" />
        }
    }

    return (
        <div className={`activity-card ${isHard ? 'hard' : isMedium ? 'medium' : ''}`}>
            <div className="activity-icon-container">
                {getIcon()}
            </div>

            <div className="activity-info">
                <div className="activity-meta">
                    <span className={`difficulty-badge level-${activity.nivel_dificultad}`}>
                        Nivel {activity.nivel_dificultad}
                    </span>
                    <span className="points">+{activity.puntos_recompensa} pts</span>
                </div>
                <h3>{activity.titulo}</h3>
                <p>{activity.tipo.charAt(0).toUpperCase() + activity.tipo.slice(1)} adaptativo</p>
            </div>

            <Link href={`/activity/${activity.id}`} className="play-btn">
                <PlayCircle size={32} />
            </Link>
        </div>
    )
}
