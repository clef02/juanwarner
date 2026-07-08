import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, Target, Dumbbell, Fingerprint, Flag, Eye, Award, Users } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const FEATURES = [
  {
    icon: Compass,
    kicker: 'Visión',
    text: 'Ser la referencia de que un latino puede ser todo lo que se proponga, siempre y cuando tenga a Dios en su corazón, haga las cosas sin malicia y busque impactar positivamente en la vida de los demás.',
    highlight: false,
  },
  {
    icon: Target,
    kicker: 'Misión',
    text: 'Ayudar a la mayor cantidad de personas posibles a mejorar su estilo de vida a través del entrenamiento, la alimentación y la mentalidad, con la convicción de que la excelencia está en la disciplina que potencia todas las áreas de nuestra vida, desde un punto de vista moderado, no exagerado ni irreal.',
    highlight: true,
  },
]

const VALUES = [
  {
    icon: Dumbbell,
    name: 'Disciplina',
    desc: 'El trabajo diario le gana al talento.',
  },
  { icon: Fingerprint, name: 'Autenticidad', desc: 'Ser siempre uno mismo.' },
  {
    icon: Flag,
    name: 'Propósito',
    desc: 'Cada proyecto tiene una razón clara de existir.',
  },
  {
    icon: Eye,
    name: 'Honestidad',
    desc: 'Transparencia en lo que se hace y en el proceso.',
  },
  {
    icon: Award,
    name: 'Excelencia',
    desc: 'Estándares altos en todos los frentes, no solo en el deporte.',
  },
  {
    icon: Users,
    name: 'Impacto social',
    desc: 'Dejar todo mejor de lo que lo encontré.',
  },
]

function Filosofia() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.fi-head', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })

      gsap.from('.fi-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.fi-grid', start: 'top 82%' },
      })

      gsap.from('.fi-value', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.fi-values', start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-bone py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-14">
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center">
          <div className="fi-head flex items-center gap-3">
            <span className="h-px w-10 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Mi esencia
            </span>
          </div>
          <h2 className="fi-head mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Visión, misión y <span className="text-brand">valores</span>
          </h2>
        </div>

        {/* Visión + Misión */}
        <div className="fi-grid mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20">
          {FEATURES.map((c) => {
            const Icon = c.icon
            return (
              <article
                key={c.kicker}
                className={`fi-card flex h-full flex-col rounded-3xl p-10 lg:p-12 ${
                  c.highlight
                    ? 'bg-gradient-to-br from-brand-bright via-brand to-brand text-ink shadow-2xl shadow-brand/25'
                    : 'border border-ink/5 bg-ink text-bone shadow-xl shadow-black/30'
                }`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    c.highlight ? 'bg-ink/10 text-ink' : 'bg-brand/10 text-brand'
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-7 font-display text-3xl font-bold uppercase tracking-tight lg:text-4xl">
                  {c.kicker}
                </h3>

                <p
                  className={`mt-4 text-base leading-relaxed ${
                    c.highlight ? 'text-ink/80' : 'text-bone/70'
                  }`}
                >
                  {c.text}
                </p>
              </article>
            )
          })}
        </div>

        {/* Valores */}
        <div className="fi-values mt-8 md:mt-8">
          <div className="fi-head flex items-center gap-3">
            <span className="h-px w-10 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Valores
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.name}
                  className="fi-value rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 transition-colors duration-200 hover:border-brand/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h4 className="font-display text-base font-bold uppercase tracking-tight">
                      {v.name}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filosofia
