import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL } from './SocialIcons'
import { useContact } from './ContactModal'
import gymBg from '../assets/gipnacio.jpg'
import juanImg from '../assets/juan1.webp'
import creadorImg from '../assets/creador.webp'
import coachImg from '../assets/coach.webp'

// Accesos a facetas de la marca (el hub completo vive en la sección "Facetas")
const CARDS = [
  {
    img: coachImg,
    title: 'Coach',
    action: 'Ver planes',
    href: '/planes',
    pos: 'object-[center_30%]',
  },
  {
    img: creadorImg,
    title: 'Creador',
    action: 'Ver contenido',
    href: '/quien-soy',
    pos: 'object-[center_38%]',
  },
]

function Hero() {
  const root = useRef(null)
  const { openContact } = useContact()

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
      })
      tl.from('.hero-img', { scale: 1.15, duration: 1.8, ease: 'power2.out' }, 0)
        .from(
          '.hero-juan',
          { yPercent: 8, opacity: 0, duration: 1.3, ease: 'power2.out' },
          0.15,
        )
        .from('.anim-eyebrow', { yPercent: 120, opacity: 0 }, 0.2)
        .from('.anim-line', { yPercent: 115, opacity: 0, stagger: 0.12 }, 0.3)
        .from('.anim-sub', { y: 24, opacity: 0 }, 0.65)
        .from('.anim-cta', { y: 24, opacity: 0, stagger: 0.1 }, 0.8)
        .from('.anim-proof', { y: 16, opacity: 0 }, 0.95)
      // Nota: las cards NO se animan en la entrada a propósito — así quedan
      // siempre visibles (evita que un tween las deje en opacity:0). Conservan
      // sus animaciones de hover (brillo, elevación, zoom).
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="inicio"
      className="relative h-svh w-full overflow-hidden bg-ink text-bone"
    >
      {/* ---- Fondo: gimnasio a todo el ancho + overlays de legibilidad ---- */}
      <div className="absolute inset-0">
        <img
          src={gymBg}
          alt=""
          aria-hidden="true"
          className="hero-img h-full w-full object-cover object-center blur-[3px] grayscale"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
      </div>

      {/* ---- Juan (recorte con fondo transparente, centrado) ---- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex translate-x-[9%] translate-y-[4svh] justify-center sm:translate-y-[9svh] lg:translate-y-[14svh]">
        <img
          src={juanImg}
          alt="Juan Wagner, coach y creador de contenido"
          className="hero-juan h-[60svh] w-auto max-w-none drop-shadow-2xl sm:h-[86svh] lg:h-[104svh]"
        />
      </div>

      {/* ---- Contenedor ---- */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Contenido principal (centrado en el alto completo) */}
        <div className="py-4">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 overflow-hidden">
              <span className="anim-eyebrow flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Marca personal
                </span>
              </span>
            </div>

            {/* Titular */}
            <h1 className="font-display w-max max-w-none text-[clamp(3rem,9vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight">
              <span className="block overflow-hidden">
                <span className="anim-line block whitespace-nowrap">Juan</span>
              </span>
              <span className="block overflow-hidden">
                <span className="anim-line block whitespace-nowrap">
                  Wagner
                </span>
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="anim-sub mt-6 max-w-md text-sm font-medium uppercase leading-relaxed tracking-wide text-muted sm:text-base">
              Entrenador, creador de contenido y embajador de marca.{' '}
              <span className="font-semibold text-brand">
                Todo lo que soy, en un solo lugar.
              </span>
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/quien-soy"
                className="cta anim-cta group inline-flex -skew-x-12 items-center gap-2 border border-transparent bg-brand px-7 py-3.5 font-semibold uppercase tracking-wider text-ink transition-colors duration-200 hover:bg-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="flex skew-x-12 items-center gap-2 text-sm">
                  Conóceme
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => openContact('marca')}
                className="anim-cta group inline-flex -skew-x-12 items-center border border-white/25 px-7 py-3.5 text-bone transition-colors duration-200 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="skew-x-12 text-sm font-semibold uppercase tracking-wider">
                  Trabaja conmigo
                </span>
              </button>
            </div>

            {/* Prueba social */}
            <div className="anim-proof mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="font-semibold uppercase tracking-wider">
                +3M <span className="text-muted">seguidores</span>
              </span>
              <span
                className="hidden h-4 w-px bg-white/20 sm:block"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3">
                {SOCIAL.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-bone/70 transition-colors duration-200 hover:text-brand"
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas flotantes abajo a la derecha (accesos a facetas) */}
        <div className="absolute bottom-6 right-6 z-20 sm:right-10 lg:right-14 xl:right-20">
          <div className="flex items-end gap-4">
            {CARDS.map(({ img, title, action, href, pos }, i) => (
              <a
                key={title}
                href={href}
                className={`anim-card group relative block overflow-hidden rounded-lg border border-brand/30 bg-ink shadow-lg shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                  i === 0
                    ? 'h-32 w-40 sm:h-52 sm:w-64'
                    : 'h-28 w-36 sm:h-48 sm:w-56'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${pos}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                {/* Brillo que barre la card al hacer hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-left">
                  <p className="font-display text-base font-bold uppercase tracking-tight sm:text-lg">
                    {title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-brand">
                    {action}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
