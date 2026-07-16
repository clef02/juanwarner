import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { SOCIAL } from './SocialIcons'
import info1 from '../assets/info1.webp'
import coachImg from '../assets/coach.webp'
import gipnacio from '../assets/gipnacio.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// El orden es el mismo que el de los textos de la marca: Creador de contenido →
// Entrenador en línea → Actor. El creador va primero porque es el foco; los
// planes no deben ser lo primero que se ofrece.
const FACETAS = [
  {
    title: 'Creador',
    desc: 'Contenido y una comunidad que crece cada día',
    img: info1,
    pos: 'object-center',
    social: true,
  },
  {
    title: 'Coach',
    desc: 'Planes de entrenamiento y nutrición hechos a tu medida',
    img: coachImg,
    pos: 'object-[center_28%]',
    href: '/planes',
  },
  {
    title: 'Actor',
    desc: 'Mi próximo capítulo: cine y actuación',
    img: gipnacio,
    pos: 'object-center',
    href: '#',
    comingSoon: true,
  },
]

function Facetas() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.fac-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })

      gsap.utils.toArray('.facet').forEach((facet) => {
        const title = facet.querySelector('.facet-title')
        const others = facet.querySelectorAll('.facet-img, .facet-copy')

        // Reveal al entrar: imagen y texto suben; el nombre aparece (opacidad)
        gsap.from(others, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: facet, start: 'top 78%' },
        })
        gsap.from(title, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: facet, start: 'top 78%' },
        })

        // Parallax: el nombre de fondo "flota" mientras haces scroll (profundidad).
        //
        // El recorrido va de +DERIVA a -DERIVA, así que el título queda EXACTAMENTE
        // centrado detrás de la foto cuando la faceta está en mitad de la pantalla,
        // que es cuando la estás mirando. Antes la deriva era 30 y, como la fuente
        // llega a 23vw, eso lo movía ~150px: se veía descentrado casi siempre.
        // Súbelo si quieres más movimiento; bájalo si vuelve a irse del centro.
        const DERIVA = 12
        gsap.fromTo(
          title,
          { yPercent: DERIVA },
          {
            yPercent: -DERIVA,
            ease: 'none',
            scrollTrigger: {
              trigger: facet,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )

        // Leve zoom a la foto ligado al scroll
        gsap.fromTo(
          facet.querySelector('.facet-photo'),
          { scale: 1 },
          {
            scale: 1.14,
            ease: 'none',
            scrollTrigger: {
              trigger: facet,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="facetas"
      className="relative overflow-hidden bg-ink py-28 text-bone lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Eyebrow */}
        <div className="fac-eyebrow flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-carmin" />
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Mis facetas
          </span>
        </div>

        {/* Facetas apiladas: nombre detrás + imagen al frente */}
        <div className="mt-24 space-y-52 lg:mt-32 lg:space-y-80">
          {FACETAS.map(({ title, desc, img, pos, href, comingSoon, social }) => {
            const CardTag = comingSoon || social ? 'div' : 'a'
            return (
              <div
                key={title}
                className="facet flex flex-col items-center text-center"
              >
                <div className="relative">
                  <CardTag
                    {...(comingSoon || social ? {} : { href })}
                    className="facet-img group relative z-10 block aspect-[5/4] w-72 overflow-hidden border-2 border-brand shadow-2xl shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:w-[26rem] lg:w-[34rem] xl:w-[40rem] 2xl:w-[48rem]"
                  >
                    <img
                      src={img}
                      loading="lazy"
                      alt={`Juan Wagner — ${title}`}
                      className={`facet-photo h-full w-full object-cover ${pos} ${
                        comingSoon ? 'opacity-50 grayscale' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                    {/* Etiqueta en esquina (se oculta al hover en desktop) */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-4 left-4 flex items-center gap-2 transition-opacity duration-300 lg:group-hover:opacity-0"
                    >
                      <span className="h-4 w-0.5 bg-brand" />
                      <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-bone">
                        {title}
                      </span>
                    </div>

                    {comingSoon && (
                      <span className="absolute right-4 top-4 rounded-full bg-carmin px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-bone">
                        Próximamente
                      </span>
                    )}

                    {/* Overlay al hover (desktop): descripción + CTA / redes */}
                    <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-4 bg-ink/75 px-6 text-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 lg:flex">
                      <p className="max-w-sm text-sm leading-relaxed text-bone/85">
                        {desc}
                      </p>
                      {comingSoon ? (
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
                          Muy pronto
                        </span>
                      ) : social ? (
                        <div className="flex translate-y-3 items-start gap-6 transition-transform duration-300 group-hover:translate-y-0 sm:gap-10">
                          {SOCIAL.map(({ Icon, name, href: sHref }) => (
                            <a
                              key={name}
                              href={sHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={name}
                              className="group/s flex flex-col items-center gap-2 text-bone"
                            >
                              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/40 transition-colors group-hover/s:border-brand group-hover/s:bg-brand group-hover/s:text-ink">
                                <Icon className="h-5 w-5" />
                              </span>
                              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-bone/60">
                                {name}
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="inline-flex -skew-x-12 translate-y-3 items-center gap-2 bg-brand px-7 py-3.5 text-ink shadow-lg shadow-brand/40 transition-transform duration-300 group-hover:translate-y-0">
                          <span className="flex skew-x-12 items-center gap-2 text-sm font-bold uppercase tracking-wider">
                            Ver más
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </span>
                      )}
                    </div>
                  </CardTag>
                  <h3 className="facet-title pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center whitespace-nowrap font-display text-[clamp(4.5rem,23vw,27rem)] font-bold uppercase leading-none tracking-tight text-bone/10">
                    {title}
                  </h3>
                </div>

                {/* Copy debajo (solo móvil) */}
                <div className="facet-copy mt-8 flex flex-col items-center lg:hidden">
                  <p className="max-w-sm text-sm leading-relaxed text-muted">
                    {desc}
                  </p>
                  {comingSoon ? (
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
                      Muy pronto
                    </span>
                  ) : social ? (
                    <div className="mt-6 flex items-start gap-8">
                      {SOCIAL.map(({ Icon, name, href: sHref }) => (
                        <a
                          key={name}
                          href={sHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                          className="group/s flex flex-col items-center gap-2 text-bone"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/40 transition-colors group-hover/s:border-brand group-hover/s:bg-brand group-hover/s:text-ink">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">
                            {name}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={href}
                      className="cta group/btn mt-5 inline-flex -skew-x-12 items-center gap-2 bg-brand px-6 py-3 text-ink transition-colors hover:bg-brand-bright"
                    >
                      <span className="flex skew-x-12 items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        Ver más
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Facetas
