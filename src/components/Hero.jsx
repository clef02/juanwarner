import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL } from './SocialIcons'
import { useContact } from './ContactModal'
import gymBg from '../assets/gipnacio.webp'
import juanImg from '../assets/juan1.webp'
import creadorImg from '../assets/creador.webp'
import actorImg from '../assets/juan2.webp'

// Accesos a facetas de la marca (el hub completo vive en la sección "Facetas").
//
// Coach NO está aquí a propósito: el primer pantallazo no debe empujar a comprar
// planes. A Planes se llega por el menú y por la sección "Facetas", más abajo.
//
// ⚠️ La foto de Actor es provisional: no hay ninguna imagen de cine o actuación
// entre los assets, así que se usa un retrato con el mismo tratamiento
// "Próximamente" (apagado y en gris) que ya lleva esta faceta en "Facetas".
const CARDS = [
  {
    img: creadorImg,
    title: 'Creador',
    action: 'Ver contenido',
    href: '/quien-soy',
    pos: 'object-[center_38%]',
  },
  {
    img: actorImg,
    title: 'Actor',
    action: 'Próximamente',
    comingSoon: true,
    pos: 'object-top',
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
        {/* Móvil: oscurece la parte superior para leer el texto sobre Juan centrado */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/45 to-transparent sm:hidden" />
      </div>

      {/* ---- Juan (recorte con fondo transparente, centrado) ----
           En móvil su altura NO se mide en svh, sino como "lo que sobra": está
           anclado abajo, así que con `100svh - Npx` su cabeza queda siempre a N
           píxeles del borde superior. El truco es que el bloque de texto también
           mide en píxeles (no en svh), así que su borde inferior cae SIEMPRE a la
           misma altura pase lo que pase con la pantalla. Fijar la cabeza en
           píxeles la mantiene justo debajo de ese borde a cualquier altura;
           medirla en svh (como estaba, `70svh`) solo acertaba en una altura
           concreta y en el resto la subía hasta chocar con el texto —que es lo
           que pasaba en muchos Android, donde la barra del navegador deja el alto
           en la franja de los 730-800px—.

           Son dos reservas porque hay dos tamaños de texto:
             · móvil normal: 260px (texto grande, 3 líneas → borde inferior ~262).
             · movil-bajo (pantalla corta): 200px, porque ahí el texto se achica
               (text-xs, menos padding) y ocupa menos. Ver `movil-bajo` en
               index.css.
           Con menos reserva Juan sale más grande, así que en movil-bajo, que es
           donde falta sitio, es también donde más grande se le deja caber. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex translate-x-0 translate-y-0 justify-center sm:translate-x-[9%] sm:translate-y-[9svh] lg:translate-y-[14svh]">
        <img
          src={juanImg}
          alt="Juan Wagner, creador de contenido y entrenador en línea"
          className="hero-juan h-[calc(100svh-260px)] w-auto max-w-none drop-shadow-2xl movil-bajo:h-[calc(100svh-200px)] sm:h-[86svh] lg:h-[104svh]"
        />
      </div>

      {/* ---- Contenedor ---- */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 pb-10 pt-24 text-center movil-bajo:pt-16 sm:items-start sm:justify-center sm:px-10 sm:pb-0 sm:pt-0 sm:text-left lg:px-14 xl:px-20">
        {/* Arriba: eyebrow + título + descripción */}
        <div className="w-full max-w-2xl sm:w-auto">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3 overflow-hidden sm:mb-6 sm:justify-start">
            <span className="anim-eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Marca personal
              </span>
            </span>
          </div>

          {/* Titular — una línea en móvil, dos en desktop */}
          <h1 className="font-display text-[2.25rem] font-bold uppercase leading-none tracking-tight sm:w-max sm:max-w-none sm:text-[clamp(3rem,9vw,9rem)] sm:leading-[0.9]">
            <span className="inline-block overflow-hidden sm:block">
              <span className="anim-line block whitespace-nowrap">Juan&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden sm:block">
              <span className="anim-line block whitespace-nowrap">Wagner</span>
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="anim-sub mx-auto mt-5 max-w-md text-sm font-medium uppercase leading-relaxed tracking-wide text-muted movil-bajo:mt-3 movil-bajo:text-xs movil-bajo:leading-snug sm:mx-0 sm:mt-6 sm:text-base">
            Creador de contenido, entrenador en línea y actor ·{' '}
            <span className="font-semibold text-brand">
              Todo lo que soy, en un solo lugar
            </span>
          </p>
        </div>

        {/* Abajo: CTAs (en una fila) + redes */}
        <div className="w-full max-w-2xl sm:mt-9 sm:w-auto">
          {/* CTAs — una fila; si no caben, el segundo baja solo.
              `flex-wrap` en vez de un breakpoint: por debajo de ~350px los dos
              botones necesitan 325px y solo hay 272, así que no caben de ninguna
              manera. Sin esto el flex los encogía y "Trabaja conmigo" partía en
              dos líneas, dejando un botón de 58px junto a otro de 42. Al
              envolver, cada uno conserva su tamaño y quedan centrados.
              Ojo al `px-4` de los botones: son 8px menos que antes por botón, y
              son los que hacen que en 360px —el Android más común— sigan cabiendo
              en una sola fila. Con el `px-5` de antes sumaban 325 y se salían 13px
              del contenedor (no se veía porque los tapaba el padding del hero),
              pero con `flex-wrap` eso ya no se disimula: se envolverían. */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:justify-start sm:gap-4">
            <a
              href="/quien-soy"
              className="cta anim-cta group inline-flex -skew-x-12 items-center gap-2 border border-transparent bg-brand px-4 py-3 font-semibold uppercase tracking-wider text-ink transition-colors duration-200 hover:bg-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-7 sm:py-3.5"
            >
              <span className="flex skew-x-12 items-center gap-2 text-xs sm:text-sm">
                Conóceme
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => openContact('marca')}
              className="anim-cta group inline-flex -skew-x-12 items-center border border-white/25 px-4 py-3 text-bone transition-colors duration-200 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-7 sm:py-3.5"
            >
              <span className="skew-x-12 text-xs font-semibold uppercase tracking-wider sm:text-sm">
                Trabaja conmigo
              </span>
            </button>
          </div>

          {/* Prueba social */}
          <div className="anim-proof mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:mt-8 sm:justify-start sm:gap-x-6">
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

        {/* Tarjetas flotantes abajo a la derecha (accesos a facetas) — ocultas en móvil */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:block sm:right-10 lg:right-14 xl:right-20">
          <div className="flex items-end gap-4">
            {CARDS.map(({ img, title, action, href, pos, comingSoon }, i) => {
              // Actor todavía no tiene página. Se renderiza como <div> en vez de
              // <a> para no dejar un enlace que no lleva a ningún sitio (mismo
              // criterio que la sección "Facetas").
              const Tarjeta = comingSoon ? 'div' : 'a'
              return (
                <Tarjeta
                  key={title}
                  {...(comingSoon ? {} : { href })}
                  className={`anim-card group relative block overflow-hidden rounded-lg border border-brand/30 bg-ink shadow-lg shadow-black/30 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                    comingSoon
                      ? ''
                      : 'hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/30'
                  } ${i === 0 ? 'h-32 w-40 sm:h-52 sm:w-64' : 'h-28 w-36 sm:h-48 sm:w-56'}`}
                >
                  <img
                    src={img}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${pos} ${
                      comingSoon ? 'opacity-50 grayscale' : 'group-hover:scale-110'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  {/* Brillo que barre la card al hacer hover (solo si es un enlace) */}
                  {!comingSoon && (
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-left">
                    <p className="font-display text-base font-bold uppercase tracking-tight sm:text-lg">
                      {title}
                    </p>
                    <p
                      className={`mt-1 flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                        comingSoon
                          ? 'text-muted/70'
                          : 'text-muted transition-colors group-hover:text-brand'
                      }`}
                    >
                      {action}
                      {!comingSoon && (
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </p>
                  </div>
                </Tarjeta>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
