import { supabase } from './supabase'

export interface Topic {
    id: string
    parent_id: string | null
    nombre: string
    descripcion: string
    orden: number
    dificultad_base: number
    children?: Topic[]
    definicion?: string
    ejemplo?: string
}

/**
 * Recupera todos los temas de la base de datos y los organiza en una estructura de árbol.
 */
export async function getTopicsAsTree(): Promise<Topic[]> {
    const { data, error } = await supabase
        .from('temas')
        .select('*')
        .order('orden', { ascending: true })

    if (error) {
        console.error('Error al obtener temas:', error.message)
        return []
    }

    return buildTree(data as Topic[])
}

/**
 * Función recursiva/iterativa para construir el árbol basándose en parent_id.
 */
function buildTree(topics: Topic[]): Topic[] {
    const map: { [key: string]: Topic } = {}
    const tree: Topic[] = []

    // Inicializar mapa y agregar propiedad children
    topics.forEach((topic) => {
        map[topic.id] = { ...topic, children: [] }
    })

    // Distribuir nodos hijos hacia sus respectivos padres
    topics.forEach((topic) => {
        if (topic.parent_id && map[topic.parent_id]) {
            map[topic.parent_id].children?.push(map[topic.id])
        } else {
            tree.push(map[topic.id])
        }
    })

    return tree
}

/**
 * Obtiene el camino de navegación (ancestros) para un tema específico.
 */
export async function getTopicPath(topicId: string): Promise<{ id: string; name: string }[]> {
    const { data, error } = await supabase
        .from('temas')
        .select('id, parent_id, nombre')

    if (error || !data) return []

    const path: { id: string; name: string }[] = []
    let currentId: string | null = topicId

    while (currentId) {
        const node = data.find((t) => t.id === currentId)
        if (!node) break
        path.unshift({ id: node.id, name: node.nombre })
        currentId = node.parent_id
    }

    return path
}

export async function getTopicById(topicId: string): Promise<Topic | null> {
    const { data, error } = await supabase
        .from('temas')
        .select('*')
        .eq('id', topicId)
        .single()

    if (error || !data) return null
    return data as Topic
}
