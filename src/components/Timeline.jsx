import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import info2 from '../assets/info2.webp'
import quiensoy from '../assets/quiensoy.webp'
import creadorImg from '../assets/creador.webp'
import dragonfarma from '../assets/dragonfarma.webp'
import youngla from '../assets/youngla1.1.webp'
import galeri5 from '../assets/galeri5.webp'
import galeri7 from '../assets/galeri7.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Trayectoria — hitos por año (editable).
const ITEMS = [
  {
    year: '2020',
    title: 'Los cimientos',
    text: 'Inicio mi formación en nutrición endocrina y deportiva, junto a la certificación en entrenamiento enfocado en hipertrofia y biomecánica.',
    img: info2,
    pos: 'object-top',
  },
  {
    year: '2021',
    title: 'El primer cambio',
    text: 'Creo mi perfil en redes y pongo en práctica todo lo que voy aprendiendo. Llega mi primer cambio físico tras meses de proceso.',
    img: quiensoy,
    pos: 'object-center',
  },
  {
    year: '2022',
    title: 'Creador de contenido',
    text: 'Comienzo de lleno a crear contenido en Instagram, Facebook, TikTok y YouTube, y desarrollo mi propio software de entrenamiento y alimentación personalizados.',
    img: creadorImg,
    pos: 'object-center',
  },
  {
    year: '2023',
    title: 'Primer gran patrocinio',
    text: 'Llega Dragon Pharma, los primeros en confiar en mí como atleta y creador. Lanzo mi plataforma de asesorías y realizo campañas con distintas marcas.',
    img: dragonfarma,
    pos: 'object-center',
  },
  {
    year: '2024',
    title: 'YoungLA & Juan Wagner LLC',
    text: 'La marca número uno en fitness y lifestyle abre sus puertas para trabajar juntos a largo plazo. Además, fundo mi propia empresa: Juan Wagner LLC.',
    img: youngla,
    pos: 'object-[center_25%]',
  },
  {
    year: '2025',
    title: 'Consolidación',
    text: 'Se afianza mi relación con Dragon Pharma y YoungLA, con múltiples viajes: Arnold Sports, Fexpocruz, Block Party Miami y más, mientras termino mis estudios en Florida Atlantic University.',
    img: galeri5,
    pos: 'object-center',
  },
  {
    year: '2026',
    title: 'El presente y lo que viene',
    text: 'Nuevos proyectos: una gira por 4 ciudades de Bolivia, Arnold Sports (Ohio), FIBO (Alemania), Fit Weekend (México) y más. Y, finalmente, doy el paso hacia la actuación profesional.',
    img: galeri7,
    pos: 'object-center',
  },
]

function Timeline() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // La espina central se "dibuja" con el scroll
      gsap.fromTo(
        '.tl-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-track',
            start: 'top 55%',
            end: 'bottom 80%',
            scrub: true,
          },
        },
      )

      gsap.from('.tl-head', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })

      gsap.utils.toArray('.tl-item').forEach((item) => {
        const left = item.dataset.side === 'left'
        gsap.from(item.querySelector('.tl-card'), {
          y: 50,
          x: 0,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%' },
        })
        gsap.from(item.querySelector('.tl-dot'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: item, start: 'top 82%' },
        })
        gsap.from(item.querySelector('.tl-connector'), {
          scaleX: 0,
          transformOrigin: left ? 'right center' : 'left center',
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 82%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-ink py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14">
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center">
          <div className="tl-head flex items-center gap-3">
            <span className="h-px w-10 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Trayectoria
            </span>
          </div>
          <h2 className="tl-head mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Cómo llegué hasta <span className="text-brand">aquí</span>
          </h2>
        </div>

        {/* Track */}
        <div className="tl-track relative mt-16 lg:mt-20">
          {/* Espina central (móvil: a la izquierda) */}
          <div className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 bg-bone/10 md:left-1/2">
            <div className="tl-progress h-full w-full origin-top bg-brand" />
          </div>

          <div className="space-y-8 md:space-y-12">
            {ITEMS.map((item, i) => {
              const left = i % 2 === 0
              return (
                <div
                  key={item.year}
                  data-side={left ? 'left' : 'right'}
                  className="tl-item relative"
                >
                  {/* Nodo sobre la espina */}
                  <span className="tl-dot absolute left-5 top-10 z-20 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-ink bg-brand md:left-1/2" />

                  <div className="md:grid md:grid-cols-2 md:gap-x-48">
                    <div
                      className={`relative pl-12 md:pl-0 ${
                        left ? 'md:col-start-1' : 'md:col-start-2'
                      }`}
                    >
                      {/* Conector espina → tarjeta */}
                      <span
                        className={`tl-connector absolute top-10 hidden h-0.5 w-24 bg-brand/50 md:block ${
                          left
                            ? 'right-0 origin-right translate-x-full'
                            : 'left-0 origin-left -translate-x-full'
                        }`}
                      />

                      {/* Tarjeta con imagen de fondo */}
                      <article className="tl-card group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-bone/10 shadow-2xl shadow-black/40 sm:min-h-[380px]">
                        <img
                          src={item.img}
                          alt={`Juan Wagner · ${item.title}`}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.pos}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />

                        {/* Índice de paso (arriba) */}
                        <span className="absolute right-5 top-5 z-10 font-display text-xs font-semibold uppercase tracking-[0.28em] text-bone/50">
                          {String(i + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
                        </span>

                        {/* Contenido (abajo) */}
                        <div className="relative z-10 p-7 lg:p-8">
                          <span className="font-display text-4xl font-bold leading-none text-brand">
                            {item.year}
                          </span>
                          <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/70">
                            {item.text}
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
