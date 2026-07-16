import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// A dónde ofrecemos ir desde el 404. Son las páginas con entidad propia:
// /alianzas no está porque es una redirección, no una página.
const SALIDAS = [
  { label: 'Inicio', href: '/' },
  { label: 'Quién soy', href: '/quien-soy' },
  { label: 'Planes', href: '/planes' },
  { label: 'Alianzas', href: '/alianzas/youngla' },
  { label: 'Sponsors', href: '/sponsors' },
]

/**
 * Página 404.
 *
 * El build la guarda como dist/404.html y Netlify la sirve —con estado 404 de
 * verdad, no un 200 disfrazado— en cualquier URL que no exista. Antes esto era
 * un div blanco vacío: quien se equivocaba de dirección veía una pantalla en
 * blanco y se iba.
 */
function NotFound() {
  return (
    <div>
      <Navbar />

      <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 py-32 text-center text-bone">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-carmin" />
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Error 404
          </span>
          <span className="h-px w-10 bg-carmin" />
        </div>

        <p className="mt-8 font-display text-[clamp(4rem,18vw,10rem)] font-bold leading-none tracking-tight text-bone/10">
          404
        </p>

        <h1 className="-mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Esta página no existe
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          El enlace que seguiste está roto o la dirección cambió. Desde aquí
          puedes seguir por donde quieras.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SALIDAS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-brand hover:bg-brand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound
