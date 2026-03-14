'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'
import { LogoTicker } from '@/components/sections/logo-ticker'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    id: '1',
    quote: "This is like having a world-class creative team that never sleeps. The consistency and speed are incomparable — we've never shipped this fast.",
    name: 'Jordan Lake',
    role: 'VP Marketing, Velocity Inc',
    result: '+$1.2M revenue',
  },
  {
    id: '2',
    quote: 'We cut our content production timeline in half while actually improving quality. Honestly, I was skeptical before the call.',
    name: 'Priya Mathur',
    role: 'Content Director, Narrative AI',
    result: '60% time saved',
  },
  {
    id: '3',
    quote: 'They understood our brand voice and scaled it without losing any of what made it ours. The content felt native, not produced.',
    name: 'David Chen',
    role: 'Founder, PixelStudio Co',
    result: '+280% engagement',
  },
]

export function SocialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const testimonialsWrapperRef = useRef<HTMLDivElement>(null)
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    // Pin timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: `+=${TESTIMONIALS.length * 100}%`, // Scroll distance based on items
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // Setup: stack all quotes on top of each other, hide all but first
    gsap.set(quoteRefs.current, { position: 'absolute', top: '50%', left: '50%', xPercent: -50, yPercent: -50, width: '100%', opacity: 0, scale: 0.94 })
    
    // Animate them fading in and out on scroll
    quoteRefs.current.forEach((quote, index) => {
      if (!quote) return
      
      // Materialize
      tl.to(quote, {
        opacity: 1,
        scale: 1,
        duration: 0.38,
        ease: 'power2.out',
      })
      
      // Hold it there
      tl.to({}, { duration: 1 })
      
      // Fade out
      if (index < TESTIMONIALS.length - 1) {
        tl.to(quote, {
          opacity: 0,
          scale: 0.94,
          duration: 0.38,
          ease: 'power2.in',
        })
      }
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(color-mix(in srgb, var(--base) 95%, transparent), color-mix(in srgb, var(--base) 95%, transparent)), url(/assets/hero/close-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
         <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
            <LogoTicker />
         </div>
      </div>
      <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center', zIndex: 10 }}>
        <div className="text-eyebrow" style={{ color: 'var(--ember)', opacity: 0.65 }}>
          Testimonials
        </div>
      </div>

      <div 
        ref={testimonialsWrapperRef} 
        style={{ position: 'relative', width: '100%', maxWidth: 900, height: 400, margin: '0 auto' }}
      >
        {TESTIMONIALS.map((t, index) => (
          <div
            key={t.id}
            ref={(el) => { quoteRefs.current[index] = el }}
            style={{ textAlign: 'center', padding: '0 24px' }}
          >
            {/* Quote */}
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(26px, 4.2vw, 52px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              margin: '0 0 48px 0',
            }}>
              "{t.quote}"
            </h3>

            {/* Attribution */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-4 sm:py-3 rounded-2xl sm:rounded-[100px]" style={{ background: 'var(--surface-glass)', border: '1px solid var(--rule)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', display: 'inline-flex' }}>
              <div className="text-center sm:text-left">
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: '0 0 2px 0' }}>{t.name}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mist)', margin: 0 }}>{t.role}</p>
              </div>
              
              <div className="hidden sm:block" style={{ width: 1, height: 32, backgroundColor: 'var(--rule)' }} />
              <div className="sm:hidden" style={{ width: 32, height: 1, backgroundColor: 'var(--rule)' }} />
              
              <div className="text-center sm:text-right">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'color-mix(in srgb, var(--cyan-bright) 55%, transparent)', margin: '0 0 4px 0' }}>Result</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--cyan-bright)', letterSpacing: '-0.01em', margin: 0 }}>
                  {t.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
