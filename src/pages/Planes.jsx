import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Check,
  Home,
  Repeat,
  LineChart,
  Utensils,
  ShoppingCart,
  RefreshCw,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoCTA from '../components/VideoCTA'
import { useContact } from '../components/ContactModal'
import heroImg from '../assets/info2.webp'
import encasaImg from '../assets/encasa.jpg'
import entrenaImg from '../assets/entrena.jpg'
import controlImg from '../assets/control.jpg'
import comerImg from '../assets/comer.jpg'
import listaImg from '../assets/listamercado.jpg'
import necesidadesImg from '../assets/nesecidades.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const RUTINA = {
  eyebrow: 'Entrenamiento',
  heading: 'Una rutina diseñada exclusivamente para ti',
  intro:
    'Cada cuerpo es distinto, así que tu entrenamiento tampoco debería ser igual al de nadie más. Cuenta con un plan pensado a la medida de tus metas y tu punto de partida.',
  items: [
    {
      icon: Home,
      title: 'Entrena donde te quede mejor',
      text: 'Ya sea en el gimnasio o en casa, tú decides dónde entrenar. Las dos opciones están disponibles para adaptarse a tu rutina.',
      img: encasaImg,
      pos: 'object-bottom',
    },
    {
      icon: Repeat,
      title: 'Cambia de ejercicio cuando lo necesites',
      text: '¿Un ejercicio se te complica por una molestia física o simplemente no es tu día? Tranquilo, siempre habrá una alternativa para reemplazarlo.',
      img: entrenaImg,
    },
    {
      icon: LineChart,
      title: 'Lleva el control de tu entrenamiento',
      text: 'Registra cada sesión y observa tu evolución directamente desde la app.',
      img: controlImg,
    },
  ],
}

const ALIMENTACION = {
  eyebrow: 'Nutrición',
  heading: 'Un plan nutricional pensado para tu estilo de vida',
  intro:
    'Tu plan de alimentación se arma según tus gustos, tus horarios y una forma de comer que realmente puedas mantener en el tiempo. A medida que avances, lo iré ajustando para acompañar tu progreso.',
  items: [
    {
      icon: Utensils,
      title: 'Salir a comer no es un obstáculo',
      text: 'Ir a un restaurante no arruina tu plan. Te mostraré cómo escoger bien en tus sitios favoritos sin perder el control de tus macros y calorías.',
      img: comerImg,
    },
    {
      icon: ShoppingCart,
      title: 'Lista de mercado lista para usar',
      text: 'Simplifica tus compras con una lista ya organizada para ti.',
      img: listaImg,
    },
    {
      icon: RefreshCw,
      title: 'Ajustes según tus necesidades',
      text: '¿Hay algo que no te cae bien, alguna alergia o un alimento que prefieres evitar? Sin problema, lo reemplazamos por otra opción que sí te funcione.',
      img: necesidadesImg,
    },
  ],
}

const FULL_FEATURES = [
  'Rutina de entrenamiento a tu medida',
  'Plan de alimentación personalizado',
  'Videos educativos de entrenamiento y nutrición',
  'Videos con demostración de cada ejercicio',
  'Lista de mercado descargable',
  'Reemplazo de alimentos por gustos, alergias o intolerancias',
  'Registro de tus entrenamientos',
  'Seguimiento de tu progreso',
  'Acceso a la comunidad',
  'Soporte online',
  'Garantía de 7 días',
]

const TRAINING_FEATURES = [
  'Rutina de entrenamiento a tu medida',
  'Videos educativos de entrenamiento y nutrición',
  'Videos con demostración de cada ejercicio',
  'Registro de tus entrenamientos',
  'Seguimiento de tu progreso',
  'Acceso a la comunidad',
  'Soporte online',
  'Garantía de 7 días',
]

const NUTRITION_FEATURES = [
  'Plan de alimentación personalizado',
  'Videos educativos de entrenamiento y nutrición',
  'Lista de mercado descargable',
  'Reemplazo de alimentos por gustos, alergias o intolerancias',
  'Seguimiento de tu progreso',
  'Acceso a la comunidad',
  'Soporte online',
  'Garantía de 7 días',
]

// Divisas del selector de precios (la primera es la que se muestra por defecto).
const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'MXN', symbol: '$' },
  { code: 'COP', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'ARS', symbol: '$' },
  { code: 'PEN', symbol: 'S/' },
]

