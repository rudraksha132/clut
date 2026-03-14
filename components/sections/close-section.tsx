'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

export function CloseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const elements = [logoRef.current, headlineRef.current, subRef.current, ctaRef.current, trustRef.current].filter(Boolean)

    gsap.from(elements, {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="close"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        backgroundColor: '#0B132B',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
        
        {/* Logo with Progressive Radial Blur Mask */}
        <div ref={logoRef} style={{ position: 'relative', width: 80, height: 80, marginBottom: -10 }}>
          <img 
            src="/logo.png" 
            alt="CLUT Media"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              /* This creates the progressive blur effect requested by user */
              maskImage: 'radial-gradient(circle, black 30%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, rgba(0,0,0,0) 70%)',
              opacity: 0.9
            }}
          />
        </div>

        {/* Headline */}
        <div ref={headlineRef}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 110px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#E8F1F2',
            fontWeight: 400,
            margin: 0,
          }}>
            20 minutes.
          </h2>
        </div>

        {/* Sub */}
        <div ref={subRef} style={{ maxWidth: 520 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(232,241,242,0.50)', lineHeight: 1.65, margin: 0 }}>
            One call. We'll tell you exactly what your content needs — and whether we're the right team to do it.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ paddingTop: 8 }}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            Book a Call
          </Button>
        </div>

        {/* Trust */}
        <div ref={trustRef}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(232,241,242,0.35)', margin: 0, letterSpacing: '0.01em' }}>
            No commitment. No pitch deck. No funnels.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 100, paddingTop: 32, borderTop: '1px solid rgba(232,241,242,0.06)', width: '100%', maxWidth: 960 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="" style={{ width: 16, height: 16, opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'rgba(232,241,242,0.8)' }}>clut.media</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(232,241,242,0.28)' }}>© 2025</span>
            <a href="mailto:hello@clut.media" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(232,241,242,0.42)', textDecoration: 'none' }}>
              hello@clut.media
            </a>
            <a href="/" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(232,241,242,0.42)', textDecoration: 'none' }}>
              main site ↗
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
