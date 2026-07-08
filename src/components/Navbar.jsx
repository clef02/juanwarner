import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import logoLight from '../assets/jw-logo.png'
import logoDark from '../assets/jw-logo-dark.png'
import { SOCIAL } from './SocialIcons'

// Mapa del sitio
const LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Quién Soy', href: '/quien-soy' },
  { label: 'Planes', href: '/planes' },
  {
    label: 'Alianzas',
    href: '/alianzas',
    children: [
      { label: 'YoungLA', href: '/alianzas/youngla' },
      { label: 'Dragon Pharma', href: '/alianzas/dragon-pharma' },
    ],
  },
  { label: 'Sponsors', href: '/sponsors' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Se oculta al bajar (pasado un umbral); reaparece al subir
      setHidden(y > lastY && y > 120)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'border-b border-ink/10 bg-bone/90 text-ink backdrop-blur-md'
          : 'text-bone'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 lg:px-14">
        {/* Logo (alterna claro/oscuro según el fondo de la navbar) */}
        <a href="/" className="inline-block shrink-0">
          <img
            src={scrolled ? logoDark : logoLight}
            alt="Juan Wagner"
            className="h-10 w-auto sm:h-11"
          />
        </a>

        {/* Pill de navegación (desktop) */}
        <div
          className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md xl:flex ${
            scrolled ? 'border-ink/10 bg-ink/[0.04]' : 'border-bone/20 bg-bone/10'
          }`}
        >
          {LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <a
                  href={link.href}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    scrolled ? 'hover:bg-ink/5' : 'hover:bg-bone/10'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </a>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="flex min-w-[180px] flex-col overflow-hidden rounded-2xl border border-bone/10 bg-ink p-1.5 text-bone shadow-2xl shadow-black/40">
                    {link.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-bone/10 hover:text-brand"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled ? 'hover:bg-ink/5' : 'hover:bg-bone/10'
                }`}
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Redes sociales + botón móvil */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            {SOCIAL.map(({ Icon, name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  scrolled
                    ? 'text-ink hover:bg-ink/5 hover:text-brand'
                    : 'text-bone hover:bg-bone/10 hover:text-brand'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-ink/10 bg-bone text-ink xl:hidden">
          <div className="mx-auto flex max-w-[1600px] flex-col px-6 py-4">
            {LINKS.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-base font-bold uppercase tracking-wide"
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="mb-1 ml-2 flex flex-col border-l border-ink/15 pl-4">
                    {link.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="py-2 text-sm font-medium text-graphite hover:text-brand"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL.map(({ Icon, name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-ink"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
