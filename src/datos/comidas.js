import fotoMadera from '../assets/fotos/mesa-madera.jpg'
import fotoRustico from '../assets/fotos/rustico.jpg'
import fotoPollo from '../assets/fotos/bowl-pollo.jpg'
import fotoBowl from '../assets/fotos/bowl.jpg'
import fotoBrunch from '../assets/fotos/brunch.jpg'
import fotoCasa from '../assets/fotos/platos-casa.jpg'

export const ALERGIAS = ['Gluten', 'Mariscos', 'Huevo', 'Leche', 'Frutos secos', 'Soja', 'Maní', 'Pescado']

export const TIPOS = ['Plato preparado', 'Panadería', 'Fruta y verdura', 'Lácteos']

// Foto que usa una comida publicada, según su tipo
export const FOTO_POR_TIPO = {
    'Plato preparado': fotoCasa,
    'Panadería': fotoRustico,
    'Fruta y verdura': fotoBowl,
    'Lácteos': fotoBrunch,
}

// Datos de ejemplo. Viven en memoria: al recargar la página se reinician.
export const COMIDAS_EJEMPLO = [
    {
        id: 'guisado',
        nombre: 'Guisado con ejotes y arroz',
        tipo: 'Plato preparado',
        kilos: 4,
        limite: '7:00 p. m.',
        ingredientes: ['Carne de res', 'Ejotes', 'Arroz', 'Chile'],
        alergenos: [],
        vegetariano: false,
        vegano: false,
        foto: fotoMadera,
        posicion: '50% 50%',
    },
    {
        id: 'pan',
        nombre: 'Pan artesanal',
        tipo: 'Panadería',
        kilos: 3,
        limite: '9:00 p. m.',
        ingredientes: ['Harina de trigo', 'Agua', 'Sal', 'Levadura'],
        alergenos: ['Gluten'],
        vegetariano: true,
        vegano: true,
        foto: fotoRustico,
        posicion: '50% 25%',
    },
    {
        id: 'pollo',
        nombre: 'Pollo con ensalada',
        tipo: 'Plato preparado',
        kilos: 2,
        limite: '8:00 p. m.',
        ingredientes: ['Pollo', 'Lechuga', 'Elote', 'Frijol negro'],
        alergenos: [],
        vegetariano: false,
        vegano: false,
        foto: fotoPollo,
        posicion: '50% 50%',
    },
    {
        id: 'camote',
        nombre: 'Camote con brócoli',
        tipo: 'Plato preparado',
        kilos: 5,
        limite: '6:30 p. m.',
        ingredientes: ['Camote', 'Brócoli', 'Jitomate', 'Carne de res'],
        alergenos: [],
        vegetariano: false,
        vegano: false,
        foto: fotoBowl,
        posicion: '50% 50%',
    },
    {
        id: 'huevo',
        nombre: 'Huevo con ejotes',
        tipo: 'Plato preparado',
        kilos: 1.5,
        limite: '10:00 p. m.',
        ingredientes: ['Huevo', 'Ejotes', 'Pan tostado', 'Jitomate'],
        alergenos: ['Huevo', 'Gluten'],
        vegetariano: true,
        vegano: false,
        foto: fotoBrunch,
        posicion: '50% 78%',
    },
    {
        id: 'arroz-pollo',
        nombre: 'Arroz con pollo',
        tipo: 'Plato preparado',
        kilos: 6,
        limite: '8:30 p. m.',
        ingredientes: ['Arroz', 'Pollo', 'Zanahoria', 'Salsa de soja'],
        alergenos: ['Soja', 'Gluten'],
        vegetariano: false,
        vegano: false,
        foto: fotoCasa,
        posicion: '50% 60%',
    },
]

// Texto de la hora límite, incluso si quien dona no la indicó
export function textoLimite(limite) {
    return limite ? `Hasta las ${limite}` : 'Hora por confirmar'
}

function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}

export function separarPorComas(texto) {
    return texto.split(',').map((parte) => parte.trim()).filter(Boolean)
}

