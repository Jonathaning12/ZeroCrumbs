import { createContext, useContext } from 'react'

export const ContextoApp = createContext(null)

export function useApp() {
    return useContext(ContextoApp)
}
