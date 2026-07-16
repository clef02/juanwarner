import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import fondoImg from '../assets/juanfooter.webp'
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
      {/* Fondo.
          Antes había un vídeo de stock (cta-video2.mp4) en el que salía un
          hombre que no era Juan: se eliminó, porque en la web solo va material
          propio, nunca personas de banco de imágenes.

          La foto es vertical y aquí se ve a pantalla completa, así que
          `object-cover` recorta bastante: el 45% encuadra a Juan de cara y torso
          y deja el bajo para el titular y el botón. Si lo subes, se va hacia el
          techo vacío; si lo bajas, le come la cara.

          Si algún día llega un vídeo de Juan APAISADO, vuelve a poner aquí un
          <video autoPlay muted loop playsInline> con estas mismas clases y deja
          esta foto como `poster`. */}
      <img
        src={fondoImg}
        loading="lazy"
        alt="Juan Wagner en el gimnasio con su bolsa de deporte y un shaker"
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
      />

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
                onClick={() => openContact('general')}
                className="cta group inline-flex -skew-x-12 items-center gap-2 bg-brand px-8 py-4 text-ink transition-colors duration-200 hover:bg-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="flex skew-x-12 items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                  Hablemos
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoCTA
