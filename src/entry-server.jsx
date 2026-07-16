import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

/**
 * Punto de entrada para el prerender (no se usa en el navegador).
 *
 * scripts/prerender.js llama a `render()` con cada ruta y guarda el HTML
 * resultante en dist/. Así las redes sociales y los buscadores que no ejecutan
 * JavaScript reciben la página ya montada, con su título y su descripción.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

// Se reexportan para que el script de prerender los use sin volver a declararlos.
// Importante: pasan por el bundle de Vite, así que las imágenes importadas
// (og:image) ya llegan resueltas a su ruta final con hash — algo que un script
// de Node por su cuenta no podría hacer, porque no sabe importar un .webp.
export { ROUTES, getMeta, buildHeadTags, SITE_URL, absoluteUrl, SEO_ATTR } from './seo/meta'
