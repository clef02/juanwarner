import { SPONSORS } from '../data/sponsors'
import { FAQ } from '../data/faq'
// Imágenes para redes (og:image), recortadas a 1200x630 desde las fotos reales.
//
// Son archivos aparte a propósito, no las fotos de la web: éstas son verticales
// y enormes (5304x7952), y al compartir el enlace saldrían recortadas al azar o
// ni se cargarían. 1200x630 es la medida que piden Facebook, WhatsApp, X y
// LinkedIn. Están encuadradas a mano para que se vea la cara de Juan.
// Si cambias una, respeta 1200x630 y comprueba que no le corte la cabeza.
import ogHome from '../assets/og/og-inicio.jpg'
import ogQuienSoy from '../assets/og/og-quien-soy.jpg'
import ogPlanes from '../assets/og/og-planes.jpg'
import ogSponsors from '../assets/og/og-sponsors.jpg'
import ogYoungla from '../assets/og/og-youngla.jpg'
import ogDragonPharma from '../assets/og/og-dragon-pharma.jpg'

// ⚠️ TODO: pon aquí el dominio final, sin barra al final.
// Es el ÚNICO sitio donde se define: de aquí salen las URLs canónicas, las
// imágenes de Open Graph, el sitemap.xml y el robots.txt. Cambiarlo aquí basta.
export const SITE_URL = 'https://juanwagner.com'

export const SITE_NAME = 'Juan Wagner'
export const LOCALE = 'es_ES'

// Marca las etiquetas que gestiona el SEO, para distinguirlas de las que vienen
// fijas en index.html (favicon, fuentes, viewport…).
//
// Es lo que evita que se dupliquen: el prerender las escribe con esta marca y
// el cliente, al cambiar de ruta, borra exactamente las que la llevan antes de
// escribir las nuevas. Sin ella, al hidratar se acumularían dos descripciones.
export const SEO_ATTR = 'data-seo'

// Redes reales — alimentan `sameAs` del JSON-LD (le dicen a Google que estos
// perfiles y esta web son la misma persona).
const SAME_AS = [
  'https://www.instagram.com/juanwagner150/',
  'https://www.tiktok.com/@juanwagner_',
  'https://www.youtube.com/@JuanWagner_',
  'https://www.facebook.com/people/Juan-Wagner/100087298064954',
]

/** Convierte una ruta o asset en URL absoluta (obligatorio en canonical y og:image). */
export const absoluteUrl = (path) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Ficha de Juan — se inyecta en la home para que Google entienda quién es.
const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Juan Wagner',
  url: SITE_URL,
  image: absoluteUrl(ogHome),
  jobTitle: 'Creador de contenido, entrenador en línea y actor',
  nationality: 'Colombiana',
  birthPlace: { '@type': 'Place', name: 'Santiago de Cali, Colombia' },
  sameAs: SAME_AS,
  knowsAbout: ['Creación de contenido', 'Entrenamiento de fuerza', 'Nutrición deportiva'],
}

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'es',
}

// Las mismas preguntas del acordeón de Planes, en el formato que Google
// necesita para mostrarlas desplegables bajo el resultado de búsqueda.
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

/**
 * Meta de las rutas fijas. `path` es la clave: debe coincidir con App.jsx.
 *
 * Los textos son los del brief de SEO de Rodrigo (PM), Hito 4. Respetan sus dos
 * límites, que son los que aplica Google antes de cortar:
 *   - title: máximo 60 caracteres, siempre con la marca "Juan Wagner".
 *   - description: máximo 155 caracteres, con llamada a la acción.
 * Si los editas, cuenta los caracteres: hay una comprobación al final del build.
 */
