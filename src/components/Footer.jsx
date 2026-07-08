import { ArrowRight } from 'lucide-react'
import logo from '../assets/jw-logo.png'
import { SOCIAL } from './SocialIcons'

const MENU_COL_1 = [
  { label: 'Inicio', href: '/' },
  { label: 'Quién Soy', href: '/quien-soy' },
  { label: 'Planes', href: '/planes' },
]
const MENU_COL_2 = [
  { label: 'Alianzas', href: '/alianzas' },
  { label: 'Sponsors', href: '/sponsors' },
]

const ALIANZAS = [
  { name: 'YoungLA', desc: 'Ropa deportiva y lifestyle' },
  { name: 'Dragon Pharma', desc: 'Suplementación deportiva' },
]

const MenuLink = ({ href, label }) => (
  <a
    href={href}
    className="font-display text-3xl font-bold uppercase tracking-tight text-bone transition-colors duration-200 hover:text-brand sm:text-4xl"
  >
    {label}
  </a>
)

function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-14 lg:py-28">
        {/* Marca (logo) */}
        <a href="/" className="inline-block">
          <img
            src={logo}
            alt="Juan Wagner"
            className="h-12 w-auto sm:h-14"
          />
        </a>

        <div className="mt-8 h-px w-full bg-graphite/60" />

        {/* Contenido principal */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Menú */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Menú
            </p>
            <div className="mt-8 flex flex-wrap gap-x-16 gap-y-4">
              <div className="flex flex-col gap-4">
                {MENU_COL_1.map((l) => (
                  <MenuLink key={l.label} {...l} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {MENU_COL_2.map((l) => (
                  <MenuLink key={l.label} {...l} />
                ))}
              </div>
            </div>
          </div>

          {/* Alianzas */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Alianzas
            </p>
            <div className="mt-8 space-y-6">
              {ALIANZAS.map((a) => (
                <div key={a.name}>
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    {a.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{a.desc}</p>
                </div>
              ))}
              <a
                href="/alianzas"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:text-brand-bright"
              >
                Ver alianzas
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-graphite/60" />

        {/* Barra inferior */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-muted">
              © 2026 Juan Wagner. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ Icon, name, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite/60 text-bone transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
