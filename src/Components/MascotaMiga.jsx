import { useId } from 'react'
import styles from './MascotaMiga.module.css'

// Migui, la migajita de ZeroCrumbs.
// pose: 'tranquila' | 'feliz' | 'busca' | 'manos' | 'enferma'
export default function MascotaMiga({ pose = 'tranquila', tamano = 44 }) {
    const id = useId()
    const degradado = `miga-${id}`

    return (
        <svg className={styles.mascota} data-pose={pose} width={tamano} height={tamano} viewBox="0 0 64 64" aria-hidden="true">
            <defs>
                <radialGradient id={degradado} cx="38%" cy="30%" r="78%">
                    <stop offset="0%" stopColor="#FFEBC2" />
                    <stop offset="58%" stopColor="#F2C37F" />
                    <stop offset="100%" stopColor="#CF8B3D" />
                </radialGradient>
            </defs>

            {/* Brazo izquierdo con tomate */}
            <g className={styles.brazo_izq}>
                <path d="M18 41 L9 24" fill="none" stroke="#5A3412" strokeWidth="3" strokeLinecap="round" />
                <circle cx="9" cy="23" r="2.7" fill="#F2C37F" stroke="#5A3412" strokeWidth="1.3" />
                <g className={styles.comida}>
                    <circle cx="8.5" cy="14" r="6.2" fill="#D9472E" stroke="#5A1A0E" strokeWidth="1.2" />
                    <path d="M8.5 8.4 l-2.4 -1.6 M8.5 8.4 l2.4 -1.6 M8.5 8.4 v-2.4" stroke="#3F7A35" strokeWidth="1.5" strokeLinecap="round" />
                    <ellipse cx="6.4" cy="12.2" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.65" />
                </g>
            </g>

            {/* Brazo derecho con pan */}
            <g className={styles.brazo_der}>
                <path d="M46 41 L55 24" fill="none" stroke="#5A3412" strokeWidth="3" strokeLinecap="round" />
                <circle cx="55" cy="23" r="2.7" fill="#F2C37F" stroke="#5A3412" strokeWidth="1.3" />
                <g className={styles.comida}>
                    <path d="M48.6 17.6 c0 -6.4 3.4 -9.4 7.4 -9.4 s7.4 3 7.4 9.4 c0 1.4 -1 2 -2 2 h-10.8 c-1 0 -2 -.6 -2 -2z" fill="#C67A2C" stroke="#5A3412" strokeWidth="1.2" />
                    <path d="M53 11.4 l-1.2 4 M57 10.8 l-.6 4.4 M60.4 12.4 l.2 3.6" stroke="#F7DFAE" strokeWidth="1.1" strokeLinecap="round" />
                </g>
            </g>

            {/* Cuerpo */}
            <g className={styles.cuerpo}>
                <path
                    d="M15 39c-2-8 3-16 10-18 3-3 10-4 14-1 6 0 11 5 11 12 3 5 1 12-4 15-3 5-10 7-15 5-7 1-15-6-16-13z"
                    fill={`url(#${degradado})`}
                    stroke="#5A3412"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
                {/* Tono verdoso cuando se enferma */}
                <path
                    className={styles.verde}
                    d="M15 39c-2-8 3-16 10-18 3-3 10-4 14-1 6 0 11 5 11 12 3 5 1 12-4 15-3 5-10 7-15 5-7 1-15-6-16-13z"
                    fill="#9CC36A"
                />
                <circle cx="21" cy="30" r="1.4" fill="#C98B44" />
                <circle cx="42" cy="27" r="1.2" fill="#C98B44" />
                <circle cx="44" cy="44" r="1.5" fill="#C98B44" />
                <circle cx="24" cy="49" r="1.2" fill="#C98B44" />
                <circle cx="33" cy="25" r="0.9" fill="#C98B44" />

                <ellipse cx="22" cy="42" rx="2.8" ry="1.8" fill="#EE8E6A" opacity="0.65" />
                <ellipse cx="42" cy="42" rx="2.8" ry="1.8" fill="#EE8E6A" opacity="0.65" />

                <g className={styles.ojos}>
                    <circle cx="26" cy="36" r="2.6" fill="#2B1808" />
                    <circle cx="38" cy="36" r="2.6" fill="#2B1808" />
                    <circle cx="26.9" cy="35" r="0.9" fill="#FFFFFF" />
                    <circle cx="38.9" cy="35" r="0.9" fill="#FFFFFF" />
                </g>

                {/* Ojos mareados */}
                <g className={styles.ojos_mareados} fill="none" stroke="#2B1808" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M23.4 33.6 l5 5 M28.4 33.6 l-5 5" />
                    <path d="M35.6 33.6 l5 5 M40.6 33.6 l-5 5" />
                </g>
                <path className={styles.boca_mal} d="M25.6 44.4 q2.1 -3 4.2 0 t4.2 0 t4.2 0" fill="none" stroke="#2B1808" strokeWidth="1.8" strokeLinecap="round" />

                <g className={styles.termometro}>
                    <path d="M36 43.4 L47 37.6" stroke="#F4F7F8" strokeWidth="3.2" strokeLinecap="round" />
                    <path d="M36 43.4 L42 40.2" stroke="#D9472E" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="35.8" cy="43.5" r="2.1" fill="#D9472E" stroke="#5A1A0E" strokeWidth="0.8" />
                </g>

                <path className={styles.gota} d="M19 21 c-2.4 3.2 -3.4 4.8 -3.4 6.3 a3.4 3.4 0 0 0 6.8 0 c0 -1.5 -1 -3.1 -3.4 -6.3z" fill="#9BD6EE" stroke="#35708C" strokeWidth="1" />

                <path className={styles.boca_tranquila} d="M28 42 q4 3.6 8 0" fill="none" stroke="#2B1808" strokeWidth="1.8" strokeLinecap="round" />
                <path className={styles.boca_feliz} d="M26.5 41 h11 c0 4.6 -2.6 7 -5.5 7 s-5.5 -2.4 -5.5 -7z" fill="#7A2412" stroke="#2B1808" strokeWidth="1.4" strokeLinejoin="round" />
            </g>

            {/* Lupa */}
            <g className={styles.lupa}>
                <path d="M47.4 42 L55.5 50.5" stroke="#5A3412" strokeWidth="3.4" strokeLinecap="round" />
                <circle cx="42" cy="36.5" r="7.4" fill="#DDF1F2" fillOpacity="0.3" stroke="#2B1808" strokeWidth="2.1" />
                <path d="M38 34.2 a4.6 4.6 0 0 1 3.5 -2.6" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            </g>
        </svg>
    )
}
