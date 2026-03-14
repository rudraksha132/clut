'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'

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
    gsap.set(quoteRefs.current, { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', opacity: 0, y: 40 })
    
    // Animate them fading in and out on scroll
    quoteRefs.current.forEach((quote, index) => {
      if (!quote) return
      
      // Fade in and slide up
      tl.to(quote, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      
      // Hold it there
      tl.to({}, { duration: 1 })
      
      // Fade out and slide up (unless it's the last one)
      if (index < TESTIMONIALS.length - 1) {
        tl.to(quote, {
          opacity: 0,
          y: -40,
          duration: 1,
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
      style={{ backgroundColor: '#0B132B' }}
    >
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.30)' }}>
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
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#E8F1F2',
              margin: '0 0 48px 0',
            }}>
              "{t.quote}"
            </h3>

            {/* Attribution */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '12px 24px', backgroundColor: '#11203A', borderRadius: 100, border: '1px solid rgba(232,241,242,0.06)' }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#E8F1F2', margin: '0 0 2px 0' }}>{t.name}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(232,241,242,0.40)', margin: 0 }}>{t.role}</p>
              </div>
              
              <div style={{ width: 1, height: 32, backgroundColor: 'rgba(232,241,242,0.08)' }} />
              
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(127,200,209,0.5)', margin: '0 0 4px 0' }}>Result</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: '#7FC8D1', letterSpacing: '-0.01em', margin: 0 }}>
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
