import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import posterImg from '../assets/gipnacio.jpg'
import ctaVideo from '../assets/cta-video2.mp4'
import { useContact } from './ContactModal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function VideoCTA() {
  const root = useRef(null)
  const { openContact } = useContact()

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.cta-anim', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="empezar"
      className="relative flex h-svh min-h-[600px] w-full overflow-hidden bg-ink text-bone"
    >
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={posterImg}
      >
        <source src={ctaVideo} type="video/mp4" />
      </video>

      {/* Overlays de legibilidad (más oscuro abajo para el texto) */}
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      {/* Contenido anclado abajo: titular izquierda · texto+CTAs derecha */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Izquierda: eyebrow + titular */}
          <div className="max-w-2xl">
            <div className="cta-anim flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Da el paso
              </span>
            </div>
            <h2 className="cta-anim mt-5 font-display text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight">
              Hoy empieza
              <br />
              tu <span className="text-brand">mejor versión</span>
            </h2>
          </div>

          {/* Derecha: texto + CTAs */}
          <div className="flex max-w-sm flex-col items-start gap-6 lg:items-end lg:text-right">
            <p className="cta-anim text-sm leading-relaxed text-bone/70">
              Entrenamiento, nutrición y acompañamiento real para lograr el
              físico que siempre quisiste.
            </p>
            <div className="cta-anim flex flex-wrap gap-4 lg:justify-end">
              <button
                type="button"
                onClick={() => openContact('asesoria')}
                className="cta group inline-flex -skew-x-12 items-center gap-2 bg-brand px-8 py-4 text-ink transition-colors duration-200 hover:bg-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="flex skew-x-12 items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                  Hablemos
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
              <a
                href="/planes"
                className="group inline-flex -skew-x-12 items-center border border-bone/30 px-8 py-4 text-bone transition-colors duration-200 hover:border-bone hover:bg-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="skew-x-12 text-sm font-semibold uppercase tracking-wider">
                  Ver planes
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoCTA
