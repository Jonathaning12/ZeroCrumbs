export function Flecha() {
    return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
    )
}

export function Check({ tamano = 16 }) {
    return (
        <svg aria-hidden="true" width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    )
}

// El rastro de migajas, el adorno propio de ZeroCrumbs
export function Migajas({ invertido = false }) {
    return (
        <svg data-migajas aria-hidden="true" width="74" height="30" viewBox="0 0 74 30" fill="#EBA74F" style={invertido ? { scale: '-1 1' } : undefined}>
            <circle cx="4" cy="26" r="1.6" />
            <circle cx="15" cy="20" r="2.1" />
            <circle cx="27" cy="16" r="1.4" />
            <circle cx="40" cy="10" r="2.4" />
            <circle cx="54" cy="8" r="1.5" />
            <circle cx="68" cy="3" r="2.8" />
        </svg>
    )
}
