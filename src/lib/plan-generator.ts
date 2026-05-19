export interface StudyPlan {
  tema: string
  titulo: string
  fases: {
    titulo: string
    descripcion: string
    material: string[]
  }[]
  teoria: {
    introduccion: string
    conceptos: { clave: string; valor: string }[]
    formulaDestacada?: { formula: string; descripcion: string }
    ejemplo: string
  }
  quiz: {
    pregunta: string
    opciones: string[]
    respuestaCorrecta: string
    explicacion: string
  }[]
}

const TEMAS_PREDEFINIDOS: { [key: string]: Omit<StudyPlan, 'tema'> } = {
  estequiometria: {
    titulo: "Plan de Maestría en Estequiometría",
    fases: [
      {
        titulo: "Fase 1: Conversión y Relaciones Molares",
        descripcion: "Aprende a transformar masas en gramos a moles, y a usar coeficientes estequiométricos de ecuaciones balanceadas.",
        material: ["Cálculo del peso molecular", "Uso del número de Avogadro", "Factores de conversión molar"]
      },
      {
        titulo: "Fase 2: Reactivo Limitante y en Exceso",
        descripcion: "Determina cuál es el reactivo que limita la cantidad de producto que se puede formar en una reacción química.",
        material: ["Identificación de reactivos", "Cálculo estequiométrico comparativo", "Masa sobrante del reactivo en exceso"]
      },
      {
        titulo: "Fase 3: Rendimiento y Eficiencia de Reacción",
        descripcion: "Diferencia el rendimiento teórico del rendimiento real experimentado en condiciones experimentales de laboratorio.",
        material: ["Fórmula de rendimiento porcentual", "Pérdidas mecánicas y reacciones secundarias"]
      }
    ],
    teoria: {
      introduccion: "La estequiometría es el cálculo de las relaciones cuantitativas entre los reactivos y productos en el transcurso de una reacción química. Se basa fundamentalmente en la Ley de Conservación de la Materia (nada se crea, nada se destruye, solo se transforma).",
      conceptos: [
        { clave: "Mol", valor: "Unidad que representa 6.022 x 10²³ partículas elementales (Átomos, Moléculas o Iones)." },
        { clave: "Masa Molar", valor: "Masa en gramos de un mol de sustancia, numéricamente equivalente a su masa atómica." },
        { clave: "Coeficientes", valor: "Números que preceden a las fórmulas en una ecuación química balanceada, indicando la proporción molar." }
      ],
      formulaDestacada: {
        formula: "n = m / M",
        descripcion: "Moles (n) es igual a la masa en gramos (m) dividida por la masa molar de la sustancia (M)."
      },
      ejemplo: "Para la reacción balanceada 2H₂ + O₂ → 2H₂O. Si tienes 4 moles de gas H₂, reaccionarán exactamente con 2 moles de O₂ para producir 4 moles de agua líquida."
    },
    quiz: [
      {
        pregunta: "¿Qué ley científica fundamenta de forma estricta los cálculos estequiométricos?",
        opciones: ["Ley de Boyle", "Ley de Conservación de la Masa", "Ley de la Gravedad", "Ley del Octeto"],
        respuestaCorrecta: "Ley de Conservación de la Masa",
        explicacion: "La masa de los reactantes debe ser exactamente igual a la masa de los productos de acuerdo con Antoine Lavoisier."
      },
      {
        pregunta: "¿Qué es el reactivo limitante en una reacción química?",
        opciones: [
          "El reactivo que se encuentra en mayor cantidad",
          "El reactivo que se consume por completo primero y limita la producción",
          "El reactivo que no participa en la reacción",
          "El reactivo catalizador que acelera el proceso"
        ],
        respuestaCorrecta: "El reactivo que se consume por completo primero y limita la producción",
        explicacion: "Una vez que el reactivo limitante se agota, la reacción se detiene por completo, determinando el rendimiento teórico máximo."
      },
      {
        pregunta: "En la ecuación N₂ + 3H₂ → 2NH₃, ¿cuántos moles de NH₃ se producen partiendo de 3 moles de N₂ con suficiente H₂?",
        opciones: ["2 moles", "3 moles", "6 moles", "9 moles"],
        respuestaCorrecta: "6 moles",
        explicacion: "Por cada 1 mol de N₂ se forman 2 de NH₃. Multiplicando 3 moles de N₂ por la proporción 2/1, se obtienen exactamente 6 moles de amoníaco."
      }
    ]
  },
  enlaces: {
    titulo: "Plan de Estudio de Enlaces Químicos",
    fases: [
      {
        titulo: "Fase 1: Electrones de Valencia y Regla del Octeto",
        descripcion: "Comprende la importancia de la capa externa de electrones y la tendencia de los átomos a lograr la estabilidad de los gases nobles.",
        material: ["Estructuras de Lewis", "Electrones de valencia por grupo atómico", "Excepciones a la regla del octeto"]
      },
      {
        titulo: "Fase 2: Enlace Iónico",
        descripcion: "Domina la transferencia completa de electrones entre metales y no metales debido a una alta diferencia de electronegatividad.",
        material: ["Fuerzas electrostáticas", "Propiedades de compuestos iónicos", "Redes cristalinas"]
      },
      {
        titulo: "Fase 3: Enlace Covalente y Metálico",
        descripcion: "Estudia la compartición equitativa o polar de electrones y la nube de electrones libre característica de los metales.",
        material: ["Covalente polar vs no polar", "Geometría molecular", "Teoría del mar de electrones"]
      }
    ],
    teoria: {
      introduccion: "Los enlaces químicos son las fuerzas de atracción que mantienen unidos a los átomos en compuestos químicos para adquirir un estado de menor energía y mayor estabilidad química en su capa de electrones.",
      conceptos: [
        { clave: "Electronegatividad", valor: "Capacidad relativa de un átomo para atraer electrones compartidos en un enlace." },
        { clave: "Anión y Catión", valor: "Iones con carga negativa (gana electrones) y positiva (pierde electrones) respectivamente." },
        { clave: "Regla del Octeto", valor: "Tendencia de los átomos a completar 8 electrones en su nivel de energía más externo." }
      ],
      formulaDestacada: {
        formula: "ΔEN = |EN₁ - EN₂|",
        descripcion: "La diferencia de electronegatividad clasifica los enlaces: >1.7 es Iónico, 0.4 a 1.7 Covalente Polar, y <0.4 Covalente No Polar."
      },
      ejemplo: "En el Cloruro de Sodio (NaCl), el Sodio (metal alcalino) cede 1 electrón al Cloro (halógeno), creando Na⁺ y Cl⁻ que se atraen fuertemente."
    },
    quiz: [
      {
        pregunta: "¿Qué tipo de enlace se forma cuando dos átomos con electronegatividades similares comparten electrones?",
        opciones: ["Enlace Iónico", "Enlace Covalente", "Enlace Metálico", "Fuerzas de Van der Waals"],
        respuestaCorrecta: "Enlace Covalente",
        explicacion: "Al no haber una diferencia de electronegatividad suficiente para transferir electrones, estos se comparten entre ambos núcleos."
      },
      {
        pregunta: "¿Qué grupo de la tabla periódica es extremadamente estable y casi nunca forma enlaces químicos?",
        opciones: ["Metales Alcalinos", "Halógenos", "Gases Nobles", "Metales de Transición"],
        respuestaCorrecta: "Gases Nobles",
        explicacion: "Los gases nobles (Grupo 18) ya poseen 8 electrones de valencia (excepto el Helio que tiene 2), por lo que son químicamente inertes."
      },
      {
        pregunta: "Si la diferencia de electronegatividad entre dos átomos enlazados es de 2.1, el enlace se clasifica como:",
        opciones: ["Covalente No Polar", "Covalente Polar", "Iónico", "Metálico"],
        respuestaCorrecta: "Iónico",
        explicacion: "Cualquier diferencia mayor a 1.7 se considera de carácter predominantemente iónico debido a la fuerte atracción electrostática."
      }
    ]
  },
  gases: {
    titulo: "Plan de Estudio de las Leyes de los Gases",
    fases: [
      {
        titulo: "Fase 1: Variables de Estado y Leyes Empíricas",
        descripcion: "Conecta la Presión, el Volumen y la Temperatura a través de las leyes individuales de Boyle, Charles y Gay-Lussac.",
        material: ["Ley de Boyle (P vs V)", "Ley de Charles (V vs T)", "Presión y temperatura absoluta"]
      },
      {
        titulo: "Fase 2: La Ecuación General del Gas Ideal",
        descripcion: "Combina todas las variables en la ley de estado ideal para calcular cualquier propiedad gaseosa en equilibrio.",
        material: ["Constante universal de gases (R)", "Cálculo de moles a partir de densidad", "Presiones parciales de Dalton"]
      }
    ],
    teoria: {
      introduccion: "Los gases ideales se rigen bajo hipótesis de partículas puntuales sin fuerzas de atracción mutua y choques perfectamente elásticos. Las variables de presión, volumen y temperatura explican su comportamiento macroscópico.",
      conceptos: [
        { clave: "Temperatura Kelvin", valor: "Temperatura absoluta basada en el cero absoluto. Se calcula sumando 273.15 a los grados Celsius." },
        { clave: "Presión Atmosférica", valor: "Fuerza por unidad de área que ejerce el aire sobre la superficie. 1 atm = 760 mmHg." }
      ],
      formulaDestacada: {
        formula: "P * V = n * R * T",
        descripcion: "Ecuación de estado de gases ideales. P es presión (atm), V volumen (L), n moles, R es 0.0821 atm*L/(mol*K), y T temperatura (K)."
      },
      ejemplo: "Si se duplica la temperatura absoluta de un gas dentro de un recipiente flexible a presión constante, su volumen se duplicará exactamente."
    },
    quiz: [
      {
        pregunta: "Si el volumen de un gas se reduce a la mitad a temperatura constante, ¿qué le ocurre a su presión?",
        opciones: ["Se reduce a la mitad", "Permanece igual", "Se duplica", "Se cuadruplica"],
        respuestaCorrecta: "Se duplica",
        explicacion: "Según la Ley de Boyle, la presión y el volumen son inversamente proporcionales (P₁V₁ = P₂V₂)."
      },
      {
        pregunta: "¿Qué escala de temperatura se debe utilizar obligatoriamente en todos los cálculos de leyes de los gases?",
        opciones: ["Grados Celsius", "Grados Fahrenheit", "Kelvin", "Cualquiera de las anteriores"],
        respuestaCorrecta: "Kelvin",
        explicacion: "Se requiere la escala de temperatura absoluta (Kelvin) para que las proporciones matemáticas de volumen y presión sean correctas."
      }
    ]
  },
  ph: {
    titulo: "Plan de Estudio de Ácidos, Bases y pH",
    fases: [
      {
        titulo: "Fase 1: Teorías Ácido-Base",
        descripcion: "Distingue las definiciones de ácidos y bases según Arrhenius y la teoría protónica de Brønsted-Lowry.",
        material: ["Ácidos y bases en solución acuosa", "Donación y aceptación de protones (H⁺)", "Pares conjugados"]
      },
      {
        titulo: "Fase 2: La escala de pH y cálculos logarítmicos",
        descripcion: "Calcula concentraciones de iones H⁺ y OH⁻ y comprende el carácter logarítmico del pH y pOH.",
        material: ["Fórmula logarítmica de pH", "Escala de color con indicadores", "Ácidos y bases fuertes vs débiles"]
      }
    ],
    teoria: {
      introduccion: "El pH o Potencial de Hidrógeno mide la acidez o alcalinidad (basicidad) de una sustancia en solución acuosa. La escala va de 0 a 14, siendo 7 el punto neutro.",
      conceptos: [
        { clave: "Ácido", valor: "Sustancia que libera iones H⁺ (protones) en agua. Tiene pH menor a 7 y sabor agrio." },
        { clave: "Base / Alcalino", valor: "Sustancia que acepta protones H⁺ o libera OH⁻. Tiene pH mayor a 7." }
      ],
      formulaDestacada: {
        formula: "pH = -log[H⁺]",
        descripcion: "El pH es el logaritmo negativo en base 10 de la concentración de iones de hidrógeno en moles por litro."
      },
      ejemplo: "El jugo de limón tiene un pH aproximado de 2 (muy ácido), mientras que el jabón líquido tiene un pH cercano a 9 (básico/alcalino)."
    },
    quiz: [
      {
        pregunta: "Una solución que tiene un pH exactamente igual a 7 se considera:",
        opciones: ["Altamente Ácida", "Ligeramente Básica", "Neutra", "Ácido Fuerte"],
        respuestaCorrecta: "Neutra",
        explicacion: "En un pH de 7 (como el agua pura a 25°C), la concentración de iones H⁺ y OH⁻ es exactamente la misma."
      },
      {
        pregunta: "Si una solución A tiene un pH de 4 y una solución B tiene un pH de 5, ¿cuántas veces más ácida es la solución A?",
        opciones: ["1 vez más", "2 veces más", "10 veces más", "100 veces más"],
        respuestaCorrecta: "10 veces más",
        explicacion: "La escala de pH es logarítmica de base 10. Cada unidad de decremento en el pH representa un aumento de 10 veces en la acidez."
      }
    ]
  }
}

