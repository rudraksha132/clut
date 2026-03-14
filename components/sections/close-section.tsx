'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

export function CloseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const elements = [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, trustRef.current].filter(Boolean)

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
        backgroundColor: '#0F1C2D',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}>
        {/* Eyebrow */}
        <div ref={eyebrowRef}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.35)' }}>
            Next Step
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 96px)',
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
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(232,241,242,0.28)', margin: 0 }}>
            No commitment. No pitch deck. No funnels.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid rgba(232,241,242,0.06)', width: '100%', maxWidth: 960 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 6 9 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 9 12 2 12 2Z" fill="#7FC8D1" opacity="0.9"/>
              <path d="M12 8C12 8 9 12 9 15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15C15 12 12 8 12 8Z" fill="#0F1C2D" opacity="0.6"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: '#E8F1F2' }}>clut.media</span>
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
