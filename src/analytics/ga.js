// Google Analytics 4 (GA4).
//
// El ID NO se escribe aquí: sale de la variable de entorno VITE_GA_ID. Mientras
// esa variable no exista, TODO este archivo no hace nada: no carga el script de
// Google, no crea cookies y no envía un solo dato. Es a propósito, y tiene dos
// consecuencias buenas:
//
//   1. `npm run dev` y el sitio de pruebas no ensucian las estadísticas con tus
//      propias visitas mientras trabajas.
//   2. Si alguien borra la variable por error, el sitio sigue funcionando igual.
//      Se deja de medir, que es molesto, pero nada se rompe.
//
// CÓMO ENCENDERLO (una sola vez):
//   1. analytics.google.com → crear propiedad → flujo de datos "Web" con el
//      dominio juanwagner.com. Te da un ID con la forma G-XXXXXXXXXX.
//   2. Netlify → el sitio de PRODUCCIÓN → Site settings → Environment variables:
//        VITE_GA_ID = G-XXXXXXXXXX
//      NO la pongas en el sitio de pruebas, o mezclarías las dos webs en el
//      mismo informe y los números no significarían nada.
//   3. Vuelve a desplegar. Las variables VITE_* se incrustan al compilar, así
//      que añadirla NO tiene efecto hasta que el sitio se compila de nuevo.
//
// OJO con el prefijo: Vite solo expone al navegador las variables que empiezan
// por VITE_. Si la llamas GA_ID a secas, aquí llegará `undefined` y no medirás
// nada, sin ningún aviso.
//
// Y esto no es un secreto: el ID viaja en el JavaScript de la página y se ve con
// solo mirar el código fuente. Es normal, GA4 funciona así. Lo que protege tus
// datos es tu cuenta de Google, no el ID.

const GA_ID = import.meta.env.VITE_GA_ID

// `typeof window` porque este módulo también se ejecuta en Node al compilar
// (scripts/prerender.js renderiza el sitio para generar el HTML). Allí no hay
// navegador y tocar `window` reventaría el build entero.
const activo = () => Boolean(GA_ID) && typeof window !== 'undefined'

let arrancado = false

/**
 * Carga GA4. Se llama una sola vez, desde Analytics.jsx.
 *
 * El script se inyecta desde aquí y no desde index.html a propósito: el ID vive
 * en una variable de entorno, y en el HTML no hay forma de leerla. Además, así
 * el `<script>` de Google no llega a existir cuando no hay ID.
 */
export function iniciarGa() {
  if (!activo() || arrancado) return
  arrancado = true

  window.dataLayer = window.dataLayer || []

  // Tiene que ser `function` con `arguments`, NO una flecha con (...args).
  // gtag.js empuja a dataLayer el objeto `arguments` tal cual y Google espera
  // encontrarse exactamente eso. Con una flecha se envía un array normal y los
  // eventos se pierden en silencio: no da error, simplemente no llegan.
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())

  // `send_page_view: false` es la línea más importante del archivo.
  //
  // Por defecto GA4 cuenta una visita al cargarse y nunca más. En una web normal
  // basta, porque cada clic recarga la página. Aquí NO: esto es una SPA y al ir
  // de Inicio a Planes no hay recarga, así que GA4 se quedaría creyendo que todo
  // el mundo ve solo la primera página y se marcha. Apagamos su conteo
  // automático y lo llevamos nosotros en Analytics.jsx, en cada cambio de ruta.
  gtag('config', GA_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

/** Una visita a una página. La envía Analytics.jsx en cada cambio de ruta. */
export function verPagina(ruta, titulo) {
  if (!activo()) return

  window.gtag?.('event', 'page_view', {
    page_path: ruta,
    page_location: window.location.href,
    page_title: titulo,
  })
}

/**
 * Un evento suelto: un formulario enviado, un plan pulsado, el media kit
 * descargado…
 *
 * Los nombres se definen abajo, en EVENTOS. No los escribas a mano en cada
 * componente: un evento mal escrito no da error, se guarda como un evento nuevo
 * y acabas con "plan_click" y "click_plan" contando lo mismo por separado.
 */
export function evento(nombre, datos = {}) {
  if (!activo()) return

  window.gtag?.('event', nombre, datos)
}

/**
 * Los eventos que mide la web. Esta lista ES la documentación: si algo no está
 * aquí, no se mide.
 *
 * Reglas de GA4 que conviene no descubrir a base de golpes:
 *   - minúsculas y guion_bajo, sin acentos ni espacios.
 *   - máximo 40 caracteres el nombre y 100 el valor de cada parámetro.
 *   - los eventos tardan hasta 24-48 h en aparecer en los informes normales.
 *     Para comprobar que funcionan HOY, usa Administrar → DebugView o el
 *     informe "Tiempo real"; no esperes verlos en "Interacción" al momento.
 *
 * Para marcar uno como conversión (por ejemplo `contacto_enviado`):
 * GA4 → Administrar → Eventos → activa "Marcar como evento clave".
 */
export const EVENTOS = {
  // El lead de verdad: alguien escribió y el correo salió. Se envía solo cuando
  // Web3Forms confirma; si falla el envío no se cuenta, que para eso está
  // `contacto_error`.
  CONTACTO_ENVIADO: 'contacto_enviado',
  CONTACTO_ERROR: 'contacto_error',

  // Clic en el botón de comprar un plan. Manda a un checkout externo, así que
  // esto es lo último que vemos de esa persona: sin esto no hay forma de saber
  // cuánta gente llega a intentar comprar.
  PLAN_CLIC: 'plan_clic',

  // Descarga del PDF del media kit. Es la señal de interés de las marcas.
  MEDIA_KIT_DESCARGA: 'media_kit_descarga',

  // Salidas a otros dominios: zona de miembros, marcas, patrocinadores, redes.
  SALIDA: 'salida',
}
