import { SupabaseClient } from '@supabase/supabase-js'

export async function getUserProgressForTopic(
    supabase: SupabaseClient,
    userId: string,
    topicId: string
): Promise<number> {
    const { data, error } = await supabase
        .from('progreso_usuario')
        .select('nivel_actual')
        .eq('user_id', userId)
        .eq('tema_id', topicId)
        .maybeSingle()

    if (error) {
        console.error('Error fetching topic progress:', error.message)
        return 1
    }

    return data ? data.nivel_actual : 1
}

export async function saveUserProgressForTopic(
    supabase: SupabaseClient,
    userId: string,
    topicId: string,
    level: number
): Promise<void> {
    const { error } = await supabase
        .from('progreso_usuario')
        .upsert(
            {
                user_id: userId,
                tema_id: topicId,
                nivel_actual: level,
                actualizado_en: new Date().toISOString()
            },
            { onConflict: 'user_id,tema_id' }
        )

    if (error) {
        console.error('Error updating topic progress:', error.message)
    }
}

export async function initUserProgressFromAssessment(
    supabase: SupabaseClient,
    userId: string,
    level: number
): Promise<void> {
    // 1. Fetch all topics from DB
    const { data: topics, error: topicsError } = await supabase
        .from('temas')
        .select('id')

    if (topicsError || !topics) {
        console.error('Error fetching topics for initialization:', topicsError?.message)
        return
    }

    // 2. Prepare bulk insert of progress
    const progressRecords = topics.map(topic => ({
        user_id: userId,
        tema_id: topic.id,
        nivel_actual: level,
        actualizado_en: new Date().toISOString()
    }))

    const { error: upsertError } = await supabase
        .from('progreso_usuario')
        .upsert(progressRecords, { onConflict: 'user_id,tema_id' })

    if (upsertError) {
        console.error('Error initializing user progress from assessment:', upsertError.message)
    }
}
