export interface ElementData {
    number: number
    symbol: string
    name: string
    mass: number
    category: string
    group: number      // Posicionamiento en columnas (1 a 18)
    period: number     // Posicionamiento en filas (1 a 10, donde 9 y 10 son para Lantánidos y Actínidos)
    electronegativity?: number
    description: string
    curiosity: string
    realPeriod?: number // Periodo real para mostrar al usuario
    realGroup?: string  // Grupo real para mostrar al usuario
}

export const ELEMENTS: ElementData[] = [
    // --- PERIODO 1 ---
    {
        number: 1, symbol: 'H', name: 'Hidrógeno', mass: 1.008, category: 'No Metal', group: 1, period: 1, electronegativity: 2.2,
        description: 'El elemento más ligero y abundante del universo, altamente reactivo e inflamable.',
        curiosity: 'Constituye aproximadamente el 75% de toda la materia visible del cosmos.'
    },
    {
        number: 2, symbol: 'He', name: 'Helio', mass: 4.003, category: 'Gas Noble', group: 18, period: 1,
        description: 'Un gas noble incoloro e inerte, famoso por ser extremadamente ligero y no inflamable.',
        curiosity: 'Es el único elemento que no se puede solidificar por enfriamiento a presión atmosférica normal.'
    },

    // --- PERIODO 2 ---
    {
        number: 3, symbol: 'Li', name: 'Litio', mass: 6.94, category: 'Metal Alcalino', group: 1, period: 2, electronegativity: 0.98,
        description: 'El metal más ligero de todos, altamente reactivo con agua y crucial en tecnologías de baterías.',
        curiosity: 'Es tan blando que se puede cortar fácilmente con un cuchillo de mantequilla.'
    },
    {
        number: 4, symbol: 'Be', name: 'Berilio', mass: 9.012, category: 'Metal Alcalinotérreo', group: 2, period: 2, electronegativity: 1.57,
        description: 'Un metal alcalinotérreo fuerte, ligero y tóxico, utilizado en aleaciones aeroespaciales y ventanas de rayos X.',
        curiosity: 'A pesar de su toxicidad extrema, algunos compuestos de berilio tienen un sabor dulce.'
    },
    {
        number: 5, symbol: 'B', name: 'Boro', mass: 10.81, category: 'Metaloide', group: 13, period: 2, electronegativity: 2.04,
        description: 'Un metaloide semiconductor rígido empleado en cristales de borosilicato (Pyrex) y imanes potentes.',
        curiosity: 'Es un absorbente de neutrones excepcional, ideal para barras de control en reactores nucleares.'
    },
    {
        number: 6, symbol: 'C', name: 'Carbono', mass: 12.011, category: 'No Metal', group: 14, period: 2, electronegativity: 2.55,
        description: 'El elemento base de la vida orgánica, capaz de formar enlaces infinitamente complejos.',
        curiosity: 'El mismo elemento forma el grafito blando de tu lápiz y el diamante, el material natural más duro.'
    },
    {
        number: 7, symbol: 'N', name: 'Nitrógeno', mass: 14.007, category: 'No Metal', group: 15, period: 2, electronegativity: 3.04,
        description: 'Un gas diatómico incoloro que compone la mayor parte de la atmósfera terrestre.',
        curiosity: 'Constituye el 78% del aire que respiramos y es vital para fabricar proteínas y ADN.'
    },
    {
        number: 8, symbol: 'O', name: 'Oxígeno', mass: 15.999, category: 'No Metal', group: 16, period: 2, electronegativity: 3.44,
        description: 'Un gas altamente reactivo indispensable para la respiración celular y la combustión.',
        curiosity: 'El oxígeno líquido es magnético y puede ser suspendido entre los polos de un imán potente.'
    },
    {
        number: 9, symbol: 'F', name: 'Flúor', mass: 18.998, category: 'Halógeno', group: 17, period: 2, electronegativity: 3.98,
        description: 'El halógeno y elemento más electronegativo y reactivo de toda la tabla periódica.',
        curiosity: 'Reacciona violentamente con casi todo, incluyendo el vidrio, el agua e incluso la arena.'
    },
    {
        number: 10, symbol: 'Ne', name: 'Neón', mass: 20.18, category: 'Gas Noble', group: 18, period: 2,
        description: 'Un gas noble inerte conocido por brillar con luz naranja rojiza brillante al cargarse eléctricamente.',
        curiosity: 'Si llenaras un globo de neón, flotaría igual que uno de helio pero con menos fuerza.'
    },

    // --- PERIODO 3 ---
    {
        number: 11, symbol: 'Na', name: 'Sodio', mass: 22.99, category: 'Metal Alcalino', group: 1, period: 3, electronegativity: 0.93,
        description: 'Un metal alcalino blando y reactivo que explota violentamente al entrar en contacto con el agua.',
        curiosity: 'Es uno de los componentes de la sal de mesa común (NaCl), que es vital para los impulsos nerviosos.'
    },
    {
        number: 12, symbol: 'Mg', name: 'Magnesio', mass: 24.305, category: 'Metal Alcalinotérreo', group: 2, period: 3, electronegativity: 1.31,
        description: 'Un metal alcalinotérreo ligero esencial en la clorofila de las plantas y en aleaciones estructurales.',
        curiosity: 'Arde con una luz blanca deslumbrante tan intensa que se usaba como flash en las primeras cámaras.'
    },
    {
        number: 13, symbol: 'Al', name: 'Aluminio', mass: 26.982, category: 'Metal Pobre', group: 13, period: 3, electronegativity: 1.61,
        description: 'Un metal ligero, fuerte y resistente a la corrosión, el más abundante en la corteza terrestre.',
        curiosity: 'En el siglo XIX, el aluminio era más valioso que el oro debido a la extrema dificultad para refinarlo.'
    },
    {
        number: 14, symbol: 'Si', name: 'Silicio', mass: 28.085, category: 'Metaloide', group: 14, period: 3, electronegativity: 1.9,
        description: 'Un metaloide semiconductor cristalino que es la base de toda la electrónica moderna y chips de computadora.',
        curiosity: 'Es el segundo elemento más común en la Tierra, constituyendo la mayor parte de la arena y el cuarzo.'
    },
    {
        number: 15, symbol: 'P', name: 'Fósforo', mass: 30.974, category: 'No Metal', group: 15, period: 3, electronegativity: 2.19,
        description: 'Un no metal reactivo fundamental para la transferencia de energía biológica (ATP) y los huesos.',
        curiosity: 'El fósforo blanco brilla espontáneamente en la oscuridad al reaccionar lentamente con el oxígeno.'
    },
    {
        number: 16, symbol: 'S', name: 'Azufre', mass: 32.06, category: 'No Metal', group: 16, period: 3, electronegativity: 2.58,
        description: 'Un no metal de color amarillo pálido inodoro por sí mismo, pero famoso por compuestos con olor a huevo podrido.',
        curiosity: 'Los antiguos alquimistas lo llamaban "piedra de azufre" o "brimstone" y lo asociaban con el fuego eterno.'
    },
    {
        number: 17, symbol: 'Cl', name: 'Cloro', mass: 35.45, category: 'Halógeno', group: 17, period: 3, electronegativity: 3.16,
        description: 'Un gas halógeno amarillo verdoso altamente tóxico y oxidante usado para purificar agua y desinfectar.',
        curiosity: 'Fue utilizado como una de las primeras armas químicas durante la Primera Guerra Mundial.'
    },
    {
        number: 18, symbol: 'Ar', name: 'Argón', mass: 39.948, category: 'Gas Noble', group: 18, period: 3,
        description: 'El gas noble más abundante en la atmósfera terrestre, inerte y usado para llenar bombillas incandescentes.',
        curiosity: 'Su nombre proviene del griego "argos", que significa "perezoso" o "inactivo".'
    },

    // --- PERIODO 4 ---
    {
        number: 19, symbol: 'K', name: 'Potasio', mass: 39.098, category: 'Metal Alcalino', group: 1, period: 4, electronegativity: 0.82,
        description: 'Un metal alcalino extremadamente reactivo que arde con una llama lila característica al tocar el agua.',
        curiosity: 'Los plátanos son ricos en potasio, y debido a esto emiten una cantidad diminuta de radiación natural.'
    },
    {
        number: 20, symbol: 'Ca', name: 'Calcio', mass: 40.078, category: 'Metal Alcalinotérreo', group: 2, period: 4, electronegativity: 1.0,
        description: 'Un metal alcalinotérreo vital para los huesos, dientes, y contracciones musculares en animales.',
        curiosity: 'Los depósitos de calcio forman espectaculares estalagmitas y estalactitas en cavernas subterráneas.'
    },
    {
        number: 21, symbol: 'Sc', name: 'Escandio', mass: 44.956, category: 'Metal de Transición', group: 3, period: 4, electronegativity: 1.36,
        description: 'Un metal de transición raro y ligero usado en aleaciones de aluminio para componentes aeroespaciales.',
        curiosity: 'Se utiliza en las bombillas de haluro metálico para imitar fielmente la luz solar en estadios deportivos.'
    },
    {
        number: 22, symbol: 'Ti', name: 'Titanio', mass: 47.867, category: 'Metal de Transición', group: 4, period: 4, electronegativity: 1.54,
        description: 'Un metal de transición superlativo: tan fuerte como el acero pero 45% más ligero, y altamente biocompatible.',
        curiosity: 'Es tan resistente a la corrosión que no se altera tras sumergirse en agua de mar por 100 años.'
    },
    {
        number: 23, symbol: 'V', name: 'Vanadio', mass: 50.942, category: 'Metal de Transición', group: 5, period: 4, electronegativity: 1.63,
        description: 'Un metal duro y maleable utilizado principalmente para fortalecer el acero en herramientas de alta calidad.',
        curiosity: 'El vanadio es el responsable de los hermosos colores del mineral vanadinita.'
    },
    {
        number: 24, symbol: 'Cr', name: 'Cromo', mass: 51.996, category: 'Metal de Transición', group: 6, period: 4, electronegativity: 1.66,
        description: 'Un metal brillante y duro famoso por su alta resistencia a la corrosión y su uso en el cromado estético.',
        curiosity: 'Es el ingrediente secreto que le da su característico color verde brillante a las esmeraldas.'
    },
    {
        number: 25, symbol: 'Mn', name: 'Manganeso', mass: 54.938, category: 'Metal de Transición', group: 7, period: 4, electronegativity: 1.55,
        description: 'Un metal duro y quebradizo esencial para la fotosíntesis en plantas y la desoxidación del acero.',
        curiosity: 'Las cuevas prehistóricas contienen pinturas negras hechas con dióxido de manganeso de hace 17,000 años.'
    },
    {
        number: 26, symbol: 'Fe', name: 'Hierro', mass: 55.845, category: 'Metal de Transición', group: 8, period: 4, electronegativity: 1.83,
        description: 'El metal más utilizado por la humanidad, componente central del núcleo terrestre y de la hemoglobina.',
        curiosity: 'El color rojo de la sangre y de la superficie de Marte se debe exactamente al mismo compuesto: el óxido de hierro.'
    },
    {
        number: 27, symbol: 'Co', name: 'Cobalto', mass: 58.933, category: 'Metal de Transición', group: 9, period: 4, electronegativity: 1.88,
        description: 'Un metal ferromagnético usado en súper-aleaciones de turbinas y en pigmentos azules icónicos.',
        curiosity: 'La vitamina B12 contiene un átomo central de cobalto, siendo el único metal de transición con tal rol específico.'
    },
    {
        number: 28, symbol: 'Ni', name: 'Níquel', mass: 58.693, category: 'Metal de Transición', group: 10, period: 4, electronegativity: 1.91,
        description: 'Un metal blanco plateado resistente a la corrosión usado en monedas, baterías y acero inoxidable.',
        curiosity: 'Se cree que gran parte del níquel de la Tierra llegó a través del impacto de meteoritos metálicos.'
    },
    {
        number: 29, symbol: 'Cu', name: 'Cobre', mass: 63.546, category: 'Metal de Transición', group: 11, period: 4, electronegativity: 1.9,
        description: 'Un metal dúctil de excelente conductividad eléctrica y térmica, vital en cables e infraestructura.',
        curiosity: 'Es uno de los pocos metales que no son plateados ni grises en su estado natural.'
    },
    {
        number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'Metal de Transición', group: 12, period: 4, electronegativity: 1.65,
        description: 'Un metal de transición empleado para galvanizar hierro contra el óxido y vital para el sistema inmune.',
        curiosity: 'Las monedas de un centavo de dólar actuales están hechas en un 97.5% de zinc recubierto de cobre.'
    },
    {
        number: 31, symbol: 'Ga', name: 'Galio', mass: 69.723, category: 'Metal Pobre', group: 13, period: 4, electronegativity: 1.81,
        description: 'Un metal blando y plateado muy especial utilizado en semiconductores y termómetros de alta temperatura.',
        curiosity: 'Tiene un punto de fusión tan bajo (29.76 °C) que literalmente se derrite al sostenerlo en la palma de tu mano.'
    },
    {
        number: 32, symbol: 'Ge', name: 'Germanio', mass: 72.63, category: 'Metaloide', group: 14, period: 4, electronegativity: 2.01,
        description: 'Un metaloide grisáceo brillante clave para la fibra óptica, transistores antiguos y lentes infrarrojas.',
        curiosity: 'Dmitri Mendeléyev predijo con total precisión su existencia y propiedades antes de ser descubierto.'
    },
    {
        number: 33, symbol: 'As', name: 'Arsénico', mass: 74.922, category: 'Metaloide', group: 15, period: 4, electronegativity: 2.18,
        description: 'Un metaloide gris famoso históricamente por su extrema toxicidad como veneno indetectable.',
        curiosity: 'A pesar de su mala reputación, dosis diminutas se utilizan para tratar ciertos tipos de leucemia.'
    },
    {
        number: 34, symbol: 'Se', name: 'Selenio', mass: 78.971, category: 'No Metal', group: 16, period: 4, electronegativity: 2.55,
        description: 'Un no metal semiconductor fotosensible vital en fotocopiadoras antiguas y células solares.',
        curiosity: 'Su conductividad eléctrica aumenta de forma drástica al ser iluminado con luz (fotoconductividad).'
    },
    {
        number: 35, symbol: 'Br', name: 'Bromo', mass: 79.904, category: 'Halógeno', group: 17, period: 4, electronegativity: 2.96,
        description: 'El único no metal que se presenta en forma de líquido denso y rojizo a temperatura ambiente.',
        curiosity: 'Produce un vapor tóxico y sofocante con un olor sumamente desagradable (su nombre significa "hedor").'
    },
    {
        number: 36, symbol: 'Kr', name: 'Kriptón', mass: 83.798, category: 'Gas Noble', group: 18, period: 4,
        description: 'Un gas noble inerte utilizado en luces estroboscópicas de pistas de aeropuertos y flashes fotográficos.',
        curiosity: 'Entre 1960 y 1983, la definición oficial del "metro" se basaba en la longitud de onda de la luz del Kriptón-86.'
    },

    // --- PERIODO 5 ---
    {
        number: 37, symbol: 'Rb', name: 'Rubidio', mass: 85.468, category: 'Metal Alcalino', group: 1, period: 5, electronegativity: 0.82,
        description: 'Un metal alcalino blando y altamente reactivo usado en motores iónicos y relojes atómicos.',
        curiosity: 'Se enciende de forma espontánea al contacto con el aire debido a su extrema reactividad.'
    },
    {
        number: 38, symbol: 'Sr', name: 'Estroncio', mass: 87.62, category: 'Metal Alcalinotérreo', group: 2, period: 5, electronegativity: 0.95,
        description: 'Un metal alcalinotérreo reactivo que imparte un color rojo carmesí brillante en fuegos artificiales.',
        curiosity: 'Su isótopo radiactivo Estroncio-90 se confunde con el calcio en el cuerpo y se aloja peligrosamente en los huesos.'
    },
    {
        number: 39, symbol: 'Y', name: 'Itrio', mass: 88.906, category: 'Metal de Transición', group: 3, period: 5, electronegativity: 1.22,
        description: 'Un metal de transición plateado empleado para mejorar aleaciones y en pantallas antiguas de TV.',
        curiosity: 'Es un componente clave en los superconductores de alta temperatura como el YBCO.'
    },
    {
        number: 40, symbol: 'Zr', name: 'Circonio', mass: 91.224, category: 'Metal de Transición', group: 4, period: 5, electronegativity: 1.33,
        description: 'Un metal de transición resistente a la corrosión vital para revestir combustible en reactores nucleares.',
        curiosity: 'Su gema sintética, la circonita cúbica, imita al diamante tan bien que confunde a los no expertos.'
    },
    {
        number: 41, symbol: 'Nb', name: 'Niobio', mass: 92.906, category: 'Metal de Transición', group: 5, period: 5, electronegativity: 1.6,
        description: 'Un metal raro con extraordinarias propiedades superconductoras usado en imanes de escáneres de resonancia (MRI).',
        curiosity: 'Originalmente se llamó Columbio, y posee un brillo azulado al oxidarse electrolíticamente.'
    },
    {
        number: 42, symbol: 'Mo', name: 'Molibdeno', mass: 95.95, category: 'Metal de Transición', group: 6, period: 5, electronegativity: 2.16,
        description: 'Un metal con uno de los puntos de fusión más altos, vital para aceros estructurales pesados.',
        curiosity: 'Es un cofactor metálico crítico en las enzimas que permiten a las bacterias fijar el nitrógeno del aire.'
    },
    {
        number: 43, symbol: 'Tc', name: 'Tecnecio', mass: 98, category: 'Metal de Transición', group: 7, period: 5, electronegativity: 1.9,
        description: 'El elemento más ligero sin ningún isótopo estable; crucial en gammagrafías médicas.',
        curiosity: 'Fue el primer elemento químico producido de forma artificial en un ciclotrón (su nombre significa "sintético").'
    },
    {
        number: 44, symbol: 'Ru', name: 'Rutenio', mass: 101.07, category: 'Metal de Transición', group: 8, period: 5, electronegativity: 2.2,
        description: 'Un metal del grupo del platino sumamente duro usado para endurecer contactos eléctricos y catalizadores.',
        curiosity: 'Su nombre rinde homenaje a Rusia ("Ruthenia" en latín), el país de su descubridor.'
    },
    {
        number: 45, symbol: 'Rh', name: 'Rodio', mass: 102.91, category: 'Metal de Transición', group: 9, period: 5, electronegativity: 2.28,
        description: 'Un metal noble extremadamente brillante y valioso usado en catalizadores de automóviles y joyería de lujo.',
        curiosity: 'Es uno de los metales preciosos más caros del planeta, superando con creces el precio del oro.'
    },
    {
        number: 46, symbol: 'Pd', name: 'Paladio', mass: 106.42, category: 'Metal de Transición', group: 10, period: 5, electronegativity: 2.2,
        description: 'Un metal noble que destaca por su increíble capacidad para absorber hidrógeno gaseoso.',
        curiosity: 'Puede absorber hasta 900 veces su propio volumen en gas hidrógeno a temperatura ambiente.'
    },
    {
        number: 47, symbol: 'Ag', name: 'Plata', mass: 107.87, category: 'Metal de Transición', group: 11, period: 5, electronegativity: 1.93,
        description: 'El elemento con la mayor conductividad eléctrica, térmica y reflectividad de luz en la Tierra.',
        curiosity: 'Tiene propiedades antibacterianas naturales; los antiguos romanos arrojaban monedas de plata al agua para conservarla fresca.'
    },
    {
        number: 48, symbol: 'Cd', name: 'Cadmio', mass: 112.41, category: 'Metal de Transición', group: 12, period: 5, electronegativity: 1.69,
        description: 'Un metal de transición suave y tóxico empleado en soldaduras y baterías recargables de Ni-Cd.',
        curiosity: 'Fue descubierto como una impureza de color amarillo en el carbonato de zinc.'
    },
    {
        number: 49, symbol: 'In', name: 'Indio', mass: 114.82, category: 'Metal Pobre', group: 13, period: 5, electronegativity: 1.78,
        description: 'Un metal blando clave para fabricar pantallas táctiles LCD a través del Óxido de Indio y Estaño (ITO).',
        curiosity: 'Al doblar una barra de indio puro, emite un crujido agudo y seco conocido como el "grito del indio".'
    },
    {
        number: 50, symbol: 'Sn', name: 'Estaño', mass: 118.71, category: 'Metal Pobre', group: 14, period: 5, electronegativity: 1.96,
        description: 'Un metal maleable usado desde la antigüedad para hacer bronce y hoy clave en soldaduras electrónicas.',
        curiosity: 'A temperaturas muy bajas, el estaño metálico transmuta de forma espontánea en un polvo gris inservible ("peste del estaño").'
    },
    {
        number: 51, symbol: 'Sb', name: 'Antimonio', mass: 121.76, category: 'Metaloide', group: 15, period: 5, electronegativity: 2.05,
        description: 'Un metaloide cristalino y quebradizo usado en aleaciones de plomo para baterías y retardantes de llama.',
        curiosity: 'En el antiguo Egipto, el sulfuro de antimonio se utilizaba como kohl, un delineador de ojos cosmético.'
    },
    {
        number: 52, symbol: 'Te', name: 'Teluro', mass: 127.6, category: 'Metaloide', group: 16, period: 5, electronegativity: 2.1,
        description: 'Un metaloide semiconductor raro de color gris plata usado en paneles solares de película delgada.',
        curiosity: 'La exposición al teluro hace que el cuerpo libere un compuesto que huele intensamente a ajo en el aliento y sudor.'
    },
    {
        number: 53, symbol: 'I', name: 'Yodo', mass: 126.9, category: 'Halógeno', group: 17, period: 5, electronegativity: 2.66,
        description: 'Un halógeno no metálico de color púrpura oscuro brillante, esencial para el correcto funcionamiento de la tiroides.',
        curiosity: 'Sublima directamente de sólido a un hermoso gas de color violeta al calentarse ligeramente.'
    },
    {
        number: 54, symbol: 'Xe', name: 'Xenón', mass: 131.29, category: 'Gas Noble', group: 18, period: 5,
        description: 'Un gas noble inerte pesado usado en faros de coches de alta gama y en propulsores iónicos espaciales.',
        curiosity: 'Fue el primer gas noble del cual se logró sintetizar un compuesto químico real (el hexafluoroplatinato de xenón).'
    },

    // --- PERIODO 6 ---
    {
        number: 55, symbol: 'Cs', name: 'Cesio', mass: 132.91, category: 'Metal Alcalino', group: 1, period: 6, electronegativity: 0.79,
        description: 'Un metal alcalino sumamente reactivo con un punto de fusión extremadamente bajo.',
        curiosity: 'La definición internacional de un "segundo" se basa en las vibraciones de un átomo de Cesio-133.'
    },
    {
        number: 56, symbol: 'Ba', name: 'Bario', mass: 137.33, category: 'Metal Alcalinotérreo', group: 2, period: 6, electronegativity: 0.89,
        description: 'Un metal alcalinotérreo reactivo pesado usado en fluidos de perforación y radiografías digestivas.',
        curiosity: 'A pesar de que los iones de bario solubles son muy tóxicos, el sulfato de bario insoluble es inocuo y se ingiere como contraste.'
    },

    // --- LANTÁNIDOS (Renderizados en Fila 9 del Grid, Periodo Real: 6) ---
    {
        number: 57, symbol: 'La', name: 'Lantano', mass: 138.91, category: 'Lantánido', group: 3, period: 9, electronegativity: 1.1,
        realPeriod: 6, realGroup: 'Lantánido (Grupo 3)',
        description: 'El elemento que da nombre a la serie de los lantánidos, usado en catalizadores de refinación y vidrios ópticos de alta calidad.',
        curiosity: 'Los lentes de las cámaras de cine profesionales suelen contener lantano para reducir la dispersión de la luz.'
    },
    {
        number: 58, symbol: 'Ce', name: 'Cerio', mass: 140.12, category: 'Lantánido', group: 4, period: 9, electronegativity: 1.12,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'El más abundante de los lantánidos, componente esencial del "mischmetal" usado en las piedras para encendedores.',
        curiosity: 'El óxido de cerio es el agente de pulido óptico más eficiente para pantallas de vidrio de precisión.'
    },
    {
        number: 59, symbol: 'Pr', name: 'Praseodimio', mass: 140.91, category: 'Lantánido', group: 5, period: 9, electronegativity: 1.13,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal dúctil usado en aleaciones magnéticas de alta potencia e imanes permanentes.',
        curiosity: 'Junto con el neodimio, forma el vidrio de didimio usado en las gafas protectoras de los sopladores de vidrio.'
    },
    {
        number: 60, symbol: 'Nd', name: 'Neodimio', mass: 144.24, category: 'Lantánido', group: 6, period: 9, electronegativity: 1.14,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal de tierras raras utilizado para fabricar los imanes permanentes más potentes conocidos.',
        curiosity: 'Un imán de neodimio de pocos centímetros puede levantar miles de veces su propio peso y aplastar dedos si se atrae a otro.'
    },
    {
        number: 61, symbol: 'Pm', name: 'Prometio', mass: 145, category: 'Lantánido', group: 7, period: 9, electronegativity: 1.13,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'El único lantánido totalmente radiactivo y artificial; se genera como subproducto de la fisión del uranio.',
        curiosity: 'Su nombre rinde homenaje a Prometeo, el titán de la mitología griega que robó el fuego a los dioses.'
    },
    {
        number: 62, symbol: 'Sm', name: 'Samario', mass: 150.36, category: 'Lantánido', group: 8, period: 9, electronegativity: 1.17,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal de tierras raras usado en imanes resistentes a temperaturas extremas y reactores nucleares.',
        curiosity: 'Sus imanes (Samario-Cobalto) son cruciales en los auriculares magnéticos debido a su resistencia a la desmagnetización.'
    },
    {
        number: 63, symbol: 'Eu', name: 'Europio', mass: 151.96, category: 'Lantánido', group: 9, period: 9, electronegativity: 1.2,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'El más reactivo de los lantánidos, esencial en las pantallas de TV y tubos fluorescentes.',
        curiosity: 'Es el responsable del color rojo brillante en las pantallas CRT antiguas y se usa como medida de seguridad en los billetes de Euro.'
    },
    {
        number: 64, symbol: 'Gd', name: 'Gadolinio', mass: 157.25, category: 'Lantánido', group: 10, period: 9, electronegativity: 1.2,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal con propiedades magnéticas únicas usado como agente de contraste intravenoso en resonancias magnéticas.',
        curiosity: 'Es altamente ferromagnético a temperaturas frías y posee una capacidad inmensa para absorber neutrones.'
    },
    {
        number: 65, symbol: 'Tb', name: 'Terbio', mass: 158.93, category: 'Lantánido', group: 11, period: 9, electronegativity: 1.2,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un lantánido plateado utilizado en pantallas de rayos X, lámparas fluorescentes y aleaciones magnetoestrictivas.',
        curiosity: 'Es uno de los metales descubiertos en la famosa cantera de Ytterby en Suecia.'
    },
    {
        number: 66, symbol: 'Dy', name: 'Disprosio', mass: 162.5, category: 'Lantánido', group: 12, period: 9, electronegativity: 1.22,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal con alta susceptibilidad magnética añadido a los imanes de neodimio para que no pierdan fuerza al calentarse.',
        curiosity: 'Su nombre proviene del griego "dysprositos", que significa "difícil de obtener".'
    },
    {
        number: 67, symbol: 'Ho', name: 'Holmio', mass: 164.93, category: 'Lantánido', group: 13, period: 9, electronegativity: 1.23,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal con la mayor fuerza magnética intrínseca de todos los elementos, usado en polos magnéticos concentrados.',
        curiosity: 'Debido a su increíble capacidad magnética, se utiliza en experimentos de campos magnéticos extremos.'
    },
    {
        number: 68, symbol: 'Er', name: 'Erbio', mass: 167.26, category: 'Lantánido', group: 14, period: 9, electronegativity: 1.24,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un lantánido que colorea el vidrio de un hermoso rosa y actúa como amplificador óptico en cables de fibra de internet.',
        curiosity: 'Sin los amplificadores dopados con erbio, las señales de internet transoceánicas se extinguirían a mitad de camino.'
    },
    {
        number: 69, symbol: 'Tm', name: 'Tulio', mass: 168.93, category: 'Lantánido', group: 15, period: 9, electronegativity: 1.25,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'El lantánido estable más escaso, usado en dispositivos de rayos X portátiles que no requieren electricidad.',
        curiosity: 'Al ser bombardeado en un reactor nuclear, emite rayos X de forma autónoma por meses.'
    },
    {
        number: 70, symbol: 'Yb', name: 'Iterbio', mass: 173.05, category: 'Lantánido', group: 16, period: 9, electronegativity: 1.1,
        realPeriod: 6, realGroup: 'Lantánido',
        description: 'Un metal blando usado en láseres de fibra óptica industriales y relojes atómicos de máxima precisión.',
        curiosity: 'Su resistencia eléctrica cambia drásticamente bajo presiones extremas, sirviendo para medir terremotos artificiales.'
    },
    {
        number: 71, symbol: 'Lu', name: 'Lutecio', mass: 174.97, category: 'Lantánido', group: 17, period: 9, electronegativity: 1.27,
        realPeriod: 6, realGroup: 'Lantánido (o Grupo 3)',
        description: 'El lantánido más denso, duro y caro de todos, empleado en datación de meteoritos y medicina nuclear contra el cáncer.',
        curiosity: 'Se considera el límite o punto de transición entre la serie de lantánidos y el bloque d.'
    },

    // --- CONTINUACIÓN PERIODO 6 (Metales de Transición del Bloque d) ---
    {
        number: 72, symbol: 'Hf', name: 'Hafnio', mass: 178.49, category: 'Metal de Transición', group: 4, period: 6, electronegativity: 1.3,
        description: 'Un metal de transición resistente al calor y excelente absorbente de neutrones en submarinos nucleares.',
        curiosity: 'Su alta capacidad para emitir electrones lo hace crucial en las boquillas de los cortadores de plasma.'
    },
    {
        number: 73, symbol: 'Ta', name: 'Tántalo', mass: 180.95, category: 'Metal de Transición', group: 5, period: 6, electronegativity: 1.5,
        description: 'Un metal refractario denso y sumamente resistente a los ácidos, base de los condensadores de teléfonos móviles.',
        curiosity: 'Debido a su total inercia química, se utiliza para fabricar implantes de cráneo y prótesis biocompatibles.'
    },
    {
        number: 74, symbol: 'W', name: 'Wolframio', mass: 183.84, category: 'Metal de Transición', group: 6, period: 6, electronegativity: 2.36,
        description: 'El elemento metálico con el punto de fusión más alto de la tabla periódica (3,422 °C).',
        curiosity: 'También llamado Tungsteno, es tan duro y denso que se usa en proyectiles militares para perforar blindajes.'
    },
    {
        number: 75, symbol: 'Re', name: 'Renio', mass: 186.21, category: 'Metal de Transición', group: 7, period: 6, electronegativity: 1.9,
        description: 'Uno de los elementos más escasos de la corteza terrestre, indispensable en súper-aleaciones de motores de aviones jet.',
        curiosity: 'Fue el último elemento estable y no radiactivo descubierto en la naturaleza (en 1925).'
    },
    {
        number: 76, symbol: 'Os', name: 'Osmio', mass: 190.23, category: 'Metal de Transición', group: 8, period: 6, electronegativity: 2.2,
        description: 'El elemento natural más denso y pesado que existe en la Tierra (22.59 g/cm³).',
        curiosity: 'Una esfera de osmio del tamaño de un balón de fútbol pesa aproximadamente 130 kilogramos.'
    },
    {
        number: 77, symbol: 'Ir', name: 'Iridio', mass: 192.22, category: 'Metal de Transición', group: 9, period: 6, electronegativity: 2.2,
        description: 'El metal más resistente a la corrosión química y el segundo más denso del planeta.',
        curiosity: 'Una fina capa de iridio en estratos geológicos del mundo evidenció el impacto del meteorito que extinguió a los dinosaurios.'
    },
    {
        number: 78, symbol: 'Pt', name: 'Platino', mass: 195.08, category: 'Metal de Transición', group: 10, period: 6, electronegativity: 2.28,
        description: 'Un metal noble precioso inalterable usado en catalizadores, bujías aeroespaciales y tratamientos contra el cáncer.',
        curiosity: 'El prototipo internacional del kilogramo patrón de pesas estuvo hecho de una aleación de Platino-Iridio por décadas.'
    },
    {
        number: 79, symbol: 'Au', name: 'Oro', mass: 196.97, category: 'Metal de Transición', group: 11, period: 6, electronegativity: 2.54,
        description: 'El metal precioso por excelencia, sumamente maleable, inalterable y de excelente conductividad eléctrica.',
        curiosity: 'Una sola onza de oro se puede estirar hasta formar un hilo ultra-fino de 80 kilómetros de longitud.'
    },
    {
        number: 80, symbol: 'Hg', name: 'Mercurio', mass: 200.59, category: 'Metal de Transición', group: 12, period: 6, electronegativity: 2.0,
        description: 'El único metal de transición que se presenta en estado líquido brillante a temperatura ambiente.',
        curiosity: 'Es sumamente denso: una bola de billar de hierro o un bloque de granito flotan en él como si fuesen madera en agua.'
    },
    {
        number: 81, symbol: 'Tl', name: 'Talio', mass: 204.38, category: 'Metal Pobre', group: 13, period: 6, electronegativity: 1.62,
        description: 'Un metal blando y extremadamente tóxico que se oxida rápidamente al contacto con el aire.',
        curiosity: 'Se conoció popularmente como "el veneno de los envenenadores" porque sus sales son insípidas y letales.'
    },
    {
        number: 82, symbol: 'Pb', name: 'Plomo', mass: 207.2, category: 'Metal Pobre', group: 14, period: 6, electronegativity: 2.33,
        description: 'Un metal denso, maleable y pesado empleado tradicionalmente como escudo protector contra la radiación de rayos X.',
        curiosity: 'Es el producto final estable en el que terminan casi todas las cadenas de desintegración radiactiva del uranio.'
    },
    {
        number: 83, symbol: 'Bi', name: 'Bismuto', mass: 208.98, category: 'Metal Pobre', group: 15, period: 6, electronegativity: 2.02,
        description: 'Un metal pobre con propiedades diamagnéticas únicas y el componente activo del Pepto-Bismol para el estómago.',
        curiosity: 'Al enfriarse lentamente, sus cristales forman hermosas estructuras geométricas escalonadas con colores de arcoíris.'
    },
    {
        number: 84, symbol: 'Po', name: 'Polonio', mass: 209, category: 'Metaloide', group: 16, period: 6, electronegativity: 2.0,
        description: 'Un metaloide altamente radiactivo y peligroso descubierto por Marie Curie en su investigación del pechblenda.',
        curiosity: 'Nombrado en honor a Polonia, es millones de veces más tóxico que el cianuro de hidrógeno por su emisión alfa.'
    },
    {
        number: 85, symbol: 'At', name: 'Astato', mass: 210, category: 'Halógeno', group: 17, period: 6, electronegativity: 2.2,
        description: 'El elemento natural más escaso sobre la corteza de la Tierra debido a su vida media extremadamente corta.',
        curiosity: 'Se calcula que en todo el planeta hay menos de 28 gramos de astato en un momento dado.'
    },
    {
        number: 86, symbol: 'Rn', name: 'Radón', mass: 222, category: 'Gas Noble', group: 18, period: 6,
        description: 'Un gas noble radiactivo e incoloro que emana del decaimiento natural del uranio en el suelo.',
        curiosity: 'Es la segunda causa principal de cáncer de pulmón en el mundo debido a su acumulación invisible en sótanos.'
    },

    // --- PERIODO 7 ---
    {
        number: 87, symbol: 'Fr', name: 'Francio', mass: 223, category: 'Metal Alcalino', group: 1, period: 7, electronegativity: 0.79,
        description: 'El metal alcalino más pesado, extremadamente inestable y altamente radiactivo.',
        curiosity: 'Debido a su calor de desintegración radiactiva, una cantidad macroscópica de francio se evaporaría al instante.'
    },
    {
        number: 88, symbol: 'Ra', name: 'Radio', mass: 226, category: 'Metal Alcalinotérreo', group: 2, period: 7, electronegativity: 0.9,
        description: 'Un metal alcalinotérreo radiactivo que brilla de forma natural con una tenue luz azulada en la oscuridad.',
        curiosity: 'Marie y Pierre Curie lo descubrieron y acuñaron el término "radiactividad" a partir de sus experimentos con él.'
    },

    // --- ACTÍNIDOS (Renderizados en Fila 10 del Grid, Periodo Real: 7) ---
    {
        number: 89, symbol: 'Ac', name: 'Actinio', mass: 227, category: 'Actínido', group: 3, period: 10, electronegativity: 1.1,
        realPeriod: 7, realGroup: 'Actínido (Grupo 3)',
        description: 'El metal que inicia la serie de los actínidos; emite una potente luminiscencia azulada debido a su alta radiactividad.',
        curiosity: 'Es unas 150 veces más radiactivo que el uranio puro, excitando los átomos del aire circundante.'
    },
    {
        number: 90, symbol: 'Th', name: 'Torio', mass: 232.04, category: 'Actínido', group: 4, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un actínido radiactivo débil y abundante considerado una excelente alternativa al uranio para energía nuclear más segura.',
        curiosity: 'Su desintegración radiactiva interna en el núcleo de la Tierra genera gran parte del calor geotérmico del planeta.'
    },
    {
        number: 91, symbol: 'Pa', name: 'Protactinio', mass: 231.04, category: 'Actínido', group: 5, period: 10, electronegativity: 1.5,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un metal radiactivo denso y escaso que actúa como intermediario en el decaimiento del Uranio-235.',
        curiosity: 'Su nombre significa "padre del actinio" porque al decaer produce Actinio-227.'
    },
    {
        number: 92, symbol: 'U', name: 'Uranio', mass: 238.03, category: 'Actínido', group: 6, period: 10, electronegativity: 1.38,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'El elemento natural con el número atómico más alto, famoso por su uso en la fisión nuclear y reactores de potencia.',
        curiosity: 'En el siglo XIX se añadía óxido de uranio al vidrio para fabricar vajillas que brillaban bajo luz ultravioleta.'
    },
    {
        number: 93, symbol: 'Np', name: 'Neptunio', mass: 237, category: 'Actínido', group: 7, period: 10, electronegativity: 1.36,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'El primer elemento transuránico sintético producido artificialmente en un ciclotrón.',
        curiosity: 'Nombrado en honor al planeta Neptuno por encontrarse en la tabla periódica justo después del Uranio (Urano).'
    },
    {
        number: 94, symbol: 'Pu', name: 'Plutonio', mass: 244, category: 'Actínido', group: 8, period: 10, electronegativity: 1.28,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un actínido sintético altamente radiactivo y fisible clave en reactores nucleares de investigación y armas atómicas.',
        curiosity: 'Es el combustible que alimenta a las sondas espaciales Voyager y al rover Curiosity en Marte mediante generadores térmicos.'
    },
    {
        number: 95, symbol: 'Am', name: 'Americio', mass: 243, category: 'Actínido', group: 9, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un actínido artificial radiactivo de color plateado brillante producido por bombardeo de plutonio.',
        curiosity: 'Una cantidad diminuta de óxido de americio se encuentra dentro de casi todos los detectores de humo domésticos.'
    },
    {
        number: 96, symbol: 'Cm', name: 'Curio', mass: 247, category: 'Actínido', group: 10, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un metal pesado sintético extremadamente radiactivo que acumula calor espontáneamente al desintegrarse.',
        curiosity: 'Fue nombrado en memoria de Marie y Pierre Curie por sus contribuciones pioneras a la radiactividad.'
    },
    {
        number: 97, symbol: 'Bk', name: 'Berkelio', mass: 247, category: 'Actínido', group: 11, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un actínido sintético altamente radiactivo producido en cantidades milimétricas con fines de investigación científica.',
        curiosity: 'Nombrado en honor a la Universidad de Berkeley en California, lugar de su descubrimiento y síntesis.'
    },
    {
        number: 98, symbol: 'Cf', name: 'Californio', mass: 251, category: 'Actínido', group: 12, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un potente emisor de neutrones artificial usado para iniciar reactores nucleares y detectar grietas en metales.',
        curiosity: 'Es uno de los metales artificiales más costosos; un solo microgramo puede costar miles de dólares.'
    },
    {
        number: 99, symbol: 'Es', name: 'Einsteinio', mass: 252, category: 'Actínido', group: 13, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un elemento sintético descubierto originalmente en los restos de la primera explosión de una bomba termonuclear en 1952.',
        curiosity: 'Nombrado en honor al gran físico Albert Einstein, brilla intensamente debido a su extrema radiactividad.'
    },
    {
        number: 100, symbol: 'Fm', name: 'Fermio', mass: 257, category: 'Actínido', group: 14, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'El elemento más pesado que puede producirse mediante el bombardeo de neutrones en reactores nucleares.',
        curiosity: 'Lleva el nombre de Enrico Fermi, el físico que construyó el primer reactor nuclear del mundo.'
    },
    {
        number: 101, symbol: 'Md', name: 'Mendelevio', mass: 258, category: 'Actínido', group: 15, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un elemento sintético altamente radiactivo producido átomo por átomo bombardeando einsteinio con partículas alfa.',
        curiosity: 'Rinde homenaje a Dmitri Mendeléyev, el célebre creador de la tabla periódica original.'
    },
    {
        number: 102, symbol: 'No', name: 'Nobelio', mass: 259, category: 'Actínido', group: 16, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido',
        description: 'Un elemento transactínido sintético del cual solo se han producido cantidades insignificantes en laboratorios avanzados.',
        curiosity: 'Fue nombrado en honor a Alfred Nobel, el inventor de la dinamita y creador de los Premios Nobel.'
    },
    {
        number: 103, symbol: 'Lr', name: 'Laurencio', mass: 262, category: 'Actínido', group: 17, period: 10, electronegativity: 1.3,
        realPeriod: 7, realGroup: 'Actínido (o Grupo 3)',
        description: 'El último elemento de la serie de los actínidos, con una vida media extremadamente corta de pocos minutos.',
        curiosity: 'Su nombre conmemora a Ernest Lawrence, el inventor del ciclotrón para acelerar partículas.'
    },

    // --- TRANSACTÍNIDOS (Elementos Superpesados Sintéticos del Bloque d, Periodo 7) ---
    {
        number: 104, symbol: 'Rf', name: 'Rutherfordio', mass: 267, category: 'Metal de Transición', group: 4, period: 7,
        description: 'El primer elemento superpesado transactínido, sumamente radiactivo y sin isótopos estables.',
        curiosity: 'Lleva el nombre de Ernest Rutherford, considerado el padre de la física nuclear.'
    },
    {
        number: 105, symbol: 'Db', name: 'Dubnio', mass: 268, category: 'Metal de Transición', group: 5, period: 7,
        description: 'Un elemento sintético altamente inestable producido mediante colisiones nucleares de alta energía.',
        curiosity: 'Nombrado en honor a Dubna, la ciudad de investigación científica de Rusia donde fue sintetizado.'
    },
    {
        number: 106, symbol: 'Sg', name: 'Seaborgio', mass: 269, category: 'Metal de Transición', group: 6, period: 7,
        description: 'Un metal superpesado y sintético radiactivo con una vida media de solo unos pocos segundos.',
        curiosity: 'Fue el primer elemento nombrado en honor a una persona viva en ese momento (Glenn Seaborg).'
    },
    {
        number: 107, symbol: 'Bh', name: 'Bohrio', mass: 270, category: 'Metal de Transición', group: 7, period: 7,
        description: 'Un elemento sintético transactínido inestable del cual solo se han creado unos pocos átomos.',
        curiosity: 'Honra a Niels Bohr, el físico que desarrolló el modelo atómico basado en niveles cuánticos.'
    },
    {
        number: 108, symbol: 'Hs', name: 'Hassio', mass: 277, category: 'Metal de Transición', group: 8, period: 7,
        description: 'Un metal superpesado sintético y radiactivo con propiedades químicas similares al osmio.',
        curiosity: 'Su nombre rinde homenaje al estado federado alemán de Hesse ("Hassia" en latín).'
    },
    {
        number: 109, symbol: 'Mt', name: 'Meitnerio', mass: 278, category: 'Metal de Transición', group: 9, period: 7,
        description: 'Un elemento sintético extremadamente radiactivo y pesado que se desintegra en segundos.',
        curiosity: 'Es el único elemento de la tabla periódica nombrado exclusivamente en honor a una mujer científica (Lise Meitner).'
    },
    {
        number: 110, symbol: 'Ds', name: 'Darmstadio', mass: 281, category: 'Metal de Transición', group: 10, period: 7,
        description: 'Un elemento transactínido sintético del cual se desconoce su aspecto físico por su corta vida media.',
        curiosity: 'Lleva el nombre de la ciudad alemana de Darmstadt, cuna de su descubrimiento en el GSI.'
    },
    {
        number: 111, symbol: 'Rg', name: 'Roentgenio', mass: 282, category: 'Metal de Transición', group: 11, period: 7,
        description: 'Un elemento superpesado sintético con isótopos radiactivos extremadamente inestables.',
        curiosity: 'Nombrado en honor a Wilhelm Röntgen, el físico alemán que descubrió los rayos X.'
    },
    {
        number: 112, symbol: 'Cn', name: 'Copernicio', mass: 285, category: 'Metal de Transición', group: 12, period: 7,
        description: 'Un elemento transactínido sintético que los científicos sospechan podría presentarse en forma líquida.',
        curiosity: 'Lleva el nombre del astrónomo Nicolás Copérnico, célebre por formular el modelo heliocéntrico.'
    },
    {
        number: 113, symbol: 'Nh', name: 'Nihonio', mass: 286, category: 'Metal Pobre', group: 13, period: 7,
        description: 'Un elemento superpesado y sintético extremadamente radiactivo sintetizado en laboratorios japoneses.',
        curiosity: 'Su nombre significa literalmente "Tierra del Sol Naciente" (Nihon, en japonés).'
    },
    {
        number: 114, symbol: 'Fl', name: 'Flerovio', mass: 289, category: 'Metal Pobre', group: 14, period: 7,
        description: 'Un elemento transactínido sintético radiactivo con propiedades que podrían asemejarse a un gas noble.',
        curiosity: 'Honra al Laboratorio Flerov de Reacciones Nucleares en Dubna, Rusia.'
    },
    {
        number: 115, symbol: 'Mc', name: 'Moscovio', mass: 290, category: 'Metal Pobre', group: 15, period: 7,
        description: 'Un elemento sintético superpesado del cual sus isótopos solo duran centésimas de segundo.',
        curiosity: 'Fue nombrado en homenaje a la Óblast de Moscú, donde se ubica el laboratorio del descubrimiento.'
    },
    {
        number: 116, symbol: 'Lv', name: 'Livermorio', mass: 293, category: 'Metal Pobre', group: 16, period: 7,
        description: 'Un elemento superpesado y sintético altamente radiactivo producido por colisiones de calcio y curio.',
        curiosity: 'Honra al Laboratorio Nacional Lawrence Livermore y a la ciudad de Livermore en California.'
    },
    {
        number: 117, symbol: 'Ts', name: 'Teneso', mass: 294, category: 'Halógeno', group: 17, period: 7,
        description: 'El penúltimo elemento de la tabla periódica, clasificado provisionalmente como halógeno superpesado.',
        curiosity: 'Lleva el nombre del estado de Tennessee (EE. UU.), sede de laboratorios claves en el proyecto de síntesis.'
    },
    {
        number: 118, symbol: 'Og', name: 'Oganesón', mass: 294, category: 'Gas Noble', group: 18, period: 7,
        description: 'El elemento químico con el número atómico y masa atómica más altos de toda la tabla periódica.',
        curiosity: 'Nombrado en honor al físico Yuri Oganesián, es el único elemento vivo nombrado en su honor actual.'
    }
]
