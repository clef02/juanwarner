import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll suave con Lenis, sincronizado con el ticker de GSAP y ScrollTrigger.
 * Envuelve la app: <SmoothScroll>{children}</SmoothScroll>
 */
function SmoothScroll({ children }) {
  useEffect(() => {
    // Respeta la preferencia de movimiento reducido: sin smooth scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2, // más alto = más lento/suave
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Mantiene ScrollTrigger sincronizado con el scroll de Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Lenis se anima con el ticker de GSAP (una sola fuente de RAF)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  return children
}

export default SmoothScroll
