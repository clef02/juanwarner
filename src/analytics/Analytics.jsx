import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { iniciarGa, verPagina } from './ga'
import { getMeta } from '../seo/meta'

/**
 * Cuenta una visita en cada cambio de ruta.
 *
 * Va montado una sola vez en App, junto a Seo, y hace para la analítica lo mismo
 * que Seo hace para el <head>: mantenerla al día cuando se navega sin recargar.
 *
 * Es imprescindible, no un extra. GA4 solo cuenta visitas al cargarse la página,
 * y aquí la página se carga UNA vez: a partir de ahí React cambia el contenido
 * sin recargar nada. Sin este componente, el informe diría que todo el mundo
 * entra al inicio y no ve nada más, y las páginas de Planes o Sponsors
 * aparecerían con cero visitas aunque las viera media España.
 *
 * El título sale de getMeta() y no de document.title a propósito. document.title
 * lo escribe el efecto de Seo.jsx, y dos efectos hermanos se ejecutan en orden
 * de montaje: bastaría con mover este componente encima de <Seo /> para empezar
 * a mandar a GA4 el título de la página ANTERIOR en cada visita. Un fallo así no
 * da ningún error y es dificilísimo de ver en los informes. Leyendo getMeta()
 * —la misma fuente que usa Seo— el orden dejar de importar.
 */
function Analytics() {
  const { pathname } = useLocation()

  useEffect(() => {
    iniciarGa()
  }, [])

  useEffect(() => {
    verPagina(pathname, getMeta(pathname).title)
  }, [pathname])

  return null
}

export default Analytics
