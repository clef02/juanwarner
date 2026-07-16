import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Timeline from '../components/Timeline'
import Filosofia from '../components/Filosofia'
import juan2 from '../assets/juan2.webp'
import quiensoy from '../assets/quiensoy.webp'
import creadorImg from '../assets/creador.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function QuienSoy() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.qs-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <Navbar />

      <main className="bg-bone text-ink">
        {/* 1. HERO — imagen + título abajo-izquierda */}
        <section className="relative flex h-svh w-full flex-col justify-end overflow-hidden bg-ink pb-16 pt-40 text-bone lg:pb-20">
          <img
            src={juan2}
            alt="Juan Wagner con camiseta de compresión en el gimnasio"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="qs-reveal flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Quién soy
              </span>
            </div>
            <h1 className="qs-reveal mt-5 max-w-3xl font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.92] tracking-tight">
              La historia detrás
              <br />
              del <span className="text-brand">físico</span>
            </h1>
            <p className="qs-reveal mt-5 max-w-xl text-sm uppercase tracking-wide text-bone/70 sm:text-base">
              Atleta, creador de contenido
            </p>
          </div>
        </section>

        {/* 2. HISTORIA — lead + texto a dos columnas */}
        <section className="bg-ink py-24 text-bone lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="qs-reveal flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Mi historia
              </span>
            </div>
            <p className="qs-reveal mt-6 max-w-4xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Nací en Santiago de Cali y a los 19 salí a buscar algo más
              grande, por un camino que muy pocos habrían elegido.
            </p>

            <div className="qs-reveal mt-12 grid grid-cols-1 gap-10 text-base leading-relaxed text-bone/75 md:grid-cols-2 lg:gap-16">
              <div className="space-y-5">
                <p>
                  Nací y crecí en Santiago de Cali, Colombia, y viví allí hasta
                  los 19 años. De niño sufrí obesidad tipo 1, y con ella llegaron
                  inseguridad y heridas en la autoestima que tardaron años en
                  sanar. El golpe más duro vino antes de cumplir 18: la depresión
                  y la ansiedad —clínicamente diagnosticadas— me llevaron a
                  querer quitarme la vida. Sobrevivir ese momento fue el inicio de
                  una decisión que empecé a tomar cada día,{' '}
                  <span className="text-bone">
                    elegir seguir, elegir mejorar, elegir construirme desde
                    adentro.
                  </span>
                </p>
                <p>
                  A los 19 empecé en el gimnasio, no desde la euforia sino desde
                  la necesidad de salir adelante. Nunca busqué competir en
                  físicoculturismo; busqué algo más valioso: transformarme de
                  verdad y encontrar en el proceso una razón para existir. Ahí
                  aprendí lo que aplico en todo: la disciplina es la clave, pero
                  la perfección nace de la imperfección, de los días difíciles en
                  que uno avanza de todas formas.
                </p>
              </div>
              <div className="space-y-5">
                <p>
                  Empecé a crear contenido porque no encontraba lo que buscaba:
                  dietas genéricas, alimentos prohibidos y, tarde o temprano, el
                  efecto rebote. Decidí predicar con el ejemplo y redefinir el
                  fitness como algo accesible, sostenible y humano. Mi logro más
                  grande no es ninguna cifra: es la comunidad que se formó
                  alrededor de este proceso.
                </p>
                <p>
                  En 2024 descubrí la actuación, y me cautivó como una de las
                  herramientas más poderosas para impactar a millones con un solo
                  mensaje. Hoy crezco en todos los frentes con la misma
                  disciplina. Mi meta es ser el mejor actor y creador de contenido
                  latino, y que dentro de diez años digan que los motivé a
                  moverse, a comer mejor y a pensar diferente —de la mano de Dios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. IMAGEN + IMAGEN — a todo el ancho */}
        <section className="grid grid-cols-1 sm:grid-cols-2">
          <div className="qs-reveal aspect-square overflow-hidden">
            <img
              src={quiensoy}
              loading="lazy"
              alt="Juan Wagner, atleta"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="qs-reveal aspect-square overflow-hidden">
            <img
              src={creadorImg}
              loading="lazy"
              alt="Juan Wagner creando contenido"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </section>

        {/* 4. Línea de tiempo */}
        <Timeline />

        {/* 5. Visión, misión y valores */}
        <Filosofia />
      </main>

      <Footer />
    </div>
  )
}

export default QuienSoy
