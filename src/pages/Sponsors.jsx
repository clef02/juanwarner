import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BadgeCheck, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SPONSORS } from '../data/sponsors'
import heroImg from '../assets/info2.webp'
import introImg from '../assets/info1.webp'
import kitImg from '../assets/juan2.png'
import mediaKitPdf from '../assets/JuanWagner MediaKit 2026.pdf'
import yesoulLogo from '../assets/YESOUL FITNESS.png'
import temuLogo from '../assets/temu.png'
import openEnglishLogo from '../assets/openenglish.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const KIT_INCLUYE = [
  'Mi historia y línea editorial',
  'Datos de audiencia y alcance',
  'Casos de éxito con marcas',
  'Formatos y tarifas de colaboración',
]

// Muro de logos — marcas aliadas (YoungLA y Dragon toman su logo de SPONSORS)
const LOGOS = [
  ...SPONSORS.map((s) => ({ name: s.name, logo: s.logo })),
  { name: 'Yesoul Fitness', logo: yesoulLogo },
  { name: 'Temu', logo: temuLogo },
  { name: 'Open English', logo: openEnglishLogo },
]

function Sponsors() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.sp-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform',
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
        {/* 1. HERO */}
        <section className="relative flex h-svh w-full flex-col justify-end overflow-hidden bg-ink pb-16 pt-40 text-bone lg:pb-20">
          <img
            src={heroImg}
            alt="Juan Wagner"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-carmin" />
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                    Para marcas
                  </span>
                </div>
                <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.92] tracking-tight">
                  Colabora <span className="text-brand">conmigo</span>
                </h1>
                <p className="mt-5 max-w-xl text-sm uppercase tracking-wide text-bone/70 sm:text-base">
                  Conecta con una comunidad fiel de +1M de personas apasionadas
                  por el fitness y el estilo de vida.
                </p>
              </div>

              <a
                href="#media-kit"
                className="cta group inline-flex w-max -skew-x-12 items-center gap-2 bg-brand px-8 py-4 text-ink transition-colors duration-200 hover:bg-brand-bright"
              >
                <span className="flex skew-x-12 items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                  <Download className="h-4 w-4" />
                  Descargar media kit
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* 2. POR QUÉ COLABORAR — texto + imagen */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
            <div>
              <div className="sp-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Por qué yo
                </span>
              </div>
              <h2 className="sp-reveal mt-5 font-display text-3xl font-bold uppercase leading-[0.98] tracking-tight sm:text-4xl lg:text-5xl">
                Una comunidad que confía en lo que{' '}
                <span className="text-brand">recomiendo</span>
              </h2>
              <div className="sp-reveal mt-6 space-y-5 text-base leading-relaxed text-graphite">
                <p>
                  No vendo humo: comparto lo que de verdad uso. Por eso mi
                  audiencia responde, compra y vuelve — una comunidad
                  comprometida que sigue cada recomendación.
                </p>
                <p>
                  Detrás de cada colaboración hay horas de trabajo para
                  entregarle a tu marca contenido honesto, cuidado y pensado para
                  generar resultados reales.
                </p>
              </div>
            </div>

            <div className="sp-reveal relative aspect-square overflow-hidden rounded-3xl border border-ink/5 shadow-2xl shadow-black/30">
              <img
                src={introImg}
                alt="Juan Wagner con su comunidad"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* 3. MARCAS QUE YA CONFÍAN — 2 marcas */}
        <section className="bg-ink py-24 text-bone lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center text-center">
              <div className="sp-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Marcas aliadas
                </span>
              </div>
              <h2 className="sp-reveal mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
                Marcas que ya confían en mí
              </h2>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-5">
              {LOGOS.map(({ name, logo }) => (
                <div
                  key={name}
                  className="sp-reveal group relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-6 shadow-lg shadow-black/20"
                >
                  <img
                    src={logo}
                    alt={name}
                    loading="lazy"
                    className="max-h-20 w-auto max-w-full object-contain"
                  />
                  {/* Título al hover */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink py-2.5 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-bone transition-transform duration-300 ease-out group-hover:translate-y-0">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. MEDIA KIT — bento grid */}
        <section id="media-kit" className="scroll-mt-24 py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="sp-reveal flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Media kit
              </span>
            </div>
            <h2 className="sp-reveal mt-5 max-w-3xl font-display text-3xl font-bold uppercase leading-[0.98] tracking-tight sm:text-4xl lg:text-5xl">
              Todo sobre mí, en un <span className="text-brand">solo documento</span>
            </h2>

            {/* Bento */}
            <div className="sp-reveal mt-12 grid gap-4 lg:grid-cols-5 lg:items-stretch">
              {/* Imagen (tile grande a la izquierda) */}
              <div className="group relative order-1 min-h-[480px] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/25 ring-1 ring-ink/10 lg:col-span-3 lg:min-h-[640px]">
                <img
                  src={kitImg}
                  alt="Media kit de Juan Wagner"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-6 top-6 inline-flex items-center rounded-full border border-white/20 bg-ink/40 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-bone backdrop-blur-sm">
                  PDF · 2026
                </span>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-bone">
                    Juan Wagner
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    Coach · Creador · Embajador
                  </p>
                </div>
              </div>

              {/* Columna derecha: qué incluye + descarga */}
              <div className="order-2 flex flex-col gap-4 lg:col-span-2">
                {/* Qué incluye — 4 tarjetas con icono */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {KIT_INCLUYE.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[1.75rem] border border-ink/10 bg-white/50 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-black/5"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-sm font-medium leading-snug text-ink">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Descarga — tile oscuro premium con glow dorado */}
                <div className="relative flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-bone shadow-2xl shadow-black/30 lg:p-10">
                  <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/25 blur-3xl" />
                  <div className="relative">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand">
                      Documento completo
                    </span>
                    <p className="mt-3 max-w-md text-lg leading-relaxed text-bone/80">
                      Conoce a fondo mi audiencia, mis números y las formas de
                      trabajar juntos.
                    </p>
                  </div>
                  <a
                    href={mediaKitPdf}
                    download="Juan Wagner - Media Kit 2026.pdf"
                    className="cta group relative inline-flex w-max items-center gap-2 rounded-full bg-gradient-to-r from-brand-bright to-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink shadow-lg shadow-brand/20 transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <Download className="h-4 w-4" />
                    Descargar media kit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Sponsors
