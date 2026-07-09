import { createContext, useContext, useEffect, useState } from 'react'
import { X, Send, Check } from 'lucide-react'

// ⚠️ PEGA AQUÍ TU ACCESS KEY DE WEB3FORMS
// Gratis en https://web3forms.com → pon tu correo → te dan una "Access Key".
// Los mensajes del formulario te llegarán a ese correo.
const WEB3FORMS_ACCESS_KEY = 'TU_ACCESS_KEY_DE_WEB3FORMS'

// Asuntos según el botón que abre el modal
const TOPICS = {
  marca: 'Colaboración de marca',
  asesoria: 'Asesoría / planes',
  general: 'Consulta general',
}

const ContactContext = createContext(null)

// Hook para abrir el modal desde cualquier CTA. Si no hay provider, no rompe.
export function useContact() {
  return useContext(ContactContext) ?? { openContact: () => {}, closeContact: () => {} }
}

export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState('general')

  const openContact = (t = 'general') => {
    setTopic(TOPICS[t] ? t : 'general')
    setOpen(true)
  }
  const closeContact = () => setOpen(false)

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
      {children}
      <ContactModal open={open} topic={topic} onClose={closeContact} />
    </ContactContext.Provider>
  )
}

function ContactModal({ open, topic, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  useEffect(() => {
    if (!open) {
      setStatus('idle')
      return
    }
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo contacto (${data.asunto}) — juanwagner.com`,
          from_name: 'Web · Juan Wagner',
          ...data,
        }),
      })
      const json = await res.json()
      setStatus(json.success ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative my-8 w-full max-w-lg rounded-3xl border border-bone/10 bg-ink p-8 text-bone shadow-2xl shadow-black/50 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 text-bone/50 transition-colors hover:text-brand"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'ok' ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
              ¡Mensaje enviado!
            </h3>
            <p className="mt-2 text-sm text-bone/70">
              Gracias por escribir. Te responderé lo antes posible.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-brand-bright"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Contáctame
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
              Trabajemos juntos
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-bone/60">
              Cuéntame qué necesitas y te respondo lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Honeypot anti-spam (oculto) */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nombre" name="nombre" required />
                <Field label="Correo" name="correo" type="email" required />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-bone/60">
                  Asunto
                </label>
                <select
                  name="asunto"
                  defaultValue={TOPICS[topic]}
                  className="w-full rounded-lg border border-bone/15 bg-bone/5 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  {Object.values(TOPICS).map((t) => (
                    <option key={t} value={t} className="bg-ink">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-bone/60">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  required
                  className="w-full resize-none rounded-lg border border-bone/15 bg-bone/5 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-carmin">
                  Hubo un error al enviar. Intenta de nuevo o escríbeme por redes.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="cta group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-brand-bright disabled:opacity-60"
              >
                {status === 'sending' ? (
                  'Enviando…'
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-bone/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-bone/15 bg-bone/5 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
      />
    </div>
  )
}
