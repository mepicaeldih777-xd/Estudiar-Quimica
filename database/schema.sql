-- Esquema inicial para App Química Adaptativa

-- Tabla de Temas (Jerárquica)
CREATE TABLE temas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES temas(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    definicion TEXT,
    ejemplo TEXT,
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

-- Tabla de Registro de Temas (Objetivos del usuario)
CREATE TABLE registro_temas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    completada BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_registro_temas_user ON registro_temas(user_id);

-- Habilitar RLS en registro_temas
ALTER TABLE registro_temas ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad (RLS) para registro_temas
CREATE POLICY "Permitir a usuarios leer sus propios temas" ON registro_temas
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Permitir a usuarios insertar sus propios temas" ON registro_temas
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Permitir a usuarios actualizar sus propios temas" ON registro_temas
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Permitir a usuarios eliminar sus propios temas" ON registro_temas
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Tabla para rastrear el progreso y nivel adaptativo del usuario por tema
CREATE TABLE progreso_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tema_id UUID NOT NULL REFERENCES temas(id) ON DELETE CASCADE,
    nivel_actual INT DEFAULT 1 CHECK (nivel_actual BETWEEN 1 AND 5),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tema_id)
);

CREATE INDEX idx_progreso_usuario_user ON progreso_usuario(user_id);

-- Habilitar RLS
ALTER TABLE progreso_usuario ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Permitir a usuarios leer su propio progreso" ON progreso_usuario
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Permitir a usuarios insertar su propio progreso" ON progreso_usuario
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Permitir a usuarios actualizar su propio progreso" ON progreso_usuario
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
