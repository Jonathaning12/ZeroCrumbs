import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

// Cada página nueva empieza desde arriba
export default function ArribaAlCambiar() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