// Decide si una comida se le puede mostrar a una persona según su perfil
export function esCompatible(comida, perfil) {
    if (comida.alergenos.some((alergeno) => perfil.alergias.includes(alergeno))) return false
    if (comida.contactoCruzado && perfil.alergias.length > 0) return false
    if (perfil.dieta === 'Vegetariana' && !comida.vegetariano) return false
    if (perfil.dieta === 'Vegana' && !comida.vegano) return false

    const contenido = normalizar([comida.nombre, ...comida.ingredientes].join(' '))
    return !separarPorComas(perfil.otros).some((evitar) => contenido.includes(normalizar(evitar)))
}

// Simulación de la IA: arma una receta con plantillas, todavía no llama a ningún modelo.
const FORMAS = [
    {
        titulo: (nombre) => `Tazón de ${nombre}`,
        minutos: 20,
        cocina: ['Limón', 'Cilantro'],
        pasos: (nombre) => [
            `Calienta ${nombre} a fuego medio hasta que humee.`,
            'Exprime el limón y prueba para ajustar la sal.',
            'Sirve en un tazón hondo mientras sigue caliente.',
            'Termina con cilantro picado.',
        ],
    },
    {
        titulo: (nombre) => `${nombre} al sartén`,
        minutos: 25,
        cocina: ['Ajo', 'Cebolla', 'Aceite'],
        pasos: (nombre) => [
            'Sofríe el ajo y la cebolla con poco aceite.',
            `Agrega ${nombre} y mezcla a fuego alto.`,
            'Deja que se dore por abajo sin mover por dos minutos.',
            'Sirve de inmediato para conservar la textura.',
        ],
    },
    {
        titulo: (nombre) => `Tacos de ${nombre}`,
        minutos: 15,
        cocina: ['Tortillas de maíz', 'Salsa', 'Cebolla'],
        pasos: (nombre) => [
            `Pica ${nombre} en trozos pequeños y caliéntalo.`,
            'Calienta las tortillas en un comal hasta que se inflen.',
            'Rellena cada tortilla y agrega cebolla picada.',
            'Termina con salsa al gusto.',
        ],
    },
]

const FORMAS_PAN = [
    {
        titulo: (nombre) => `Tostadas de ${nombre}`,
        minutos: 10,
        cocina: ['Jitomate', 'Aceite de oliva', 'Sal'],
        pasos: (nombre) => [
            `Rebana ${nombre} y tuéstalo hasta que esté dorado.`,
            'Pica el jitomate y mézclalo con aceite y sal.',
            'Reparte la mezcla sobre cada rebanada.',
            'Sirve enseguida para que no se humedezca.',
        ],
    },
    {
        titulo: (nombre) => `${nombre} con hierbas al horno`,
        minutos: 20,
        cocina: ['Aceite de oliva', 'Orégano', 'Ajo'],
        pasos: (nombre) => [
            'Mezcla el aceite con el orégano y el ajo picado.',
            `Corta ${nombre} y barnízalo con la mezcla.`,
            'Hornea diez minutos hasta que esté crujiente.',
            'Deja reposar un minuto antes de servir.',
        ],
    },
]

export function crearReceta(comida, perfil, variante) {
    const formas = comida.tipo === 'Panadería' ? FORMAS_PAN : FORMAS
    const evitar = separarPorComas(perfil.otros).map(normalizar)
    const posibles = formas.filter((forma) =>
        !forma.cocina.some((ingrediente) => evitar.some((palabra) => normalizar(ingrediente).includes(palabra)))
    )
    const lista = posibles.length > 0 ? posibles : formas
    const forma = lista[variante % lista.length]
    const nombre = comida.nombre.toLowerCase()
    const titulo = forma.titulo(nombre)

    const quierePicante = normalizar(perfil.gusta).includes('picante') && !evitar.some((palabra) => 'chile'.includes(palabra))

    return {
        titulo: titulo.charAt(0).toUpperCase() + titulo.slice(1),
        minutos: forma.minutos,
        recoges: comida.ingredientes.length > 0 ? comida.ingredientes : [comida.nombre],
        cocina: quierePicante ? [...forma.cocina, 'Chile al gusto'] : forma.cocina,
        pasos: forma.pasos(nombre),
        etiquetas: [
            ...perfil.alergias.map((alergia) => `Sin ${alergia.toLowerCase()}`),
            ...(quierePicante ? ['Picante, como te gusta'] : []),
        ],
    }
}
