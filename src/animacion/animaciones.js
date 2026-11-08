import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, SplitText)

// Identidad de movimiento: entradas que frenan suave, sin rebotes salvo en las migajas
gsap.defaults({ ease: 'expo.out', duration: 0.9 })

export { gsap, Flip, ScrollTrigger, SplitText, useGSAP }

export function movimientoReducido() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Corre animaciones dentro de un contenedor y las limpia al salir de la página.
// Si la persona pidió reducir el movimiento, no se ejecuta nada.
export function useAnimar(contenedor, animar, dependencias = []) {
    useGSAP(() => {
        const medios = gsap.matchMedia()
        medios.add('(prefers-reduced-motion: no-preference)', () => animar(), contenedor.current)
        return () => medios.revert()
    }, { scope: contenedor, dependencies: dependencias, revertOnUpdate: true })
}

// Las palabras de un título suben desde atrás de una máscara
export function revelarPalabras(elemento, opciones = {}) {
    const division = SplitText.create(elemento, { type: 'words', mask: 'words', wordsClass: 'palabra' })
    return gsap.from(division.words, { yPercent: 140, duration: 1.15, stagger: 0.055, ...opciones })
}

// Aparición estándar al llegar con el scroll
export function aparecerAlBajar(elementos, disparador, opciones = {}) {
    return gsap.from(elementos, {
        y: 26,
        autoAlpha: 0,
        stagger: 0.08,
        scrollTrigger: { trigger: disparador, start: 'top 84%', once: true },
        ...opciones,
    })
}

// La foto se abre desde el centro y se mueve un poco más lento que la página
export function revelarFoto(marco) {
    const imagen = marco.querySelector('img')

    gsap.fromTo(marco,
        { clipPath: 'inset(16% 12% 16% 12% round 18px)', autoAlpha: 0 },
        {
            clipPath: 'inset(0% 0% 0% 0% round 6px)',
            autoAlpha: 1,
            duration: 1.4,
            scrollTrigger: { trigger: marco, start: 'top 85%', once: true },
        })

    gsap.fromTo(imagen,
        { yPercent: -7 },
        {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: true },
        })
}

// El rastro de migajas se va dibujando punto por punto
export function dibujarMigajas(svg) {
    gsap.from(svg.querySelectorAll('circle'), {
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 0.55,
        ease: 'back.out(3)',
        stagger: 0.07,
        scrollTrigger: { trigger: svg, start: 'top 88%', once: true },
    })
}

// Ráfaga de migajas que sale de un elemento para celebrar una acción
export function rafagaMigajas(origen, cantidad = 18) {
    if (movimientoReducido() || !origen) return

    const caja = origen.getBoundingClientRect()
    const x = caja.left + caja.width / 2
    const y = caja.top + caja.height / 2

    for (let i = 0; i < cantidad; i++) {
        const migaja = document.createElement('span')
        const tamano = gsap.utils.random(3, 8)
        migaja.setAttribute('aria-hidden', 'true')
        migaja.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${tamano}px;height:${tamano}px;border-radius:38%;background:${gsap.utils.random(['#EBA74F', '#F4BB6F', '#C98532', '#F8F3E8'])};pointer-events:none;z-index:50;`
        document.body.appendChild(migaja)

        const angulo = gsap.utils.random(-Math.PI, 0)
        const distancia = gsap.utils.random(50, 150)

        gsap.timeline({ onComplete: () => migaja.remove() })
            .to(migaja, {
                x: Math.cos(angulo) * distancia,
                y: Math.sin(angulo) * distancia,
                rotation: gsap.utils.random(-220, 220),
                duration: 0.55,
                ease: 'power3.out',
            })
            .to(migaja, {
                y: `+=${gsap.utils.random(70, 130)}`,
                autoAlpha: 0,
                duration: 0.55,
                ease: 'power2.in',
            })
    }
}

// Sacude un elemento para avisar de un error
export function sacudir(elemento) {
    if (movimientoReducido() || !elemento) return
    gsap.fromTo(elemento, { x: 0 }, {
        keyframes: { x: [0, -7, 6, -4, 3, 0] },
        duration: 0.36,
        ease: 'none',
        clearProps: 'x',
    })
}

// Un número que cuenta hasta su nuevo valor en lugar de cambiar de golpe
export function useNumeroAnimado(valor, decimales = 0) {
    const elemento = useRef(null)
    const actual = useRef(valor)

    useEffect(() => {
        const nodo = elemento.current
        if (!nodo) return undefined

        const escribir = () => { nodo.textContent = Number(actual.current.toFixed(decimales)).toString() }

        if (movimientoReducido()) {
            actual.current = valor
            escribir()
            return undefined
        }

        const conteo = { valor: actual.current }
        const animacion = gsap.to(conteo, {
            valor,
            duration: 0.5,
            ease: 'power3.out',
            onUpdate: () => {
                actual.current = conteo.valor
                escribir()
            },
        })
        return () => animacion.kill()
    }, [valor, decimales])

    return elemento
}
