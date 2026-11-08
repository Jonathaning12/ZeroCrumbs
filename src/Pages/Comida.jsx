import { useLayoutEffect, useRef } from 'react'
import { Flip, gsap, movimientoReducido, revelarPalabras, useAnimar, useNumeroAnimado } from '../animacion/animaciones.js'
import Enlace from '../Components/Enlace.jsx'
import Header from '../Components/Header.jsx'
import { Check } from '../Components/Iconos.jsx'
import MascotaMiga from '../Components/MascotaMiga.jsx'
import PillsAlergia from '../Components/PillsAlergia.jsx'
import TarjetaComida from '../Components/TarjetaComida.jsx'
import { esCompatible } from '../datos/comidas.js'
import { useApp } from '../datos/contexto.js'
import styles from './Comida.module.css'

export default function Comida() {
    const pagina = useRef(null)
    const lista = useRef(null)
    const estadoFlip = useRef(null)
    const animacionFlip = useRef(null)
    const ocupado = useRef(false)
    const { comidas, compatibles, perfil, alternarAlergia } = useApp()
    const numero = useNumeroAnimado(compatibles.length)

    useAnimar(pagina, () => {
        const entrada = gsap.timeline()
        entrada
            .add(revelarPalabras('[data-a="titulo"]'), 0)
            .from('[data-a="subtitulo"], [data-a="filtros"]', { y: 18, autoAlpha: 0, stagger: 0.1 }, 0.35)
            .from('[data-tarjeta]', {
                y: 46,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.09,
                clearProps: 'transform,opacity,visibility',
            }, 0.45)
    })

    // Al marcar una alergia, lo incompatible se va y el resto se reacomoda hacia su nuevo lugar
    function cambiarFiltro(alergia) {
        if (ocupado.current) return
        animacionFlip.current?.progress(1)

        if (movimientoReducido()) {
            alternarAlergia(alergia)
            return
        }

        const siguientes = perfil.alergias.includes(alergia)
            ? perfil.alergias.filter((item) => item !== alergia)
            : [...perfil.alergias, alergia]
        const quedan = comidas.filter((comida) => esCompatible(comida, { ...perfil, alergias: siguientes }))
        const tarjetas = gsap.utils.toArray('[data-tarjeta]', lista.current)
        const salen = tarjetas.filter((tarjeta) => !quedan.some((comida) => comida.id === tarjeta.dataset.comida))

        const aplicar = () => {
            estadoFlip.current = Flip.getState(tarjetas)
            ocupado.current = false
            alternarAlergia(alergia)
        }

        if (salen.length === 0) {
            aplicar()
            return
        }

        ocupado.current = true
        gsap.to(salen, { autoAlpha: 0, scale: 0.95, duration: 0.2, ease: 'power2.out', onComplete: aplicar })
    }

    useLayoutEffect(() => {
        if (!estadoFlip.current) return
        const estado = estadoFlip.current
        estadoFlip.current = null

        animacionFlip.current = Flip.from(estado, {
            targets: gsap.utils.toArray('[data-tarjeta]', lista.current),
            duration: 0.7,
            ease: 'power3.inOut',
            absolute: true,
            stagger: 0.02,
            onEnter: (nuevas) => gsap.fromTo(nuevas, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.55, delay: 0.25 }),
        })
    }, [compatibles])

    useLayoutEffect(() => () => animacionFlip.current?.kill(), [])

    const totalAlergias = perfil.alergias.length

    return (
        <>
            <Header />
            <main ref={pagina} className={styles.pagina}>
                <div className={styles.encabezado}>
                    <div>
                        <h1 data-a="titulo">Comida compatible contigo</h1>
                        <p className={styles.subtitulo} data-a="subtitulo">
                            <span ref={numero} className={styles.numero}>{compatibles.length}</span> {compatibles.length === 1 ? 'plato disponible' : 'platos disponibles'}
                        </p>
                    </div>
                    <div className={`etiqueta etiqueta_seguro ${styles.seguro}`} data-a="subtitulo">
                        <Check />
                        {totalAlergias === 0 ? 'Marca tus alergias para ocultar lo que no puedes comer' : 'Ya ocultamos lo que contiene tus alergias'}
                    </div>
                </div>

                <div className={styles.filtros} data-a="filtros">
                    <span className={styles.filtros_titulo}>Mis alergias</span>
                    <PillsAlergia elegidas={perfil.alergias} alCambiar={cambiarFiltro} />
                </div>

                {compatibles.length === 0 ? (
                    <div className={styles.vacio} role="status">
                        <MascotaMiga pose="busca" tamano={96} />
                        <h2>No hay platos compatibles por ahora</h2>
                        <p>Quita alguna opción de tu perfil o vuelve más tarde.</p>
                        <Enlace className="btn btn_secundario" to="/usuario">Revisar mi perfil</Enlace>
                    </div>
                ) : (
                    <div ref={lista} className={styles.lista}>
                        {compatibles.map((comida, indice) => (
                            <TarjetaComida key={comida.id} comida={comida} destacada={indice === 0} />
                        ))}
                    </div>
                )}
            </main>
        </>
    )
}
