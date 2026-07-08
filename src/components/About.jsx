import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutImg from '../assets/quiensoy.webp'
import info1 from '../assets/info1.webp'
import galeri2 from '../assets/galeri2.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const GALLERY = [
  { img: info1, alt: 'Juan Wagner con su comunidad', pos: 'object-center' },
  { img: galeri2, alt: 'Juan Wagner', pos: 'object-[center_30%]' },
]

function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
      tl.from('.about-reveal', { y: 40, opacity: 0, stagger: 0.12 })
        .from('.about-img', { scale: 1.12, opacity: 0, duration: 1 }, 0.1)
        .from('.about-card', { y: 30, opacity: 0, stagger: 0.15 }, 0.45)
        .from('.about-badge', { scale: 0.85, opacity: 0, ease: 'back.out(1.7)' }, 0.7)
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="sobre-juan"
      className="relative overflow-hidden bg-bone py-24 text-ink lg:py-32"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14 xl:px-20">
        {/* ---- Columna izquierda: texto + galería ---- */}
        <div className="order-2 lg:order-1">
          <div className="about-reveal mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Quién es Juan
            </span>
          </div>

          <h2 className="about-reveal font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            El niño que decidió <span className="text-brand">no rendirse</span>
          </h2>

          <p className="about-reveal mt-6 max-w-xl text-base leading-relaxed text-graphite">
            Mucho gusto, mi nombre es Juan Wagner y soy un joven colombiano
            entusiasta de la vida saludable. De niño sufrí de obesidad tipo 1 y
            tuve bastantes problemas, tanto físicos como mentales, a causa de
            esto. Durante la pandemia decidí cambiar mi vida con ayuda del
            ejercicio, la alimentación y la mentalidad adecuada. Todo empezó con
            un deseo personal de redención, y hoy me enfoco en promover estos
            principios a través de mis redes para ayudar a otros a empezar su
            cambio positivo. Además, la creación de contenido me llevó a
            descubrir una pasión por el arte, el cine y la actuación.
          </p>

          {/* Galería: 2 imágenes de Juan */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {GALLERY.map(({ img, alt, pos }, i) => (
              <div
                key={i}
                className="about-card group relative aspect-[5/4] overflow-hidden border-2 border-brand bg-ink shadow-lg shadow-black/40"
              >
                <img
                  src={img}
                  alt={alt}
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${pos}`}
                />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </div>
            ))}
          </div>
        </div>

        {/* ---- Columna derecha: imagen grande ---- */}
        <div className="relative order-1 mx-auto w-full max-w-2xl lg:order-2">
          <div className="about-img relative aspect-square overflow-hidden border-2 border-brand shadow-2xl shadow-black/50">
            <img
              src={aboutImg}
              alt="Juan Wagner entrenando en el gimnasio"
              className="h-full w-full object-cover object-[center_58%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>

          {/* Badge flotante superpuesto */}
          <div className="about-badge absolute -bottom-5 -left-5 -skew-x-6 bg-brand px-5 py-3 shadow-xl shadow-black/40">
            <p className="skew-x-6 font-display text-3xl font-bold leading-none">
              +5 años
            </p>
            <p className="mt-1 skew-x-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
              de trayectoria
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
