-- Esquema inicial para App Química Adaptativa

-- Tabla de Temas (Jerárquica)
CREATE TABLE temas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES temas(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    orden INT DEFAULT 0,
    dificultad_base INT DEFAULT 1 CHECK (dificultad_base BETWEEN 1 AND 5),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Actividades (Adaptativa)
CREATE TABLE actividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tema_id UUID NOT NULL REFERENCES temas(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL, -- 'ejercicio', 'quiz', 'desafio'
    contenido JSONB NOT NULL,
    nivel_dificultad INT DEFAULT 1 CHECK (nivel_dificultad BETWEEN 1 AND 5),
    puntos_recompensa INT DEFAULT 10,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_temas_parent ON temas(parent_id);
CREATE INDEX idx_actividades_tema ON actividades(tema_id);
CREATE INDEX idx_actividades_dificultad ON actividades(nivel_dificultad);
