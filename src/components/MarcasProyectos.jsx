import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import youngLaImg from '../assets/youngla1.1.webp'
import dragonImg from '../assets/dragonfarma.webp'
import youngLaLogo from '../assets/youngla.png'
import dragonLogo from '../assets/dragon.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const MARCAS = [
  {
    name: 'YoungLA',
    logo: youngLaLogo,
    desc: 'Ropa deportiva y lifestyle con la que entreno cada día.',
    img: youngLaImg,
    pos: 'object-[center_30%]',
    href: '/alianzas/youngla',
  },
  {
    name: 'Dragon Pharma',
    logo: dragonLogo,
    desc: 'Suplementación deportiva de calidad para potenciar tus resultados.',
    img: dragonImg,
    pos: 'object-center',
    href: '/alianzas/dragon-pharma',
  },
]

function MarcasProyectos() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.mp-head', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
      gsap.utils.toArray('.mp-reveal').forEach((group) => {
        gsap.from(group.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: group, start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="alianzas"
      className="bg-bone py-24 text-ink lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        {/* Cabecera */}
        <div className="max-w-2xl">
          <div className="mp-head flex items-center gap-3">
            <span className="h-px w-10 bg-carmin" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Marcas
            </span>
          </div>
          <h2 className="mp-head mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Marcas que <span className="text-brand">confían</span> en mí
          </h2>
        </div>

        {/* --- Marcas --- */}
        <div className="mp-reveal mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {MARCAS.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl shadow-ink/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={`Juan Wagner — ${p.name}`}
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.pos}`}
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-8 w-auto max-w-[60%] object-contain object-left sm:h-10"
                />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite">
                  {p.desc}
                </p>
                <div className="mt-6 flex items-center">
                  <a
                    href={p.href}
                    className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:text-brand"
                  >
                    Visitar
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default MarcasProyectos
