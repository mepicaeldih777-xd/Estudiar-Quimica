-- Datos semilla para App Química Adaptativa

-- 1. Insertar Temas Raíz
INSERT INTO temas (id, parent_id, nombre, descripcion, orden, dificultad_base) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'La Tabla Periódica', 'Estudio fundamental de los elementos químicos.', 1, 1);

-- 2. Insertar Temas Nivel 2 (Subtemas de Tabla Periódica)
INSERT INTO temas (id, parent_id, nombre, descripcion, orden, dificultad_base) 
VALUES 
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Grupos y Periodos', 'Cómo se organiza la tabla en filas y columnas.', 1, 1),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bloques (s, p, d, f)', 'Subniveles de energía y su posición.', 2, 2),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Balanceo Químico', 'Leyes de conservación de la masa.', 3, 3);

-- 3. Insertar Temas Nivel 3 (Detalle de Grupos)
INSERT INTO temas (id, parent_id, nombre, descripcion, orden, dificultad_base) 
VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Metales Alcalinos', 'Elementos del Grupo 1 con alta reactividad.', 1, 2),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Gases Nobles', 'Estabilidad del octeto completo.', 2, 1);

-- 4. Actividad Inicial de Muestra
INSERT INTO actividades (tema_id, titulo, tipo, contenido, nivel_dificultad, puntos_recompensa)
VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Identificación de Alcalinos', 'quiz', 
'{"pregunta": "¿Cuál de estos es un metal alcalino?", "opciones": ["Hierro", "Litio", "Oro", "Cloro"], "respuesta_correcta": "Litio"}', 
1, 50);