// ⚠️ PRECIOS LOCALES — DEFÍNELOS TÚ.
// Los valores en USD son los reales. El resto (MXN, COP, EUR, ARS, PEN) son
// DE REFERENCIA: reemplázalos por tus precios finales para cada país.
// El importe se muestra tal cual (con separadores de miles), precedido por el
// símbolo de la divisa activa. Si agregas/quitas divisas, edita CURRENCIES arriba
// y añade/quita la clave correspondiente en cada `amount`.
const PLANS = [
  {
    id: 'completo',
    name: 'Programa completo',
    tagline: 'Entrenamiento + Nutrición',
    prices: [
      {
        label: 'Trimestral',
        note: 'cada 3 meses',
        amount: { USD: '110', MXN: '1.990', COP: '440.000', EUR: '99', ARS: '110.000', PEN: '410' },
      },
      {
        label: 'Mensual',
        note: 'al mes',
        amount: { USD: '49', MXN: '899', COP: '195.000', EUR: '45', ARS: '49.000', PEN: '185' },
      },
    ],
    features: FULL_FEATURES,
    cta: '¡Quiero empezar ahora!',
    featured: true,
    badge: 'Más completo',
  },
  {
    id: 'entrenamiento',
    name: 'Programa de entrenamiento',
    tagline: 'Mensual',
    prices: [
      {
        label: '',
        note: 'Facturación mensual',
        amount: { USD: '30', MXN: '549', COP: '120.000', EUR: '29', ARS: '30.000', PEN: '115' },
      },
    ],
    features: TRAINING_FEATURES,
    cta: '¡Quiero empezar ahora!',
    featured: false,
  },
  {
    id: 'nutricion',
    name: 'Programa de nutrición',
    tagline: 'Mensual',
    prices: [
      {
        label: '',
        note: 'Facturación mensual',
        amount: { USD: '30', MXN: '549', COP: '120.000', EUR: '29', ARS: '30.000', PEN: '115' },
      },
    ],
    features: NUTRITION_FEATURES,
    cta: '¡Quiero empezar ahora!',
    featured: false,
  },
]

const FAQ = [
  {
    q: '¿Cómo accedo a mi programa?',
    a: 'Después de completar la compra, tu programa queda disponible en la zona exclusiva para miembros de la página. Solo debes entrar a la sección de servicios, seleccionar un plan, hacer el pago y completar tus datos personales; a partir de ahí, comenzaré a preparar tu programa a la medida.',
  },
  {
    q: '¿Funciona como una suscripción?',
    a: 'Sí, y lo elegí así para que puedas mantener tu progreso en el tiempo, ya que el seguimiento constante es fundamental. Puedes optar por un plan mensual o trimestral: en ambos casos, tus entrenamientos y comidas se van actualizando según tu avance, con acompañamiento continuo de mi parte y de mi equipo. Y no hay compromiso a largo plazo: puedes cancelar cuando lo desees.',
  },
  {
    q: '¿Puedo tomar el programa desde cualquier país?',
    a: 'Claro que sí. Como todo funciona de manera online, puedes acceder al programa, al equipo y a mí sin importar en qué parte del mundo te encuentres.',
  },
  {
    q: '¿Se puede entrenar desde casa?',
    a: 'Sí, tu plan puede adaptarse para entrenar en casa; solo necesitas un set básico de pesas o mancuernas. Asegúrate de marcar la opción "casa" en el formulario inicial.',
  },
  {
    q: 'Política de reembolsos',
    a: 'Encuentra toda la información sobre reembolsos y devoluciones en nuestros Términos y Condiciones.',
  },
  {
    q: '¿Cómo cancelo mi plan?',
    a: 'Debes enviarme un correo con al menos 7 días de anticipación para evitar un nuevo cobro. Ten presente que, una vez canceles, perderás el acceso a tus entrenamientos, planes, soporte y guías asociadas.',
  },
  {
    q: 'Nunca he ido al gimnasio, ¿puedo empezar igual?',
    a: 'Por supuesto. El entrenamiento se adapta completamente a ti y a tu nivel. Si estás iniciando, te guiaré con un programa propio, comenzando con cargas livianas para desarrollar tu condición física base y aumentando poco a poco semana a semana o mes a mes.',
  },
  {
    q: '¿El programa cambia cada mes?',
    a: 'Sí. Ningún mes es igual al anterior: hay progresión constante, variación de ejercicios, incremento gradual de carga o intensidad, y ajustes continuos en tu alimentación. La idea es que siempre estés avanzando.',
  },
]

