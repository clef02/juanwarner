// Genera un HTML estático por ruta, más sitemap.xml y robots.txt.
//
// Lo ejecuta `npm run build` después de los dos builds de Vite (cliente y SSR).
// Sin esto, el sitio entero sería un único index.html vacío: Google acabaría
// leyéndolo porque ejecuta JavaScript, pero WhatsApp, Facebook, X y LinkedIn no
// lo hacen, y toda página compartida mostraría la misma vista previa.
//
// Todo lo que se escribe aquí sale de src/seo/meta.js. Para cambiar el dominio
// o cualquier texto, ese es el archivo — este script no decide nada.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(projectRoot, 'dist')
const ssrEntry = join(projectRoot, 'dist-ssr', 'entry-server.js')

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Etiquetas HTML sin cierre.
const VOID_TAGS = new Set(['meta', 'link'])

function serializeTag({ tag, attrs = {}, text }, seoAttr) {
  // La marca es imprescindible: es la que permite al cliente reconocer estas
  // etiquetas al cambiar de ruta y sustituirlas en vez de duplicarlas.
  const attrHtml = ` ${seoAttr}=""`.concat(
    Object.entries(attrs)
      .map(([name, value]) => ` ${name}="${escapeAttr(value)}"`)
      .join(''),
  )

  if (VOID_TAGS.has(tag)) return `<${tag}${attrHtml} />`

  // El JSON-LD ya es JSON válido: escaparlo como HTML lo rompería. Basta con
  // neutralizar el "<", que es lo único capaz de cerrar el <script> antes de tiempo.
  const body = tag === 'script' ? String(text).replace(/</g, '\\u003c') : escapeText(text)
  return `<${tag}${attrHtml}>${body}</${tag}>`
}

/** '/' → dist/index.html · '/planes' → dist/planes/index.html */
const outputPathFor = (route) =>
  route === '/' ? join(distDir, 'index.html') : join(distDir, route, 'index.html')

function buildPage({ template, appHtml, tags, seoAttr }) {
  const title = tags.find((t) => t.tag === 'title')
  const headHtml = tags
    .filter((t) => t.tag !== 'title')
    .map((t) => `    ${serializeTag(t, seoAttr)}`)
    .join('\n')

  let html = template

  // El <title> se sustituye en vez de añadirse: el navegador solo hace caso al
  // primero del documento, así que un segundo título sería ignorado.
  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title.text)}</title>`)
  }

  html = html.replace('</head>', `${headHtml}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  return html
}

function buildSitemap(routes, absoluteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = routes
    .map(
      ({ path }) =>
        `  <url>\n    <loc>${escapeText(absoluteUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/**
 * ¿Este build NO debe indexarse?
 *
 * El sitio de pruebas (juanwagner-web-preview.netlify.app) es una copia entera
 * del real: si Google lo indexa, compite contra juanwagner.com por las mismas
 * palabras y sale contenido duplicado. Para evitarlo, en Netlify → Site
 * settings → Environment variables del sitio de PRUEBAS, añade:
 *
 *     SEO_NOINDEX = true
 *
 * y NO la pongas en el sitio de producción. Los "deploy preview" de cada rama
 * se detectan solos por la variable CONTEXT que pone Netlify.
 */
const esNoIndex = () =>
  process.env.SEO_NOINDEX === 'true' ||
  (Boolean(process.env.CONTEXT) && process.env.CONTEXT !== 'production')

const buildRobots = (siteUrl, noindex) =>
  noindex
    ? '# Entorno de pruebas: no indexar (SEO_NOINDEX=true).\nUser-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

async function main() {
  const { render, ROUTES, getMeta, buildHeadTags, SITE_URL, absoluteUrl, SEO_ATTR } =
    await import(pathToFileURL(ssrEntry).href)

  const template = await readFile(join(distDir, 'index.html'), 'utf-8')
  const noindex = esNoIndex()

  // Límites del brief de SEO: son los que aplica Google antes de cortar el texto.
  const LIMITES = { title: 60, description: 155 }
  const avisos = []

  for (const route of ROUTES) {
    const meta = getMeta(route.path)
    for (const [campo, max] of Object.entries(LIMITES)) {
      if (meta[campo].length > max) {
        avisos.push(`${route.path} · ${campo}: ${meta[campo].length}/${max} caracteres`)
      }
    }

    const appHtml = render(route.path)
    const tags = buildHeadTags({ ...getMeta(route.path), noindex: noindex || undefined })
    const html = buildPage({ template, appHtml, tags, seoAttr: SEO_ATTR })

    const outputPath = outputPathFor(route.path)
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html)
    console.log(`  ✓ ${route.path}`)
  }

  // Página 404. Netlify usa dist/404.html automáticamente para cualquier URL
  // que no exista, y responde con un 404 de verdad. Se renderiza con una ruta
  // inventada para que React caiga en el componente NotFound. Siempre lleva
  // noindex: getMeta() lo pone al no reconocer la ruta.
  const rutaInexistente = '/__404__'
  await writeFile(
    join(distDir, '404.html'),
    buildPage({
      template,
      appHtml: render(rutaInexistente),
      tags: buildHeadTags(getMeta(rutaInexistente)),
      seoAttr: SEO_ATTR,
    }),
  )
  console.log('  ✓ 404.html')

  await writeFile(join(distDir, 'sitemap.xml'), buildSitemap(ROUTES, absoluteUrl))
  await writeFile(join(distDir, 'robots.txt'), buildRobots(SITE_URL, noindex))

  console.log(`  ✓ sitemap.xml y robots.txt (${ROUTES.length} URLs)`)
  console.log(`\nDominio actual: ${SITE_URL} — se define en src/seo/meta.js`)
  if (noindex) {
    console.log('⚠️  SEO_NOINDEX activo: este build pide a Google que NO lo indexe.')
  }
  if (avisos.length) {
    console.log('\n⚠️  Textos que Google va a cortar (edítalos en src/seo/meta.js):')
    for (const aviso of avisos) console.log(`     ${aviso}`)
  }
}

main().catch((error) => {
  console.error('\nFalló el prerender:\n', error)
  process.exit(1)
})
