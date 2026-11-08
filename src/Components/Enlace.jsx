import { Link } from 'react-router'
import { useNavegarSuave } from '../animacion/navegacion.js'

// Un Link que cambia de página con una transición suave
export default function Enlace({ to, onClick, ...resto }) {
    const navegarSuave = useNavegarSuave()

    function alHacerClick(evento) {
        onClick?.(evento)

        const abreOtraPestana = evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey
        if (evento.defaultPrevented || abreOtraPestana || evento.button !== 0) return

        evento.preventDefault()
        navegarSuave(to)
    }

    return <Link to={to} onClick={alHacerClick} {...resto} />
}
