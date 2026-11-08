import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { aparecerAlBajar, gsap, movimientoReducido, rafagaMigajas, revelarPalabras, useAnimar } from '../animacion/animaciones.js'
import Enlace from '../Components/Enlace.jsx'
import Header from '../Components/Header.jsx'
import { Check, Flecha } from '../Components/Iconos.jsx'
import MascotaMiga from '../Components/MascotaMiga.jsx'
import { crearReceta, esCompatible, textoLimite } from '../datos/comidas.js'
import { useApp } from '../datos/contexto.js'
import styles from './Receta.module.css'

const TIEMPO_CREANDO = 1400

export default function Receta() {
    const { id } = useParams()
    const { comidas, perfil } = useApp()
    const comida = comidas.find((item) => item.id === id)

    if (!comida) {
        return (
            <>
                <Header />
                <main className={styles.no_encontrada}>
                    <h1>No encontramos esa comida</h1>
                    <Enlace className="btn btn_principal" to="/comida">Ver comida disponible</Enlace>
                </main>
            </>
        )
    }

    return <PlatoCreado comida={comida} perfil={perfil} />
}

function PlatoCreado({ comida, perfil }) {
    const pagina = useRef(null)
    const cargador = useRef(null)
    const botonApartar = useRef(null)
    const [variante, setVariante] = useState(0)
    const [creando, setCreando] = useState(() => !movimientoReducido())
    const [hechos, setHechos] = useState([])
    const [apartada, setApartada] = useState(false)
    const compatible = esCompatible(comida, perfil)
    const receta = crearReceta(comida, perfil, variante)

    // La pausa muestra el momento de "crear"; la IA real irá aquí más adelante
    useEffect(() => {
        if (!creando) return undefined
        const espera = setTimeout(() => setCreando(false), TIEMPO_CREANDO)
        return () => clearTimeout(espera)
    }, [creando])

    useAnimar(cargador, () => {
        if (!creando) return
        gsap.fromTo('[data-a="miga"]',
            { y: 0, autoAlpha: 0.25 },
            { y: -14, autoAlpha: 1, duration: 0.42, ease: 'sine.inOut', stagger: { each: 0.1, repeat: -1, yoyo: true } })
    }, [creando])

    useAnimar(pagina, () => {
        if (creando) return

        const entrada = gsap.timeline()
        entrada
            .from('[data-a="foto"]', { scale: 1.14, duration: 2 }, 0)
            .from('[data-a="sello"]', { y: 12, autoAlpha: 0 }, 0.1)
            .add(revelarPalabras('[data-a="titulo"]', { stagger: 0.05 }), 0.15)
            .from('[data-a="etiqueta"]', { y: 12, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, 0.7)

        gsap.to('[data-a="foto"]', {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: '[data-a="portada"]', start: 'top top', end: 'bottom top', scrub: true },
        })

        aparecerAlBajar('[data-a="ingredientes"]', '[data-a="contenido"]', { delay: 0.45 })
        aparecerAlBajar('[data-a="paso"], [data-a="final"]', '[data-a="contenido"]', { stagger: 0.09, delay: 0.55 })
    }, [creando, variante])

    function crearOtro() {
        setHechos([])
        setApartada(false)
        setVariante((actual) => actual + 1)
        if (movimientoReducido()) return
        setCreando(true)
        window.scrollTo({ top: 0, behavior: 'instant' })
    }

    function alternarPaso(indice) {
        setHechos((actuales) => actuales.includes(indice)
            ? actuales.filter((item) => item !== indice)
            : [...actuales, indice])
    }

    function apartar() {
        if (apartada) return
        setApartada(true)
        rafagaMigajas(botonApartar.current, 24)
    }

    return (
        <>
            <Header sobreFoto />

            {creando && (
                <div ref={cargador} className={styles.creando} role="status">
                    <MascotaMiga pose="busca" tamano={120} />
                    <div className={styles.migas} aria-hidden="true">
                        <span data-a="miga"></span><span data-a="miga"></span><span data-a="miga"></span><span data-a="miga"></span><span data-a="miga"></span>
                    </div>
                    <p>Creando un plato con {comida.nombre.toLowerCase()}</p>
                </div>
            )}

            <main ref={pagina} className={creando ? styles.oculto : undefined}>
                <section className={styles.portada} data-a="portada">
                    <div className={styles.portada_foto}>
                        <img src={comida.foto} alt={comida.nombre} data-a="foto" style={{ objectPosition: comida.posicion }} />
                    </div>
                    <div className={styles.portada_velo} aria-hidden="true"></div>
                    <div className={styles.portada_contenido}>
                        <span className={styles.sello} data-a="sello">Plato creado con IA para ti</span>
                        <h1 key={receta.titulo} data-a="titulo">{receta.titulo}</h1>
                        <div className={styles.etiquetas}>
                            {receta.etiquetas.map((etiqueta) => (
                                <span key={etiqueta} className="etiqueta etiqueta_seguro" data-a="etiqueta">{etiqueta}</span>
                            ))}
                            <span className="etiqueta" data-a="etiqueta">{receta.minutos} minutos</span>
                            <span className="etiqueta" data-a="etiqueta">{textoLimite(comida.limite)}</span>
                        </div>
                    </div>
                </section>

                <div className={styles.contenido} data-a="contenido">
                    <aside className={styles.ingredientes} data-a="ingredientes">
                        <div>
                            <h2>Lo que recoges</h2>
                            <ul>{receta.recoges.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div className={styles.ingredientes_cocina}>
                            <h2>De tu cocina</h2>
                            <ul>{receta.cocina.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                    </aside>

                    <section className={styles.preparacion}>
                        <div className={styles.preparacion_encabezado}>
                            <h2>Cómo prepararlo</h2>
                            <span aria-live="polite">{hechos.length} de {receta.pasos.length}</span>
                        </div>
                        <div className={styles.barra} aria-hidden="true">
                            <span style={{ transform: `scaleX(${hechos.length / receta.pasos.length})` }}></span>
                        </div>

                        <ol className={styles.pasos}>
                            {receta.pasos.map((paso, indice) => {
                                const hecho = hechos.includes(indice)
                                return (
                                    <li key={paso} data-a="paso">
                                        <button
                                            type="button"
                                            className={`${styles.paso} ${hecho ? styles.paso_hecho : ''}`}
                                            aria-pressed={hecho}
                                            onClick={() => alternarPaso(indice)}
                                        >
                                            <span className={styles.paso_numero} aria-hidden="true">
                                                <span>{indice + 1}</span>
                                                <Check tamano={20} />
                                            </span>
                                            <span className={styles.paso_texto}>{paso}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ol>

                        <p className={styles.aviso} data-a="final">
                            {compatible
                                ? 'Demostración: la IA real aún no está conectada. Si tienes una alergia grave, confirma los ingredientes con quien dona.'
                                : 'Cuidado: esta comida no es compatible con tu perfil. Revisa los ingredientes antes de comerla.'}
                        </p>

                        <div className={styles.acciones} data-a="final">
                            <button
                                ref={botonApartar}
                                type="button"
                                className={`btn btn_principal ${styles.apartar} ${apartada ? styles.apartada : ''}`}
                                onClick={apartar}
                            >
                                {apartada ? <><Check /> Comida apartada</> : 'Apartar esta comida'}
                            </button>
                            <button type="button" className="btn btn_secundario" onClick={crearOtro}>Crear otro plato</button>
                            <Enlace className="btn btn_secundario" to="/comida">Volver a la lista <Flecha /></Enlace>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
