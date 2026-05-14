-- Datos semilla para App Química Adaptativa

-- 1. Insertar Temas Raíz
INSERT INTO temas (id, parent_id, nombre, descripcion, definicion, ejemplo, orden, dificultad_base) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'La Tabla Periódica', 'Estudio fundamental de los elementos químicos.', 'Es una disposición de los elementos químicos en forma de tabla, estructurados por su número atómico, configuración de electrones y sus propiedades químicas.', 'Ejemplo: Si buscas el Carbono (C) en la tabla, sabrás rápidamente que tiene 6 protones y pertenece a los no metales al ver su clasificación.', 1, 1);

-- 2. Insertar Temas Nivel 2 (Subtemas de Tabla Periódica)
INSERT INTO temas (id, parent_id, nombre, descripcion, definicion, ejemplo, orden, dificultad_base) 
VALUES 
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Grupos y Periodos', 'Cómo se organiza la tabla en filas y columnas.', 'Los grupos son las columnas verticales de la tabla periódica y los periodos son las filas horizontales.', 'Todos los elementos del Grupo 1 (metales alcalinos) tienden a perder un electrón en reacciones químicas, comportándose de manera muy similar.', 1, 1),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bloques (s, p, d, f)', 'Subniveles de energía y su posición.', 'La tabla periódica está dividida en bloques (s, p, d, f) basados en el orbital atómico ocupado por el último electrón capado.', 'El Hierro (Fe) tiene su electrón de mayor energía en el orbital d, lo cual lo ubica en el centro de la tabla agrupado como "elemento de transición".', 2, 2),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Balanceo Químico', 'Leyes de conservación de la masa.', 'Procedimiento por el cual se iguala la cantidad de átomos de los reactantes y los productos de una ecuación para cumplir la ley de conservación de la materia.', 'Para formar agua (H₂O), dos moléculas de gas hidrógeno (2H₂) deben reaccionar con una molécula de gas oxígeno (O₂), para formar dos moléculas de agua (2H₂O).', 3, 3);

-- 3. Insertar Temas Nivel 3 (Detalle de Grupos)
INSERT INTO temas (id, parent_id, nombre, descripcion, definicion, ejemplo, orden, dificultad_base) 
VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Metales Alcalinos', 'Elementos del Grupo 1 con alta reactividad.', 'Son aquellos metales situados en el grupo 1 de la tabla periódica. Son muy reactivos y no se encuentran libres en la naturaleza.', 'El Sodio (Na) es extremadamente reactivo y al tocar el agua produce una reacción exotérmica violenta liberando gas de hidrógeno.', 1, 2),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Gases Nobles', 'Estabilidad del octeto completo.', 'Son un grupo de elementos químicos (Grupo 18) caracterizados por ser inodoros, incoloros y tener una reactividad química muy baja debido a que ya tienen su nivel de energía completo.', 'El Helio (He) es un gas noble conocido por usarse en globos porque no es tóxico, es más ligero que el aire y lo más importante: no es inflamable porque no reacciona.', 2, 1);

-- 4. Actividades de Aprendizaje
INSERT INTO actividades (tema_id, titulo, tipo, contenido, nivel_dificultad, puntos_recompensa)
VALUES 
-- Actividades para 'La Tabla Periódica' (a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11)
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Conceptos Básicos de la Tabla', 'quiz', 
'{"pregunta": "¿Qué representa la Tabla Periódica?", "opciones": ["Planetas", "Elementos Químicos", "Animales", "Colores"], "respuesta_correcta": "Elementos Químicos"}', 
1, 50),

-- Actividades para 'Grupos y Periodos' (b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12)
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Diferencia entre Grupo y Periodo', 'quiz', 
'{"pregunta": "¿Cómo se denominan las columnas verticales en la Tabla Periódica?", "opciones": ["Periodos", "Bloques", "Grupos o Familias", "Niveles"], "respuesta_correcta": "Grupos o Familias"}', 
1, 50),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Identificando Filas', 'ejercicio', 
'{"pregunta": "Las filas horizontales de la Tabla Periódica se llaman...", "opciones": ["Grupos", "Sectores", "Periodos", "Líneas"], "respuesta_correcta": "Periodos"}', 
1, 50),

-- Actividades para 'Bloques (s, p, d, f)' (c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13)
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Ubicación de los bloques', 'quiz', 
'{"pregunta": "¿Qué bloque agrupa principalmente a los metales de transición?", "opciones": ["Bloque s", "Bloque p", "Bloque d", "Bloque f"], "respuesta_correcta": "Bloque d"}', 
2, 60),

-- Actividades para 'Balanceo Químico' (d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14)
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Ley de Conservación', 'quiz', 
'{"pregunta": "¿Qué ley fundamenta el balanceo de ecuaciones químicas?", "opciones": ["Ley de Gravedad", "Ley de Ohm", "Ley de Conservación de la Masa", "Ley de Boyle"], "respuesta_correcta": "Ley de Conservación de la Masa"}', 
3, 70),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Coeficientes Estequiométricos', 'ejercicio', 
'{"pregunta": "¿Qué números se modifican al balancear una ecuación?", "opciones": ["Superíndices", "Subíndices", "Coeficientes", "No se modifican"], "respuesta_correcta": "Coeficientes"}', 
3, 70),

-- Actividades para 'Metales Alcalinos' (e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15)
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Identificación de Alcalinos', 'quiz', 
'{"pregunta": "¿Cuál de estos es un metal alcalino?", "opciones": ["Hierro", "Litio", "Oro", "Cloro"], "respuesta_correcta": "Litio"}', 
1, 50),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Propiedades de los Alcalinos', 'ejercicio', 
'{"pregunta": "¿Cuál es una característica principal de los metales alcalinos?", "opciones": ["Baja reactividad", "Alta reactividad con agua", "Son gases", "No reaccionan"], "respuesta_correcta": "Alta reactividad con agua"}', 
2, 60),

-- Actividades para 'Gases Nobles' (f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16)
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Estabilidad Química', 'quiz', 
'{"pregunta": "¿Por qué los gases nobles son poco reactivos?", "opciones": ["Tienen poco peso", "Tienen su última capa de electrones completa", "Son invisibles", "Son metales"], "respuesta_correcta": "Tienen su última capa de electrones completa"}', 
1, 50);
