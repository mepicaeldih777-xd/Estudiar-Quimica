import { supabase } from './supabase'

export interface Activity {
    id: string
    tema_id: string
    titulo: string
    tipo: 'quiz' | 'ejercicio' | 'desafio'
    contenido: any
    nivel_dificultad: number
    puntos_recompensa: number
}

/**
 * Recupera las actividades recomendadas para un tema y un nivel de dificultad específico.
 * Para adaptatividad, también recuperamos niveles inmediatamente superiores si el nivel actual es dominado.
 */
export async function getActivitiesByTopic(topicId: string, level: number = 1): Promise<Activity[]> {
    const { data, error } = await supabase
        .from('actividades')
        .select('*')
        .eq('tema_id', topicId)
        .lte('nivel_dificultad', level + 1) // Permitimos ver el siguiente nivel de dificultad

    if (error || !data) {
        console.error('Error al obtener actividades:', error?.message)
        return []
    }

    return data as Activity[]
}

export async function getActivityById(id: string): Promise<Activity | null> {
    const { data, error } = await supabase
        .from('actividades')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        console.error('Error al obtener actividad:', error?.message)
        return null
    }

    return data as Activity
}
