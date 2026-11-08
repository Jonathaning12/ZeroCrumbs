import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import { ScrollTrigger } from './animacion/animaciones.js'
import ArribaAlCambiar from './Components/ArribaAlCambiar.jsx'
import ProveedorApp from './datos/ProveedorApp.jsx'
import Login from './Pages/Login.jsx'
import Donante from './Pages/Donante.jsx'
import Usuario from './Pages/Usuario.jsx'
import Comida from './Pages/Comida.jsx'
import Receta from './Pages/Receta.jsx'

// Las posiciones del scroll cambian cuando terminan de cargar las fuentes
document.fonts?.ready.then(() => ScrollTrigger.refresh())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorApp>
      <BrowserRouter>
        <ArribaAlCambiar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/donante" element={<Donante />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/comida" element={<Comida />} />
          <Route path="/receta/:id" element={<Receta />} />
        </Routes>
      </BrowserRouter>
    </ProveedorApp>
  </StrictMode>,
)