const STATIC_ROUTES = [
  {
    path: '/',
    title: 'Juan Wagner — Creador de Contenido, Entrenador y Actor',
    description:
      'Creador de contenido, entrenador en línea y actor. Conoce a Juan Wagner: su historia, sus planes y sus alianzas. Todo lo que soy, en un solo lugar.',
    image: ogHome,
    jsonLd: [PERSON_JSON_LD, WEBSITE_JSON_LD],
  },
  {
    path: '/quien-soy',
    title: 'Quién es Juan Wagner — Historia y trayectoria',
    description:
      'Conoce la historia de Juan Wagner: su trayectoria como creador de contenido, entrenador y actor, y la faceta detrás del físico.',
    image: ogQuienSoy,
  },
  {
    path: '/planes',
    title: 'Planes de Entrenamiento y Nutrición — Juan Wagner',
    description:
      'Empieza tu transformación con planes personalizados de entrenamiento y nutrición por suscripción, hechos para tu cuerpo y tus metas.',
    image: ogPlanes,
    jsonLd: [FAQ_JSON_LD],
  },
  {
    path: '/sponsors',
    title: 'Trabaja con Juan Wagner — Colaboraciones de marca',
    description:
      '¿Eres una marca? Colabora con Juan Wagner y conecta con una comunidad de +3M. Descarga el media kit y escríbenos.',
    image: ogSponsors,
  },
]

/**
 * Copy de cada patrocinio, también del brief de Rodrigo.
 * Va por slug y no dentro de sponsors.js para que todo el SEO viva en un único
 * archivo. Si añades un patrocinio y no lo pones aquí, no pasa nada: abajo hay
 * un texto de reserva generado a partir de sus datos.
 */
const SPONSOR_SEO = {
  youngla: {
    title: 'Juan Wagner x YoungLA — Ropa deportiva y código',
    description:
      'Alianza de Juan Wagner con YoungLA: ropa deportiva y lifestyle. Consigue tu código de descuento y conoce la colaboración.',
    image: ogYoungla,
  },
  'dragon-pharma': {
    title: 'Juan Wagner x Dragon Pharma — Suplementación',
    description:
      'Alianza de Juan Wagner con Dragon Pharma: suplementación deportiva. Consigue tu código de descuento y conoce la colaboración.',
    image: ogDragonPharma,
  },
}

/** Meta de cada patrocinio (/alianzas/:slug). */
const sponsorRoute = (sponsor) => ({
  path: `/alianzas/${sponsor.slug}`,
  title: SPONSOR_SEO[sponsor.slug]?.title ?? `Juan Wagner x ${sponsor.name} — Alianza`,
  description:
    SPONSOR_SEO[sponsor.slug]?.description ??
    `Alianza de Juan Wagner con ${sponsor.name}: ${sponsor.category.toLowerCase()}. Consigue tu código de descuento y conoce la colaboración.`,
  // Si un patrocinio nuevo no trae su og propia, cae a la del inicio: es
  // preferible a compartir una foto vertical que las redes recortan mal.
  image: SPONSOR_SEO[sponsor.slug]?.image ?? ogHome,
})

/** Todas las rutas indexables. La usan el prerender y el sitemap.xml. */
export const ROUTES = [...STATIC_ROUTES, ...SPONSORS.map(sponsorRoute)]

const DEFAULT_META = {
  title: STATIC_ROUTES[0].title,
  description: STATIC_ROUTES[0].description,
  image: ogHome,
}

/**
 * Meta de una ruta. Devuelve `noindex` en lo que no exista o no deba indexarse
 * (/alianzas redirige, y cualquier ruta desconocida es un 404).
 */
export function getMeta(pathname) {
  // Normaliza la barra final: /planes/ y /planes son la misma página.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const route = ROUTES.find((r) => r.path === path)

  if (route) return { ...route, canonical: absoluteUrl(route.path) }

  return {
    ...DEFAULT_META,
    title: 'Página no encontrada · Juan Wagner',
    description: 'La página que buscas no existe o cambió de dirección.',
    noindex: true,
  }
}

/**
 * Traduce la meta a una lista de etiquetas del <head>.
 *
 * Es la pieza compartida: el cliente (src/seo/Seo.jsx) las convierte en nodos
 * del DOM y el prerender (scripts/prerender.js) las serializa a HTML. Así el
 * <head> se define UNA sola vez y no se desincroniza entre los dos caminos.
 */
export function buildHeadTags(meta) {
  const image = absoluteUrl(meta.image)
  const canonical = meta.canonical

  const tags = [
    { tag: 'title', text: meta.title },
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },

    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attrs: { property: 'og:locale', content: LOCALE } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },

    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]

  if (canonical) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: canonical } })
  }

  // Sin `noindex` no hace falta decir nada: indexar es el comportamiento por defecto.
  if (meta.noindex) {
    tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } })
  }

  for (const schema of meta.jsonLd ?? []) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(schema),
    })
  }

  return tags
}
