export interface AssessmentQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    difficulty: number
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
    {
        id: 'q1',
        question: '¿Cuál es el símbolo químico del Hidrógeno?',
        options: ['He', 'H', 'Hy', 'Ho'],
        correctAnswer: 'H',
        difficulty: 1
    },
    {
        id: 'q2',
        question: 'En la fórmula H2O, ¿cuántos átomos de Oxígeno hay?',
        options: ['1', '2', '0', '3'],
        correctAnswer: '1',
        difficulty: 2
    },
    {
        id: 'q3',
        question: '¿Qué tipo de elementos son el Flúor y el Cloro?',
        options: ['Metales Alcalinos', 'Gases Nobles', 'Halógenos', 'Metaloides'],
        correctAnswer: 'Halógenos',
        difficulty: 3
    },
    {
        id: 'q4',
        question: 'Para balancear H2 + O2 -> H2O, ¿qué coeficiente necesita el H2O?',
        options: ['1', '2', '3', 'No se puede'],
        correctAnswer: '2',
        difficulty: 4
    },
    {
        id: 'q5',
        question: '¿Cuál es la masa atómica aproximada del Carbono?',
        options: ['1.008', '14.007', '12.011', '15.999'],
        correctAnswer: '12.011',
        difficulty: 5
    }
]
