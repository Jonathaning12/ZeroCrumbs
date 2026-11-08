import { useRef, useState } from 'react'
import { aparecerAlBajar, dibujarMigajas, gsap, revelarFoto, revelarPalabras, useAnimar } from '../animacion/animaciones.js'
import fotoBowl from '../assets/fotos/bowl.jpg'
import fotoBowlPollo from '../assets/fotos/bowl-pollo.jpg'
import fotoComunidad from '../assets/fotos/comunidad.jpg'
import fotoRustico from '../assets/fotos/rustico.jpg'
import fotoMesa from '../assets/fotos/mesa-gourmet.jpg'
import fotoMadera from '../assets/fotos/mesa-madera.jpg'
import fotoCasa from '../assets/fotos/platos-casa.jpg'
import fotoBrunch from '../assets/fotos/brunch.jpg'
import BotonMascota from '../Components/BotonMascota.jsx'
import Header from '../Components/Header.jsx'
import { Migajas } from '../Components/Iconos.jsx'
import MascotaMiga from '../Components/MascotaMiga.jsx'
import styles from './Login.module.css'

const BLOQUES = [
    {
        foto: fotoMadera,
        alt: 'Platos de ejotes, arroz y carne sobre una mesa de madera',
        titulo: 'Registra lo que sobró antes de que se pierda',
        texto: 'Di qué preparaste, cuántos kilos quedan, qué lleva y hasta qué hora se puede recoger.',
        boton: 'Registrar comida',
        ruta: '/donante',
        accion: 'manos',
    },
    {
        foto: fotoCasa,
        alt: 'Mesa con arroz, verduras y un guisado casero',
        titulo: 'Solo ves lo que sí puedes comer',
        texto: 'Marca tus alergias y lo que debes evitar. Lo que no sea compatible no aparece en tu lista.',
        boton: 'Indicar mis alergias',
        ruta: '/usuario',
        accion: 'enferma',
    },
    {
        foto: fotoBrunch,
        alt: 'Pan tostado, huevo y ejotes sobre una mesa de mármol',
        titulo: 'La IA crea un plato con lo que hay',
        texto: 'Elige un alimento disponible y recibe una receta hecha según tus gustos.',
        boton: 'Ver comida disponible',
        ruta: '/comida',
        accion: 'busca',
        posicion: '50% 72%',
    },
]

