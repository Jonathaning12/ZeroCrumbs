import { useRef } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger, useGSAP } from '../animacion/animaciones.js'
import Enlace from './Enlace.jsx'
import styles from './Header.module.css'

const LINKS = [
    { texto: 'Donar comida', ruta: '/donante' },
    { texto: 'Comida disponible', ruta: '/comida' },
]

export default function Header({ sobreFoto = false }) {
    const header = useRef(null)
    const { pathname } = useLocation()

    // Sobre una foto es transparente, y al bajar toma fondo para seguir legible
    useGSAP(() => {
        if (!sobreFoto) return
        ScrollTrigger.create({
            start: 60,
            end: 'max',
            toggleClass: { targets: header.current, className: styles.solido },
        })
    }, { scope: header })

    return (
        <header ref={header} className={`${styles.app_header} ${sobreFoto ? styles.sobre_foto : styles.solido}`}>
            <div className={styles.contenido}>
                <Enlace className={styles.app_title} to="/">ZeroCrumbs</Enlace>
                <nav className={styles.links} aria-label="Principal">
                    {LINKS.map((link) => (
                        <Enlace
                            key={link.ruta}
                            className={styles.link}
                            to={link.ruta}
                            aria-current={pathname === link.ruta ? 'page' : undefined}
                        >
                            {link.texto}
                        </Enlace>
                    ))}
                </nav>
                <Enlace className={`btn btn_secundario btn_chico ${styles.perfil}`} to="/usuario">Mi perfil</Enlace>
            </div>
        </header>
    )
}