export function generateStudyPlan(topicName: string): StudyPlan {
  const normalized = topicName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  // Buscar palabras clave
  let matchedKey = ""
  if (normalized.includes("estequio") || normalized.includes("mol")) {
    matchedKey = "estequiometria"
  } else if (normalized.includes("enlace") || normalized.includes("octeto") || normalized.includes("covalente")) {
    matchedKey = "enlaces"
  } else if (normalized.includes("gas") || normalized.includes("boyle") || normalized.includes("charles")) {
    matchedKey = "gases"
  } else if (normalized.includes("ph") || normalized.includes("acido") || normalized.includes("base") || normalized.includes("alcali")) {
    matchedKey = "ph"
  }

  if (matchedKey && TEMAS_PREDEFINIDOS[matchedKey]) {
    return {
      tema: topicName,
      ...TEMAS_PREDEFINIDOS[matchedKey]
    }
  }

  // Generador dinámico pedagógico (Fallback)
  return {
    tema: topicName,
    titulo: `Plan de Aprendizaje de ${topicName}`,
    fases: [
      {
        titulo: "Fase 1: Fundamentos y Definiciones Básicas",
        descripcion: `Explora el vocabulario clave, historia y conceptos de base esenciales sobre ${topicName}.`,
        material: ["Glosario inicial del tema", "Principios teóricos de soporte", "Fórmulas elementales"]
      },
      {
        titulo: "Fase 2: Leyes y Modelos Científicos",
        descripcion: `Estudia los modelos matemáticos o leyes que explican los fenómenos relacionados con ${topicName}.`,
        material: ["Modelado matemático", "Análisis gráfico y resolución paso a paso"]
      },
      {
        titulo: "Fase 3: Práctica Adaptativa Aplicada",
        descripcion: "Pone a prueba tus conocimientos resolviendo problemas aplicados del mundo real.",
        material: ["Ejercicios resueltos", "Laboratorio virtual o simulaciones didácticas"]
      }
    ],
    teoria: {
      introduccion: `El estudio de ${topicName} constituye una rama esencial en la comprensión de los fenómenos químicos. Permite a los estudiantes conectar las interacciones a escala atómica y molecular con las observaciones macroscópicas.`,
      conceptos: [
        { clave: "Definición Clave", valor: `Concepto principal que describe el alcance y límites del tema ${topicName}.` },
        { clave: "Estructura y Comportamiento", valor: "Forma en que la materia se organiza bajo las condiciones estudiadas." }
      ],
      formulaDestacada: {
        formula: "Propiedades = f(Estructura Atómica)",
        descripcion: "En química, las propiedades y comportamientos siempre derivan de la configuración molecular interna."
      },
      ejemplo: `Para comprender ${topicName}, el primer paso práctico consiste en identificar las variables principales (por ejemplo, masa, temperatura, carga eléctrica) involucradas en el sistema químico.`
    },
    quiz: [
      {
        pregunta: `¿Cuál es el primer paso recomendado para resolver un problema de ${topicName}?`,
        opciones: [
          "Adivinar el resultado numérico directamente",
          "Identificar las variables conocidas, las incógnitas y plantear una ecuación balanceada",
          "Proceder a mezclar los químicos al azar",
          "Ninguno de los anteriores"
        ],
        respuestaCorrecta: "Identificar las variables conocidas, las incógnitas y plantear una ecuación balanceada",
        explicacion: "En el método científico y resolución de problemas químicos, definir las variables es crucial antes de cualquier cálculo matemático."
      },
      {
        pregunta: `¿Por qué es fundamental estudiar la teoría detrás de ${topicName} antes de realizar experimentos prácticos?`,
        opciones: [
          "Para memorizar sin entender",
          "Para predecir el comportamiento, garantizar la seguridad en el laboratorio y comprender las bases científicas",
          "No es necesario, la teoría no tiene relación con la práctica",
          "Para aprobar el examen únicamente"
        ],
        respuestaCorrecta: "Para predecir el comportamiento, garantizar la seguridad en el laboratorio y comprender las bases científicas",
        explicacion: "La teoría química nos permite modelar la realidad, comprender qué ocurre a nivel atómico y tomar decisiones seguras en la experimentación."
      }
    ]
  }
}
