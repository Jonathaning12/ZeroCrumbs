import { useRef, useState } from 'react'
import { aparecerAlBajar, gsap, revelarPalabras, useAnimar, useNumeroAnimado } from '../animacion/animaciones.js'
import FormDonante from '../Components/FormDonante.jsx'
import Header from '../Components/Header.jsx'
import { FOTO_POR_TIPO, TIPOS, separarPorComas, textoLimite } from '../datos/comidas.js'
import { useApp } from '../datos/contexto.js'
import styles from './Donante.module.css'

const FORM_VACIO = {
    nombre: '',
    kilos: '',
    tipo: TIPOS[0],
    ingredientes: '',
    alergenos: [],
    contactoCruzado: false,
    preparado: '',
    limite: '',
    conservacion: 'Refrigerado',
    lugar: '',
}

function horaLegible(fecha) {
    if (!fecha) return null
    return new Date(fecha).toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' })
}

export default function Donante() {
    const pagina = useRef(null)
    const { agregarComida } = useApp()
    const [datos, setDatos] = useState(FORM_VACIO)
    const kilos = Number(datos.kilos) > 0 ? Number(datos.kilos) : 0
    const numeroKilos = useNumeroAnimado(kilos, 1)
    const ingredientes = separarPorComas(datos.ingredientes)

    useAnimar(pagina, () => {
        const entrada = gsap.timeline()
        entrada
            .add(revelarPalabras('[data-a="titulo"]'), 0)
            .from('[data-a="descripcion"]', { y: 16, autoAlpha: 0 }, 0.4)
            .from('[data-a="tarjeta"]', { y: 44, autoAlpha: 0, rotate: 1.5, duration: 1.2 }, 0.35)

        aparecerAlBajar('[data-a="etapa"]', '[data-a="contenido"]', { stagger: 0.12, delay: 0.3 })
    })

    function cambiarDato(campo, valor) {
        setDatos((actuales) => ({ ...actuales, [campo]: valor }))
    }

    function publicar() {
        agregarComida({
            id: `donada-${Date.now()}`,
            nombre: datos.nombre.trim(),
            tipo: datos.tipo,
            kilos,
            limite: horaLegible(datos.limite),
            ingredientes,
            alergenos: datos.alergenos,
            contactoCruzado: datos.contactoCruzado,
            vegetariano: false,
            vegano: false,
            foto: FOTO_POR_TIPO[datos.tipo],
            posicion: '50% 50%',
        })
    }

    return (
        <>
            <Header />
            <main ref={pagina} className={styles.pagina}>
                <h1 data-a="titulo">¿Qué te sobró hoy?</h1>
                <p className={styles.descripcion} data-a="descripcion">Estos datos ayudan a filtrar alergias y a retirar lo que ya no se pueda consumir.</p>

                <div className={styles.contenido} data-a="contenido">
                    <div className={styles.columna_form}>
                        <FormDonante
                            datos={datos}
                            alCambiar={cambiarDato}
                            alPublicar={publicar}
                            alReiniciar={() => setDatos(FORM_VACIO)}
                        />
                    </div>

                    <aside className={styles.vista_previa} aria-label="Vista previa">
                        <p className={styles.vista_previa_titulo}>Así se verá para quien busca</p>
                        <article className={styles.tarjeta} data-a="tarjeta">
                            {/* Al cambiar de tipo, la key crea una imagen nueva que entra con fundido */}
                            <div className={styles.tarjeta_foto}>
                                <img key={datos.tipo} src={FOTO_POR_TIPO[datos.tipo]} alt="" />
                            </div>
                            <div className={styles.tarjeta_info}>
                                <div className={styles.tarjeta_fila}>
                                    <h2 className={datos.nombre ? '' : styles.vacio}>{datos.nombre || 'Nombre del plato'}</h2>
                                    <span className={styles.tarjeta_kilos}><span ref={numeroKilos}>0</span> kg</span>
                                </div>
                                <p className={styles.tarjeta_hora}>{textoLimite(horaLegible(datos.limite))}{datos.lugar ? ` · ${datos.lugar}` : ''}</p>
                                <div className={styles.etiquetas}>
                                    <span className="etiqueta">{datos.tipo}</span>
                                    {datos.alergenos.map((alergeno) => (
                                        <span key={alergeno} className={`etiqueta etiqueta_alerta ${styles.nueva}`}>Contiene {alergeno.toLowerCase()}</span>
                                    ))}
                                    {datos.contactoCruzado && <span className={`etiqueta etiqueta_alerta ${styles.nueva}`}>Posible contacto cruzado</span>}
                                </div>
                                {ingredientes.length > 0 && (
                                    <ul className={styles.ingredientes}>
                                        {ingredientes.map((ingrediente) => (
                                            <li key={ingrediente} className={styles.nueva}>{ingrediente}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </article>
                    </aside>
                </div>
            </main>
        </>
    )
}