export default function Login() {
    const pagina = useRef(null)
    const seccionCollage = useRef(null)
    const [poseMigui, setPoseMigui] = useState('tranquila')

    useAnimar(pagina, () => {
        // Entrada del hero, en orden: la foto se asienta y luego llega el mensaje
        const entrada = gsap.timeline()
        entrada
            .from('[data-a="hero-img"]', { scale: 1.16, duration: 2.4 }, 0)
            .from('[data-a="hero-velo"]', { autoAlpha: 0, duration: 1.2, ease: 'power2.out' }, 0)
            .add(revelarPalabras('[data-a="hero-titulo"]'), 0.25)
            .from('[data-a="hero-texto"]', { y: 20, autoAlpha: 0 }, 0.85)
            .from('[data-a="hero-boton"]', { y: 18, autoAlpha: 0, stagger: 0.09 }, 0.98)

        // Franja de los dos caminos
        gsap.from('[data-a="separador"]', {
            scaleY: 0,
            duration: 1,
            scrollTrigger: { trigger: '[data-a="banda"]', start: 'top 88%', once: true },
        })
        aparecerAlBajar('[data-a="banda-item"]', '[data-a="banda"]', { stagger: 0.12 })

        // Texto del collage
        dibujarMigajas(seccionCollage.current.querySelector('[data-migajas]'))
        revelarPalabras('[data-a="titulo-collage"]', {
            duration: 1,
            stagger: 0.05,
            scrollTrigger: { trigger: '[data-a="titulo-collage"]', start: 'top 86%', once: true },
        })
        aparecerAlBajar('[data-a="texto-collage"]', '[data-a="titulo-collage"]', { delay: 0.28 })

        // Fotos del collage y Migui, que llega con la comida en las manos
        gsap.utils.toArray('[data-a="collage-foto"]').forEach((marco) => revelarFoto(marco))
        gsap.from('[data-a="migui"]', {
            y: 40,
            scale: 0.6,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'back.out(1.8)',
            scrollTrigger: {
                trigger: '[data-a="migui"]',
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    setPoseMigui('manos')
                    gsap.delayedCall(2.4, () => setPoseMigui('tranquila'))
                },
            },
        })

        // Bloques de foto y texto
        gsap.utils.toArray('[data-a="bloque"]').forEach((bloque) => {
            revelarFoto(bloque.querySelector('[data-a="marco"]'))
            dibujarMigajas(bloque.querySelector('[data-migajas]'))
            revelarPalabras(bloque.querySelector('h2'), {
                duration: 1,
                stagger: 0.035,
                scrollTrigger: { trigger: bloque.querySelector('h2'), start: 'top 86%', once: true },
            })
            aparecerAlBajar(bloque.querySelectorAll('[data-a="bloque-resto"]'), bloque.querySelector('h2'), { delay: 0.28 })
        })

        // Cierre con la mesa compartida
        gsap.fromTo('[data-a="cierre-img"]',
            { scale: 1.18 },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: { trigger: '[data-a="cierre"]', start: 'top bottom', end: 'bottom top', scrub: true },
            })
        revelarPalabras('[data-a="cierre-titulo"]', {
            stagger: 0.045,
            scrollTrigger: { trigger: '[data-a="cierre-titulo"]', start: 'top 82%', once: true },
        })
        aparecerAlBajar('[data-a="cierre-boton"]', '[data-a="cierre-titulo"]', { delay: 0.45 })
    })

    return (
        <>
            <Header sobreFoto />
            <main ref={pagina} className={styles.app_main}>

                <section className={styles.hero} data-a="hero">
                    <div className={styles.hero_foto}>
                        <img src={fotoMesa} alt="Mesa oscura con varios platos servidos" data-a="hero-img" fetchPriority="high" />
                    </div>
                    <div className={styles.hero_velo} data-a="hero-velo" aria-hidden="true"></div>

                    <div className={styles.hero_contenido}>
                        <h1 data-a="hero-titulo">Lo que sobra hoy, alimenta a alguien</h1>
                        <p data-a="hero-texto">Registra la comida que te sobró o encuentra platos compatibles con tus alergias y gustos.</p>
                        <div className={styles.hero_botones}>
                            <span data-a="hero-boton">
                                <BotonMascota to="/donante" accion="manos">Tengo comida</BotonMascota>
                            </span>
                            <span data-a="hero-boton">
                                <BotonMascota to="/usuario" accion="busca" variante="secundario">Busco comida</BotonMascota>
                            </span>
                        </div>
                    </div>
                </section>

                <section className={styles.banda} data-a="banda" aria-label="Dos caminos">
                    <div className={styles.banda_contenido}>
                        <div className={styles.camino} data-a="banda-item">
                            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EBA74F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11h16a8 8 0 0 1-16 0Z" /><path d="M9 7c0-1.5 1-1.5 1-3M14 7c0-1.5 1-1.5 1-3" /></svg>
                            <div>
                                <strong>Quien dona</strong>
                                <p>Kilos, ingredientes y hora límite de recogida</p>
                            </div>
                        </div>
                        <div className={styles.separador} data-a="separador" aria-hidden="true"></div>
                        <div className={styles.logo_banda} data-a="banda-item" aria-hidden="true">ZeroCrumbs</div>
                        <div className={styles.separador} data-a="separador" aria-hidden="true"></div>
                        <div className={styles.camino} data-a="banda-item">
                            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EBA74F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /></svg>
                            <div>
                                <strong>Quien busca</strong>
                                <p>Alergias, gustos y platos que sí puede comer</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={seccionCollage} className={styles.escena}>
                    <div className={styles.escena_texto}>
                        <Migajas />
                        <h2 data-a="titulo-collage">Empacado con cariño</h2>
                        <p data-a="texto-collage">Lo que hoy te sobra se empaca con cuidado y llega a otra mesa.</p>
                        <div className={styles.migui} data-a="migui">
                            <MascotaMiga pose={poseMigui} tamano={96} />
                            <span className={styles.migui_globo}>¡Listo para otra mesa!</span>
                        </div>
                    </div>

                    <div
                        className={styles.collage}
                        onMouseEnter={() => setPoseMigui('feliz')}
                        onMouseLeave={() => setPoseMigui('tranquila')}
                    >
                        <div className={`${styles.collage_foto} ${styles.collage_grande}`} data-a="collage-foto">
                            <img src={fotoBowlPollo} alt="Bowl de arroz con pollo y verduras" loading="lazy" />
                        </div>
                        <div className={`${styles.collage_foto} ${styles.collage_arriba}`} data-a="collage-foto">
                            <img src={fotoBowl} alt="Bowl con verduras frescas y semillas" loading="lazy" />
                        </div>
                        <div className={`${styles.collage_foto} ${styles.collage_abajo}`} data-a="collage-foto">
                            <img src={fotoRustico} alt="Comida lista para compartir sobre una mesa clara" loading="lazy" />
                        </div>
                    </div>
                </section>

                <section className={styles.bloques}>
                    {BLOQUES.map((bloque, indice) => (
                        <div key={bloque.ruta} className={`${styles.bloque} ${indice % 2 === 1 ? styles.bloque_invertido : ''}`} data-a="bloque">
                            <div className={styles.marco} data-a="marco">
                                <div className={styles.marco_zoom}>
                                    <img src={bloque.foto} alt={bloque.alt} loading="lazy" style={{ objectPosition: bloque.posicion }} />
                                </div>
                            </div>
                            <div className={styles.bloque_texto}>
                                <Migajas invertido={indice % 2 === 1} />
                                <h2>{bloque.titulo}</h2>
                                <p data-a="bloque-resto">{bloque.texto}</p>
                                <span data-a="bloque-resto">
                                    <BotonMascota to={bloque.ruta} accion={bloque.accion}>{bloque.boton}</BotonMascota>
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                <section className={styles.cierre} data-a="cierre">
                    <img src={fotoComunidad} alt="Personas compartiendo comida en una mesa larga, vista desde arriba" loading="lazy" data-a="cierre-img" />
                    <div className={styles.cierre_velo} aria-hidden="true"></div>
                    <div className={styles.cierre_contenido}>
                        <h2 data-a="cierre-titulo">Menos desperdicio, más mesas compartidas</h2>
                        <span data-a="cierre-boton">
                            <BotonMascota to="/comida" accion="busca">Ver comida disponible</BotonMascota>
                        </span>
                    </div>
                </section>

                <footer className={styles.pie}>
                    <span className={styles.pie_logo}>ZeroCrumbs</span>
                    <span>Simulación escolar contra el desperdicio de comida</span>
                </footer>
            </main>
        </>
    )
}
