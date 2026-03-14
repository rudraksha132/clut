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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        backgroundColor: 'var(--base)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>

        {/* Logo with Progressive Radial Blur Mask */}
        <div ref={logoRef} style={{ position: 'relative', width: 80, height: 80, marginBottom: -10 }}>
          <img
            src="/logo.jpg"
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
          <h2 className="gradient-text" style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 110px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            margin: 0,
          }}>
            20 minutes.
          </h2>
        </div>

        {/* Sub */}
        <div ref={subRef} style={{ maxWidth: 520 }}>
          <p className="text-body" style={{ color: 'var(--mist)', lineHeight: 1.65, margin: 0 }}>
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
        <div ref={trustRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', marginTop: 24 }}>
          {["No commitment.", "No pitch deck.", "No funnels."].map((text, i) => (
            <div key={i} style={{
              background: 'var(--surface-glass)',
              border: '1px solid var(--rule)',
              borderRadius: 8,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--mint)' }} />
              <span className="text-data" style={{ color: 'var(--mist)', margin: 0 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 50, paddingTop: 32, borderTop: '1px solid var(--rule)', width: '100%', maxWidth: 960 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.jpg" alt="" style={{ width: 16, height: 16, opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>clut.media</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span className="text-data" style={{ color: 'color-mix(in srgb, var(--mist) 60%, transparent)' }}>© 2025</span>
            <a href="mailto:hello@clut.media" className="text-data footer-link" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
              hello@clut.media
            </a>
            <a href="/" className="text-data footer-link" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
              main site ↗
            </a>
          </div>
          <style>{`
            .footer-link {
              color: var(--mist);
            }
            .footer-link:hover {
              color: var(--ink);
            }
          `}</style>
        </div>
      </footer>
    </section>
  )
}
