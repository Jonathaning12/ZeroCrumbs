import { useRef, useState } from 'react'
import { rafagaMigajas, sacudir } from '../animacion/animaciones.js'
import { TIPOS } from '../datos/comidas.js'
import Enlace from './Enlace.jsx'
import { Flecha } from './Iconos.jsx'
import MascotaMiga from './MascotaMiga.jsx'
import PillsAlergia from './PillsAlergia.jsx'
import styles from './FormDonante.module.css'

export default function FormDonante({ datos, alCambiar, alPublicar, alReiniciar }) {
    const [errores, setErrores] = useState({})
    const [publicada, setPublicada] = useState(false)
    const botonPublicar = useRef(null)
    const exito = useRef(null)

    function cambiarCampo(evento) {
        const { name, value, type, checked } = evento.target
        alCambiar(name, type === 'checkbox' ? checked : value)
        if (errores[name]) setErrores((actuales) => ({ ...actuales, [name]: false }))
    }

    function alternarAlergeno(alergia) {
        alCambiar('alergenos', datos.alergenos.includes(alergia)
            ? datos.alergenos.filter((item) => item !== alergia)
            : [...datos.alergenos, alergia])
    }

    function enviar(evento) {
        evento.preventDefault()

        const faltantes = {
            nombre: !datos.nombre.trim(),
            kilos: !(Number(datos.kilos) > 0),
        }
        setErrores(faltantes)

        if (faltantes.nombre || faltantes.kilos) {
            sacudir(botonPublicar.current)
            return
        }

        rafagaMigajas(botonPublicar.current, 26)
        alPublicar()
        setPublicada(true)
    }

    function registrarOtra() {
        setPublicada(false)
        alReiniciar()
    }

    if (publicada) {
        return (
            <div ref={exito} className={styles.exito} role="status">
                <MascotaMiga pose="manos" tamano={108} />
                <h2>¡Tu comida ya está publicada!</h2>
                <p>Quien busque comida ya la puede ver, si es compatible con su perfil.</p>
                <div className={styles.acciones}>
                    <button className="btn btn_secundario" type="button" onClick={registrarOtra}>Registrar otra</button>
                    <Enlace className="btn btn_principal" to="/comida">Ver comida disponible <Flecha /></Enlace>
                </div>
            </div>
        )
    }

    return (
        <form className={styles.form} onSubmit={enviar} noValidate>
            <fieldset className={styles.etapa} data-a="etapa">
                <legend>La comida</legend>
                <div className={`campo ${styles.campo_completo}`}>
                    <label htmlFor="nombre">Nombre del plato o producto</label>
                    <input id="nombre" name="nombre" type="text" placeholder="Ej.: arroz con pollo" value={datos.nombre} onChange={cambiarCampo} aria-invalid={errores.nombre || undefined} aria-describedby={errores.nombre ? 'error-nombre' : undefined} />
                    {errores.nombre && <span id="error-nombre" className={styles.error}>Escribe qué comida es.</span>}
                </div>
                <div className="campo">
                    <label htmlFor="kilos">Kilos que sobraron</label>
                    <input id="kilos" name="kilos" type="number" min="0" step="0.5" placeholder="Ej.: 6" value={datos.kilos} onChange={cambiarCampo} aria-invalid={errores.kilos || undefined} aria-describedby={errores.kilos ? 'error-kilos' : undefined} />
                    {errores.kilos && <span id="error-kilos" className={styles.error}>Indica cuántos kilos hay.</span>}
                </div>
                <div className="campo">
                    <label htmlFor="tipo">Tipo de comida</label>
                    <select id="tipo" name="tipo" value={datos.tipo} onChange={cambiarCampo}>
                        {TIPOS.map((tipo) => <option key={tipo}>{tipo}</option>)}
                    </select>
                </div>
            </fieldset>

            <fieldset className={styles.etapa} data-a="etapa">
                <legend>Qué lleva</legend>
                <div className={`campo ${styles.campo_completo}`}>
                    <label htmlFor="ingredientes">Ingredientes, separados por comas</label>
                    <input id="ingredientes" name="ingredientes" type="text" placeholder="Ej.: arroz, pollo, zanahoria" value={datos.ingredientes} onChange={cambiarCampo} />
                </div>
                <div className={`${styles.grupo} ${styles.campo_completo}`}>
                    <span className={styles.grupo_titulo}>Alérgenos que contiene</span>
                    <PillsAlergia elegidas={datos.alergenos} alCambiar={alternarAlergeno} />
                </div>
                <label className={`${styles.casilla} ${styles.campo_completo}`}>
                    <input type="checkbox" name="contactoCruzado" checked={datos.contactoCruzado} onChange={cambiarCampo} />
                    <span>En esta cocina también se manipulan otros alérgenos, como maní o mariscos.</span>
                </label>
            </fieldset>

            <fieldset className={styles.etapa} data-a="etapa">
                <legend>Seguridad y recogida</legend>
                <div className="campo">
                    <label htmlFor="preparado">Preparado el</label>
                    <input id="preparado" name="preparado" type="datetime-local" value={datos.preparado} onChange={cambiarCampo} />
                </div>
                <div className="campo">
                    <label htmlFor="limite">Consumir antes de</label>
                    <input id="limite" name="limite" type="datetime-local" value={datos.limite} onChange={cambiarCampo} />
                </div>
                <div className="campo">
                    <label htmlFor="conservacion">Conservación</label>
                    <select id="conservacion" name="conservacion" value={datos.conservacion} onChange={cambiarCampo}>
                        <option>Refrigerado</option>
                        <option>Congelado</option>
                        <option>Temperatura ambiente</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="lugar">Lugar de recogida</label>
                    <input id="lugar" name="lugar" type="text" placeholder="Ej.: Comedor Central" value={datos.lugar} onChange={cambiarCampo} />
                </div>
            </fieldset>

            <div className={styles.acciones} data-a="etapa">
                <Enlace className="btn btn_secundario" to="/">Cancelar</Enlace>
                <button ref={botonPublicar} className="btn btn_principal" type="submit">Publicar comida</button>
            </div>
        </form>
    )
}
