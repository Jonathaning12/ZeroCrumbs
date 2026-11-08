import { textoLimite } from '../datos/comidas.js'
import Enlace from './Enlace.jsx'
import { Flecha } from './Iconos.jsx'
import styles from './TarjetaComida.module.css'

export default function TarjetaComida({ comida, destacada = false }) {
    const clase = `${styles.tarjeta} ${destacada ? styles.destacada : ''}`

    return (
        <article className={clase} data-tarjeta data-flip-id={comida.id} data-comida={comida.id}>
            <div className={styles.foto}>
                <img src={comida.foto} alt={comida.nombre} style={{ objectPosition: comida.posicion }} />
            </div>
            <div className={styles.info}>
                {destacada && <span className={styles.aviso}>Se acaba pronto</span>}
                <h2>{comida.nombre}</h2>
                <p className={styles.datos}>{comida.kilos} kg · {textoLimite(comida.limite)}</p>
                {comida.alergenos.length > 0 && (
                    <div className={styles.etiquetas}>
                        {comida.alergenos.map((alergeno) => (
                            <span key={alergeno} className="etiqueta etiqueta_alerta">Contiene {alergeno.toLowerCase()}</span>
                        ))}
                    </div>
                )}
                <Enlace
                    className={`btn btn_chico ${destacada ? 'btn_principal' : 'btn_secundario'} ${styles.accion}`}
                    to={`/receta/${comida.id}`}
                >
                    Crear plato con IA <Flecha />
                </Enlace>
            </div>
        </article>
    )
}