function EditorialShowcase({ data, dark = false, reverse = false }) {
  const [active, setActive] = useState(0)
  const item = data.items[active]
  const total = String(data.items.length).padStart(2, '0')
  const accent = dark ? 'text-brand' : 'text-carmin'

  return (
    <section
      className={`relative overflow-hidden py-24 lg:py-32 ${
        dark ? 'bg-ink text-bone' : 'bg-bone text-ink'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        {/* Etiqueta de sección */}
        <div className="pl-reveal flex items-center gap-3">
          <span className="h-px w-10 bg-carmin" />
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            {data.eyebrow}
          </span>
        </div>

        {/* Bloque editorial interactivo — miniaturas | imagen | texto */}
        <div className="pl-reveal relative mt-10 grid grid-cols-1 items-center gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* Miniaturas — columna lateral */}
          <div
            className={`order-2 lg:col-span-1 lg:self-start ${
              reverse ? 'lg:order-3' : 'lg:order-1'
            }`}
          >
            <span
              className={`mb-3 hidden text-[0.6rem] font-semibold uppercase tracking-[0.1em] lg:block ${accent}`}
            >
              Selecciona
            </span>
            <div className="flex gap-2.5 lg:flex-col">
              {data.items.map((it, i) => (
                <button
                  key={it.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={it.title}
                  className={`aspect-[4/3] w-20 overflow-hidden rounded border-2 transition-all duration-200 lg:w-full ${
                    active === i
                      ? 'border-brand'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className={`h-full w-full object-cover ${
                      it.pos || 'object-center'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Imagen grande — centro */}
          <div className="relative order-1 lg:order-2 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl shadow-black/25 lg:aspect-[5/4]">
              <img
                key={item.img}
                src={item.img}
                alt={item.title}
                className={`h-full w-full animate-[pl-fade_0.5s_ease] object-cover ${
                  item.pos || 'object-center'
                }`}
              />
            </div>
          </div>

          {/* Titular + texto */}
          <div
            className={`order-3 lg:col-span-4 ${
              reverse ? 'lg:order-1' : 'lg:order-3'
            }`}
          >
            {/* Garabato carmín decorativo */}
            <svg
              viewBox="0 0 120 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className={`mb-3 h-8 w-24 ${accent}`}
            >
              <path d="M2 22 Q 16 2 30 22 T 58 22 T 86 22 T 114 22" />
            </svg>
            <span
              className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${accent}`}
            >
              {String(active + 1).padStart(2, '0')} / {total}
            </span>
            <h3
              key={`t-${active}`}
              className="mt-2 animate-[pl-fade_0.5s_ease] font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {item.title}
            </h3>
            <p
              key={`p-${active}`}
              className={`mt-5 max-w-md animate-[pl-fade_0.5s_ease] text-base leading-relaxed ${
                dark ? 'text-bone/70' : 'text-graphite'
              }`}
            >
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Planes() {
  const root = useRef(null)
  const { openContact } = useContact()
  // Toggle de facturación — solo aplica a la tarjeta con varios precios (Programa completo)
  const [period, setPeriod] = useState(0)
  // Selector de divisa — aplica a los precios de todos los planes
  const [currency, setCurrency] = useState(CURRENCIES[0].code)
  const symbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol ?? '$'

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.pl-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.from('.pl-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.pl-cards', start: 'top 82%' },
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
            alt="Juan Wagner entrenando"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-carmin" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Planes y asesorías
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.92] tracking-tight">
              Empieza tu <span className="text-brand">transformación</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm uppercase tracking-wide text-bone/70 sm:text-base">
              Entrena conmigo con un plan hecho para tu cuerpo, tu ritmo y tus
              metas.
            </p>
          </div>
        </section>

        {/* 2. RUTINA DE ENTRENAMIENTO (interactivo editorial) */}
        <EditorialShowcase data={RUTINA} />

        {/* 3. PLAN DE ALIMENTACIÓN (interactivo editorial, en espejo) */}
        <EditorialShowcase data={ALIMENTACION} dark reverse />

        {/* 4. PLANES Y PRECIOS */}
        <section className="bg-bone py-24 lg:py-32">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center text-center">
              <div className="pl-reveal flex items-center gap-3">
                <span className="h-px w-10 bg-carmin" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Planes y precios
                </span>
              </div>
              <h2 className="pl-reveal mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Elige tu <span className="text-brand">programa</span>
              </h2>

              {/* Selector de divisa — cambia los precios de todos los planes */}
              <div className="pl-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
                  Moneda
                </span>
                <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-ink/5 p-1">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCurrency(c.code)}
                      aria-pressed={currency === c.code}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                        currency === c.code
                          ? 'bg-ink text-bone'
                          : 'text-graphite hover:text-ink'
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pl-cards mt-16 grid grid-cols-1 items-center gap-8 md:grid-cols-3 lg:mt-20">
              {PLANS.map((p) => (
                <article
                  key={p.id}
                  className={`pl-card flex h-full flex-col rounded-3xl p-8 lg:p-10 ${
                    p.featured
                      ? 'bg-gradient-to-br from-brand-bright via-brand to-brand text-ink shadow-2xl shadow-brand/25 md:-translate-y-6 md:py-14'
                      : 'border border-ink/5 bg-ink text-bone shadow-xl shadow-black/30'
                  }`}
                >
                  {(p.badge || p.prices.length > 1) && (
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      {p.badge && (
                        <span
                          className={`inline-flex w-max items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] ${
                            p.featured ? 'bg-ink text-brand' : 'bg-brand text-ink'
                          }`}
                        >
                          {p.badge}
                        </span>
                      )}
                      {/* Toggle Trimestral / Mensual — en la esquina superior derecha */}
                      {p.prices.length > 1 && (
                        <div className="ml-auto inline-flex rounded-full bg-ink/10 p-1">
                          {p.prices.map((pr, i) => (
                            <button
                              key={pr.label}
                              type="button"
                              onClick={() => setPeriod(i)}
                              aria-pressed={period === i}
                              className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide transition-colors ${
                                period === i
                                  ? 'bg-ink text-brand'
                                  : 'text-ink/70 hover:text-ink'
                              }`}
                            >
                              {pr.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">
                    {p.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      p.featured ? 'text-ink/70' : 'text-bone/60'
                    }`}
                  >
                    {p.tagline}
                  </p>

                  {/* Precio */}
                  {p.prices.length > 1 ? (
                    <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-5xl font-bold leading-none lg:text-6xl">
                        {symbol}
                        {p.prices[period].amount[currency]}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                        {p.prices[period].note}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-2">
                      {p.prices.map((pr, i) => (
                        <div key={i} className="flex flex-wrap items-baseline gap-x-2">
                          {pr.label && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                              {pr.label}
                            </span>
                          )}
                          <span className="font-display text-5xl font-bold leading-none lg:text-6xl">
                            {symbol}
                            {pr.amount[currency]}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-bone/50">
                            {pr.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Beneficios — justifican el precio */}
                  <div
                    className={`mt-8 flex-1 border-t pt-6 ${
                      p.featured ? 'border-ink/15' : 'border-white/10'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                        p.featured ? 'text-ink/60' : 'text-brand'
                      }`}
                    >
                      Incluye
                    </p>
                    <ul className="mt-5 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              p.featured ? 'text-ink' : 'text-brand'
                            }`}
                            strokeWidth={3}
                          />
                          <span className={p.featured ? 'text-ink/85' : 'text-bone/75'}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA — al fondo, alineado en las tres tarjetas
                      TODO: conectar al checkout/compra cuando esté listo */}
                  <button
                    type="button"
                    className={`cta mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider transition-colors ${
                      p.featured
                        ? 'bg-ink text-bone hover:bg-ink/85'
                        : 'bg-brand text-ink hover:bg-brand-bright'
                    }`}
                  >
                    {p.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PREGUNTAS FRECUENTES */}
        <section className="bg-bone pb-24 lg:pb-32">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
              {/* Título + descripción — izquierda (fijo) */}
              <div className="lg:sticky lg:top-28 lg:w-[30%] lg:self-start">
                <div className="pl-reveal flex items-center gap-3">
                  <span className="h-px w-10 bg-carmin" />
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                    Dudas
                  </span>
                </div>
                <h2 className="pl-reveal mt-5 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
                  Preguntas frecuentes
                </h2>
                <p className="pl-reveal mt-6 max-w-sm text-base leading-relaxed text-graphite">
                  Resolví las dudas más comunes sobre los programas, los pagos y
                  cómo empezar. Si no está la tuya, escríbeme y con gusto te
                  ayudo.
                </p>
                <button
                  type="button"
                  onClick={() => openContact('general')}
                  className="pl-reveal group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:text-brand-bright"
                >
                  Escríbeme
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Acordeón — derecha */}
              <div className="lg:w-[58%]">
                <div className="border-t border-ink/10">
                  {FAQ.map((f) => (
                    <details
                      key={f.q}
                      className="pl-reveal group border-b border-ink/10"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-bold uppercase tracking-tight [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <ChevronDown className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <p className="pb-5 text-base leading-relaxed text-graphite">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Video CTA */}
        <VideoCTA />
      </main>

      <Footer />
    </div>
  )
}

export default Planes
