import { useEffect, useRef, useState } from 'react'
import { useApp } from '../datos/contexto.js'
import MascotaMiga from './MascotaMiga.jsx'
import PillsAlergia from './PillsAlergia.jsx'
import styles from './Alergias.module.css'

const FRASE_INICIAL = 'Toca lo que te hace daño y lo oculto de tu lista.'
const TIEMPO_REACCION = 2300

export default function Alergias() {
    const { perfil, cambiarPerfil, alternarAlergia } = useApp()
    const [pose, setPose] = useState('tranquila')
    const [frase, setFrase] = useState(FRASE_INICIAL)
    const espera = useRef(null)
    const total = perfil.alergias.length

    useEffect(() => () => clearTimeout(espera.current), [])

    function cambiarCampo(evento) {
        cambiarPerfil(evento.target.name, evento.target.value)
    }

    // Migui se enferma al marcar una alergia y se recupera poco después
    function cambiarAlergia(alergia) {
        const activando = !perfil.alergias.includes(alergia)
        alternarAlergia(alergia)

        setPose(activando ? 'enferma' : 'feliz')
        setFrase(activando
            ? `¡Achú! Nada de ${alergia.toLowerCase()} para ti.`
            : `¡Uf! Ya me siento mejor con ${alergia.toLowerCase()}.`)

        clearTimeout(espera.current)
        espera.current = setTimeout(() => setPose('tranquila'), TIEMPO_REACCION)
    }

    return (
        <form className={styles.form} onSubmit={(evento) => evento.preventDefault()}>
            <section className={styles.seccion} data-a="seccion">
                <div className={styles.encabezado}>
                    <h2>Mis alergias</h2>
                    <p aria-live="polite">
                        {total === 0 ? 'Toca para seleccionar' : `${total} ${total === 1 ? 'seleccionada' : 'seleccionadas'}`}
                    </p>
                </div>

                <div className={styles.migui} aria-hidden="true">
                    <MascotaMiga pose={pose} tamano={84} />
                    <p key={frase} className={styles.globo}>{frase}</p>
                </div>

                <PillsAlergia elegidas={perfil.alergias} alCambiar={cambiarAlergia} />
                <div className="campo">
                    <label htmlFor="otros">¿Otros ingredientes que debas evitar?</label>
                    <input id="otros" name="otros" type="text" placeholder="Ej.: cebolla, ajo" value={perfil.otros} onChange={cambiarCampo} />
                </div>
            </section>

            <section className={styles.seccion} data-a="seccion">
                <h2>Mis gustos</h2>
                <div className={styles.gustos}>
                    <div className="campo">
                        <label htmlFor="dieta">Tipo de dieta</label>
                        <select id="dieta" name="dieta" value={perfil.dieta} onChange={cambiarCampo}>
                            <option>Ninguna</option>
                            <option>Vegetariana</option>
                            <option>Vegana</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="tiempo">Tiempo de preparación</label>
                        <select id="tiempo" name="tiempo" value={perfil.tiempo} onChange={cambiarCampo}>
                            <option>Rápido</option>
                            <option>Medio</option>
                            <option>Largo</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="gusta">Me gusta</label>
                        <input id="gusta" name="gusta" type="text" placeholder="Ej.: picante, dulce" value={perfil.gusta} onChange={cambiarCampo} />
                    </div>
                    <div className="campo">
                        <label htmlFor="noGusta">No me gusta</label>
                        <input id="noGusta" name="noGusta" type="text" placeholder="Ej.: amargo, salado" value={perfil.noGusta} onChange={cambiarCampo} />
                    </div>
                </div>
            </section>
        </form>
    )
}
