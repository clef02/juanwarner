import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import info1 from '../assets/info1.webp'
import info2 from '../assets/info2.webp'
import juan2 from '../assets/juan2.png'
import creadorImg from '../assets/creador.webp'
import quiensoy from '../assets/quiensoy.webp'
import galeria from '../assets/galeria.webp'
import galeri1 from '../assets/galeri1.mp4'
import galeri3 from '../assets/galeri3.webp'
import galeri4 from '../assets/galeri4.webp'
import galeri5 from '../assets/galeri5.webp'
import galeri6 from '../assets/galeri6.webp'
import galeri7 from '../assets/galeri7.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Galería — cuadrícula de 2 columnas (todas en pares). `video:` = clip.
// `alt` describe lo que se ve en cada foto (no quién es Juan): son imágenes con
// contenido, no adorno, así que cada una necesita su texto para Google y los
// lectores de pantalla. Si cambias una imagen, cambia también su `alt`.
const IMAGES = [
  { img: info2, pos: 'object-top', alt: 'Juan Wagner entrenando en el gimnasio' },
  { video: galeri1, pos: 'object-center' },
  { img: juan2, pos: 'object-top', alt: 'Juan Wagner con camiseta de compresión en el gimnasio' },
  {
    img: galeri4,
    pos: 'object-center',
    alt: 'Juan Wagner posando frente al espejo durante una sesión de fotos',
  },
  {
    img: galeri5,
    pos: 'object-center',
    alt: 'Juan Wagner entrenando al aire libre con una mancuerna de madera',
  },
  { img: galeria, pos: 'object-center', alt: 'Juan Wagner posando con un seguidor en un evento' },
  { img: info1, pos: 'object-center', alt: 'Juan Wagner rodeado de seguidores en un evento' },
  {
    img: creadorImg,
    pos: 'object-center',
    alt: 'Juan Wagner grabando contenido con el móvil en el gimnasio',
  },
  {
    img: galeri6,
    pos: 'object-center',
    alt: 'Juan Wagner sosteniendo un disco de peso en el gimnasio',
  },
  {
    img: galeri7,
    pos: 'object-center',
    alt: 'Juan Wagner volteando un neumático gigante al aire libre',
  },
  { img: galeri3, pos: 'object-center', alt: 'Juan Wagner posando sin camiseta en el gimnasio' },
  { img: quiensoy, pos: 'object-center', alt: 'Juan Wagner marcando bíceps en el gimnasio' },
]

function Galeria() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // El título entra desde abajo (normal, legible)
      gsap.from('.gal-title', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })

      // El título se desvanece al pasar ~2 imágenes
      gsap.to('.gal-titlebox', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=120%',
          scrub: true,
        },
      })

      // Entrada: cada imagen aparece subiendo al entrar en viewport
      gsap.utils.toArray('.gal-item').forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 90%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative bg-ink text-bone">
      {/* Título sticky, pegado arriba */}
      <div className="pointer-events-none sticky top-0 z-0 flex h-screen items-start justify-center pt-24 lg:pt-28">
        <div className="gal-titlebox text-center">
          <p className="gal-title text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Mi mundo
          </p>
          <h2 className="gal-title mt-2 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold uppercase leading-none tracking-tight">
            Galería
          </h2>
        </div>
      </div>

      {/* Dos columnas tipo mosaico — la derecha desfasada hacia abajo */}
      <div className="relative z-10 mx-auto -mt-[100vh] grid w-full max-w-[1200px] grid-cols-2 gap-x-6 px-6 pb-[12vh] pt-[34vh] sm:gap-x-12 sm:px-10">
        {[0, 1].map((col) => (
          <div
            key={col}
            className={`flex flex-col gap-4 sm:gap-6 ${
              col === 1 ? 'mt-8 sm:mt-16' : ''
            }`}
          >
            {IMAGES.filter((_, i) => i % 2 === col).map((g, j) => (
              <div key={`${col}-${j}`} className="gal-item">
                <div className="aspect-[3/4] overflow-hidden rounded-xl border border-bone/10 bg-ink shadow-2xl shadow-black/60">
                  {g.video ? (
                    <video
                      src={g.video}
                      className={`h-full w-full object-cover ${g.pos}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={g.img}
                      alt={g.alt}
                      loading="lazy"
                      className={`h-full w-full object-cover ${g.pos}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Galeria
