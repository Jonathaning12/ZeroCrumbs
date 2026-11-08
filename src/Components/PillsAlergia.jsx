import { ALERGIAS } from '../datos/comidas.js'
import { Check } from './Iconos.jsx'
import styles from './PillsAlergia.module.css'

// Cápsulas que se pueden prender y apagar
export default function PillsAlergia({ elegidas, alCambiar }) {
    return (
        <div className={styles.pills}>
            {ALERGIAS.map((alergia) => {
                const activa = elegidas.includes(alergia)

                return (
                    <button
                        key={alergia}
                        type="button"
                        aria-pressed={activa}
                        className={`${styles.pill} ${activa ? styles.pill_activa : ''}`}
                        onClick={() => alCambiar(alergia)}
                    >
                        <span className={styles.check}><Check /></span>
                        {alergia}
                    </button>
                )
            })}
        </div>
    )
}
