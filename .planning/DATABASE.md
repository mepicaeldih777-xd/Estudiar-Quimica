# Esquema de Base de Datos - App Química

Este documento describe la estructura inicial de las tablas para la aplicación educativa. Se utilizarán las tablas `temas` y `actividades` para gestionar el contenido jerárquico y adaptativo.

## Tabla: temas

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID / INT | Identificador único del tema. |
| parent_id | UUID / INT (FK) | Referencia al `id` del tema padre (NULL para el nivel superior). |
| nombre | STRING | Título del tema (ej: "Grupos de la Tabla Periódica"). |
| descripcion | TEXT | Explicación o contenido educativo del tema. |
| orden | INT | Control del flujo secuencial de estudio. |
| dificultad_base | INT | Puntuación base de complejidad para el tema. |
| creado_en | TIMESTAMP | Registro de creación. |

## Tabla: actividades

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID / INT | Identificador único de la actividad. |
| tema_id | UUID / INT (FK) | Referencia al tema al que pertenece la actividad. |
| titulo | STRING | Título de la actividad (ej: "Balanceo de Ecuaciones Nivel 1"). |
| tipo | STRING | Tipo de actividad (ej: 'ejercicio', 'quiz', 'desafio'). |
| contenido | JSON | Almacena preguntas, opciones o parámetros del juego. |
| nivel_dificultad | INT | Calificación del 1 al 5 para adaptatividad. |
| puntos_recompensa | INT | Gamificación: cuántos puntos otorga al completarse. |
| actualizado_en | TIMESTAMP | Registro de cambios. |

## Notas de Diseño
- **Recursividad**: La columna `parent_id` permite que un tema tenga subtemas infinitos.
- **Adaptatividad**: La columna `nivel_dificultad` en `actividades` será filtrada por el sistema según el desempeño del estudiante.
- **Gamificación**: `puntos_recompensa` alimentará el sistema de trofeos y progreso.
