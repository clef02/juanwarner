import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En producción el HTML llega ya renderizado (scripts/prerender.js), así que se
// hidrata para reaprovecharlo y evitar el parpadeo de volver a pintarlo todo.
// En `npm run dev` no hay prerender y #root está vacío: ahí toca render normal.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
