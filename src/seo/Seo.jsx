import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { buildHeadTags, getMeta, SEO_ATTR } from './meta'

/**
 * Mantiene el <head> al día en cada cambio de ruta.
 *
 * Va montado una sola vez en App. En la carga inicial el <head> ya viene
 * correcto desde el HTML prerenderizado (scripts/prerender.js); este efecto
 * vuelve a escribir lo mismo, así que no se nota. Su trabajo real empieza en la
 * segunda página: al navegar dentro de la SPA no hay recarga, y sin esto el
 * título y la descripción se quedarían congelados en los de la primera página.
 */
function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const tags = buildHeadTags(getMeta(pathname))

    // Fuera lo de la ruta anterior (en la primera carga, lo que dejó el
    // prerender). Es más simple y fiable que ir comparando etiqueta por
    // etiqueta, y el navegador no repinta por esto.
    document.head.querySelectorAll(`[${SEO_ATTR}]`).forEach((el) => el.remove())

    for (const { tag, attrs = {}, text } of tags) {
      // El <title> es único: se reutiliza el que ya existe en vez de duplicarlo,
      // porque el navegador solo hace caso al primero del documento.
      if (tag === 'title') {
        document.title = text
        continue
      }

      const el = document.createElement(tag)
      el.setAttribute(SEO_ATTR, '')
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
      if (text) el.textContent = text
      document.head.appendChild(el)
    }
  }, [pathname])

  return null
}

export default Seo
