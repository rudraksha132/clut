'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { prefersReducedMotion } from '@/lib/design-system'

export function HookSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = prefersReducedMotion()
    if (reduced) {
      if (headlineRef.current) headlineRef.current.style.opacity = '1'
      if (subRef.current) subRef.current.style.opacity = '1'
      if (ctasRef.current) ctasRef.current.style.opacity = '1'
      return
    }

    const tl = gsap.timeline()

    // Simplistic, elegant fade up
    const elements = [headlineRef.current, subRef.current, ctasRef.current].filter(Boolean)
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.2, delay: 0.2 }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        height: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        backgroundImage: `url(/hero.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: '2% center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900, zIndex: 1, position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div ref={headlineRef} style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(56px, 10vw, 120px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
            fontWeight: 300,
            fontStyle: 'italic',
            margin: 0
          }}>
            Clut Media
          </h1>
        </div>

        <div ref={subRef} style={{ maxWidth: 640, marginBottom: 56 }}>
          <p className="text-hero-label" style={{ color: 'var(--mist)', lineHeight: 1.5, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400 }}>
            The high-performance video engine for founders and agencies who demand cinematic quality at scale.
          </p>
        </div>

        <div ref={ctasRef}>
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            Book a Call →
          </Button>
        </div>

      </div>
    </section>
  )
}
