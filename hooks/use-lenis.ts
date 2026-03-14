import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) {
      return
    }

    // Lenis 1.x API — only pass supported options
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const animationId = requestAnimationFrame(raf)

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    return () => {
      cancelAnimationFrame(animationId)
      lenis.destroy()
    }
  }, [])
}
