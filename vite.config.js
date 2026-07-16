import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Hace que `npm run preview` sirva el sitio como lo hará el hosting.
 *
 * El build genera un HTML por ruta (dist/planes/index.html). Los hostings
 * estáticos —Vercel, Netlify, Cloudflare Pages— resuelven solos /planes hacia
 * ese archivo, pero `vite preview` no: devolvería un 404 y daría la falsa
 * impresión de que el prerender está roto. Esto replica esa resolución.
 */
const urlsLimpias = () => ({
  name: 'preview-urls-limpias',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [ruta] = req.url.split('?')
      // Solo afecta a rutas sin extensión (/planes), nunca a /assets/x.webp.
      if (!ruta.includes('.')) {
        const archivo = join('dist', ruta, 'index.html')
        if (existsSync(archivo)) req.url = join(ruta, 'index.html').replace(/\\/g, '/')
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ isPreview }) => ({
  plugins: [react(), tailwindcss(), urlsLimpias()],

  // En `dev` no existe el HTML por ruta (lo genera el build), así que hace falta
  // el fallback de SPA: sin él, recargar en /planes daría un 404.
  //
  // En `preview` ese mismo fallback estorba: devolvería el index.html del inicio
  // para todas las rutas y taparía justo lo que queremos comprobar. Con 'mpa'
  // cada ruta sirve su propio archivo, como hará el hosting.
  appType: isPreview ? 'mpa' : 'spa',
}))
