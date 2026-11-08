import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router'
import { movimientoReducido } from './animaciones.js'

// Cambia de página con una transición suave si el navegador la soporta
export function useNavegarSuave() {
    const navegar = useNavigate()

    return useCallback((ruta) => {
        if (!document.startViewTransition || movimientoReducido()) {
            navegar(ruta)
            return
        }
        document.startViewTransition(() => {
            flushSync(() => navegar(ruta))
        })
    }, [navegar])
}
