import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { movimientoReducido } from '../animacion/animaciones.js'
import { useNavegarSuave } from '../animacion/navegacion.js'
import MascotaMiga from './MascotaMiga.jsx'
import styles from './BotonMascota.module.css'

// Tiempo para ver la acción de la mascota antes de cambiar de página
const TIEMPO_ACCION = 950

// Botón con un espacio reservado donde Migui se asoma al pasar el cursor.
// Al hacer clic realiza su acción ('busca', 'manos' o 'enferma') y luego navega.
export default function BotonMascota({ to, accion, variante = 'principal', children }) {
    const navegarSuave = useNavegarSuave()
    const [enAccion, setEnAccion] = useState(false)
    const [encima, setEncima] = useState(false)
    const espera = useRef(null)

    useEffect(() => () => clearTimeout(espera.current), [])

    function alHacerClick(evento) {
        const abreOtraPestana = evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey
        if (abreOtraPestana || evento.button !== 0 || movimientoReducido()) return

        evento.preventDefault()
        if (enAccion) return

        setEnAccion(true)
        espera.current = setTimeout(() => navegarSuave(to), TIEMPO_ACCION)
    }

    const pose = enAccion ? accion : encima ? 'feliz' : 'tranquila'

    return (
        <Link
            to={to}
            className={`btn btn_${variante} ${styles.boton}`}
            data-en-accion={enAccion ? accion : undefined}
            onClick={alHacerClick}
            onPointerEnter={(evento) => evento.pointerType === 'mouse' && setEncima(true)}
            onPointerLeave={() => setEncima(false)}
            onFocus={(evento) => evento.target.matches(':focus-visible') && setEncima(true)}
            onBlur={() => setEncima(false)}
        >
            <span className={styles.espacio} aria-hidden="true">
                <span className={styles.migas}><i></i><i></i><i></i></span>
                <span className={styles.mascota}><MascotaMiga pose={pose} tamano={48} /></span>
            </span>
            {children}
        </Link>
    )
}
