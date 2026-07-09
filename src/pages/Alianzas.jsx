import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Copy, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NotFound from './NotFound'
import { getSponsor } from '../data/sponsors'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Patrón de mosaico (bento) — tiles de tamaños alternados
const BENTO = [
  'sm:col-span-4 sm:row-span-2',
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-4 sm:row-span-2',
]

function Alianza() {
  const { slug } = useParams()
  const sponsor = getSponsor(slug)
  const root = useRef(null)
  const [copied, setCopied] = useState(false)

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.al-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    },
    { scope: root, dependencies: [slug] },
  )

  // Slug inexistente → 404
  if (!sponsor) return <NotFound />

  // Pista del slider infinito: repite la galería lo suficiente para llenar el
  // ancho, en dos mitades idénticas (para que el bucle a -50% sea perfecto).
  const gallery = sponsor.gallery ?? []
  const half = gallery.length
    ? Math.ceil(Math.max(8, gallery.length) / gallery.length) * gallery.length
    : 0
  const galleryTrack = Array.from(
    { length: half * 2 },
    (_, i) => gallery[i % gallery.length],
  )

  return (
    <div ref={root} key={sponsor.slug}>
      <Navbar />

      <main className="bg-bone text-ink">
        {/* 1. HERO */}
        <section className="relative flex h-svh w-full flex-col justify-end overflow-hidden bg-ink pb-16 pt-40 text-bone lg:pb-20">
          <img
            src={sponsor.heroImg}
            alt={`Juan Wagner · ${sponsor.name}`}
            className={`absolute inset-0 h-full w-full object-cover ${
              sponsor.heroPos || 'object-center'
            }`}
          />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Patrocinio
              </span>
            </div>
            <h1 className="mt-6">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 w-auto max-w-full brightness-0 invert sm:h-24 lg:h-32"
              />
            </h1>
            <p className="mt-5 max-w-xl text-sm uppercase tracking-wide text-bone/70 sm:text-base">
              {sponsor.category}
            </p>
          </div>
        </section>

        {/* 2. INTRO — texto + imagen */}
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
            <div>
              <div className="al-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  La alianza
                </span>
              </div>
              <h2 className="al-reveal mt-5 font-display text-3xl font-bold uppercase leading-[0.98] tracking-tight sm:text-4xl lg:text-5xl">
                {sponsor.introHeading}
              </h2>
              <div className="al-reveal mt-6 space-y-5 text-base leading-relaxed text-graphite">
                {sponsor.introParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Descuento */}
              <div className="al-reveal mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={sponsor.discount.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta group inline-flex -skew-x-12 items-center gap-2 bg-brand px-7 py-4 text-ink transition-colors duration-200 hover:bg-brand-bright"
                >
                  <span className="flex skew-x-12 items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    Obtén tu descuento
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </a>
                {/* Código destacado tipo cupón — clic para copiar */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-graphite/70">
                    Código de descuento
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCode(sponsor.discount.code)}
                    aria-label={`Copiar código ${sponsor.discount.code}`}
                    className="group inline-flex items-center gap-3 rounded-lg border-2 border-dashed border-brand/60 bg-brand/10 px-4 py-2.5 transition-colors duration-200 hover:border-brand hover:bg-brand/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <span className="font-display text-xl font-bold uppercase tracking-[0.15em] text-ink">
                      {sponsor.discount.code}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="al-reveal relative aspect-square overflow-hidden rounded-3xl border border-ink/5 bg-ink/[0.03] shadow-2xl shadow-black/30">
              <img
                src={sponsor.introImg}
                alt={sponsor.name}
                className={`h-full w-full ${sponsor.introFit || 'object-cover'} ${
                  sponsor.introPos || 'object-top'
                }`}
              />
            </div>
          </div>
        </section>

        {/* Suplementos — "Así me suplemento yo" (solo si el patrocinio lo trae) */}
        {sponsor.supplements && (
          <section className="pt-12 pb-24 lg:pt-16 lg:pb-32">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
              <div className="al-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Mi rutina
                </span>
              </div>
              <h2 className="al-reveal mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {sponsor.supplements.heading}
              </h2>

              {/* Layout: imagen grande | (lista numerada + imagen abajo) */}
              <div className="al-reveal mt-12 grid gap-4 lg:grid-cols-2 lg:items-stretch">
                {/* Imagen grande — izquierda */}
                <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-ink/5 shadow-xl shadow-black/20 lg:min-h-[600px]">
                  <img
                    src={sponsor.supplements.imgMain}
                    alt={sponsor.name}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>

                {/* Derecha: lista numerada + imagen abajo */}
                <div className="flex flex-col gap-4">
                  {/* Lista numerada 1–5 */}
                  <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 sm:p-8">
                    {sponsor.supplements.items.map((s, i) => (
                      <div
                        key={s.name}
                        className={`flex gap-5 py-4 ${
                          i !== 0 ? 'border-t border-ink/10' : ''
                        }`}
                      >
                        <span className="font-display text-sm font-bold text-brand">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                            {s.name}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-graphite">
                            {s.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Imagen — abajo de los números */}
                  <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-ink/5 shadow-xl shadow-black/20 lg:min-h-[420px]">
                    <img
                      src={sponsor.supplements.imgSide}
                      alt={sponsor.name}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. PRODUCTOS — título = nombre de la marca */}
        <section className="bg-ink py-24 text-bone lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="al-reveal flex items-center gap-4">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
                {sponsor.name}
              </h2>
              <span className="h-px flex-1 bg-bone/15" />
            </div>
            {sponsor.outro && (
              <p className="al-reveal mt-6 max-w-3xl text-base leading-relaxed text-bone/70">
                {sponsor.outro}
              </p>
            )}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:auto-rows-[180px] sm:grid-cols-6">
              {sponsor.products.map((p, i) => (
                <a
                  key={p.name}
                  href={sponsor.discount.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`al-reveal group relative block aspect-[4/3] overflow-hidden rounded-xl border border-bone/10 sm:aspect-auto ${
                    BENTO[i % BENTO.length]
                  }`}
                >
                  <img
                    src={p.img}
                    alt={`${sponsor.name} · ${p.name}`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.pos}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-base font-bold uppercase tracking-tight sm:text-lg">
                      {p.name}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-bone/80 transition-colors group-hover:text-brand">
                      Ver producto
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GALERÍA — slider infinito (marquee), solo si el patrocinio lo trae */}
        {sponsor.gallery && (
          <section className="overflow-hidden bg-bone py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
              <div className="al-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Galería
                </span>
              </div>
              <h2 className="al-reveal mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                En acción con <span className="text-brand">{sponsor.name}</span>
              </h2>
            </div>

            {/* Pista infinita */}
            <div className="group relative mt-12 flex overflow-hidden">
              {/* Difuminado en los bordes */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bone to-transparent sm:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bone to-transparent sm:w-28" />

              <div className="flex shrink-0 group-hover:[animation-play-state:paused] motion-safe:animate-[marquee_40s_linear_infinite]">
                {galleryTrack.map((img, i) => (
                  <div
                    key={i}
                    className="relative mr-4 h-72 w-56 shrink-0 overflow-hidden rounded-2xl border border-ink/5 shadow-xl shadow-black/20 sm:h-96 sm:w-72"
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default Alianza
