import { useRef } from 'react'
import { aparecerAlBajar, gsap, revelarPalabras, useAnimar, useNumeroAnimado } from '../animacion/animaciones.js'
import fotoRustico from '../assets/fotos/rustico.jpg'
import Alergias from '../Components/Alergias.jsx'
import BotonMascota from '../Components/BotonMascota.jsx'
import Enlace from '../Components/Enlace.jsx'
import Header from '../Components/Header.jsx'
import { useApp } from '../datos/contexto.js'
import styles from './Usuario.module.css'

export default function Usuario() {
    const pagina = useRef(null)
    const { compatibles } = useApp()
    const numero = useNumeroAnimado(compatibles.length)

    useAnimar(pagina, () => {
        const entrada = gsap.timeline()
        entrada
            .add(revelarPalabras('[data-a="titulo"]'), 0)
            .from('[data-a="descripcion"]', { y: 16, autoAlpha: 0 }, 0.45)
            .fromTo('[data-a="foto"]',
                { clipPath: 'inset(0 0 0 100%)' },
                { clipPath: 'inset(0 0 0 0%)', duration: 1.5 }, 0)
            .from('[data-a="foto-img"]', { scale: 1.2, duration: 2.2 }, 0)

        aparecerAlBajar('[data-a="seccion"], [data-a="acciones"]', '[data-a="columna"]', { stagger: 0.12, delay: 0.3 })
    })

    return (
        <>
            <Header />
            <main ref={pagina} className={styles.pagina}>
                <div className={styles.columna} data-a="columna">
                    <div>
                        <h1 data-a="titulo">Cuéntanos qué puedes comer</h1>
                        <p className={styles.descripcion} data-a="descripcion">Tus alergias ocultan los alimentos no compatibles. Tus gustos ayudan a la IA a crear el plato.</p>
                    </div>
                    <Alergias />
                    <div className={styles.acciones} data-a="acciones">
                        <Enlace className="btn btn_secundario" to="/">Volver</Enlace>
                        <BotonMascota to="/comida" accion="busca">
                            Ver comida compatible
                            <span className={styles.contador}><span ref={numero}>{compatibles.length}</span></span>
                        </BotonMascota>
                    </div>
                </div>

                <div className={styles.foto} data-a="foto">
                    <img src={fotoRustico} alt="Pan, jitomates, albahaca y queso sobre una mesa clara" data-a="foto-img" />
                </div>
            </main>
        </>
    )
}
