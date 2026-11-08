import { useMemo, useState } from 'react'
import { COMIDAS_EJEMPLO, esCompatible } from './comidas.js'
import { ContextoApp } from './contexto.js'

const PERFIL_INICIAL = {
    alergias: [],
    otros: '',
    dieta: 'Ninguna',
    tiempo: 'Rápido',
    gusta: '',
    noGusta: '',
}

// Guarda lo que comparten las páginas: el perfil y la comida publicada
export default function ProveedorApp({ children }) {
    const [perfil, setPerfil] = useState(PERFIL_INICIAL)
    const [comidas, setComidas] = useState(COMIDAS_EJEMPLO)

    const valor = useMemo(() => ({
        perfil,
        comidas,
        compatibles: comidas.filter((comida) => esCompatible(comida, perfil)),
        cambiarPerfil: (campo, dato) => setPerfil((actual) => ({ ...actual, [campo]: dato })),
        alternarAlergia: (alergia) => setPerfil((actual) => ({
            ...actual,
            alergias: actual.alergias.includes(alergia)
                ? actual.alergias.filter((item) => item !== alergia)
                : [...actual.alergias, alergia],
        })),
        agregarComida: (comida) => setComidas((actuales) => [comida, ...actuales]),
    }), [perfil, comidas])

    return <ContextoApp.Provider value={valor}>{children}</ContextoApp.Provider>
}
