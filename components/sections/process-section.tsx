'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  number: string
  title: string
  note: string
}

const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Strategy call', note: '20 min. We decide if this is right.' },
  { number: '02', title: 'Script & shoot', note: 'We handle everything. You show up.' },
  { number: '03', title: 'Edit & refine', note: '2 rounds of changes, max.' },
  { number: '04', title: 'Publish & monitor', note: 'You keep all rights. We track results.' },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const proofLineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 68%',
        toggleActions: 'play none none none',
      },
    })

    stepRefs.current.forEach((step, index) => {
      if (!step) return
      const delay = index * 0.18
      tl.from(step, { opacity: 0, y: 24, duration: 0.55, ease: 'expo.out' }, delay)
      const line = lineRefs.current[index]
      if (line && index > 0) {
        tl.from(line, { scaleX: 0, opacity: 0, duration: 0.5, ease: 'expo.out', transformOrigin: 'left center' }, delay)
      }
    })

    if (proofLineRef.current) {
      tl.from(proofLineRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 1.0)
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ padding: '80px 24px', backgroundColor: '#162336' }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.30)', marginBottom: 16 }}>
            How We Work
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E8F1F2', fontWeight: 400, margin: 0 }}>
            From idea to impact in 72 hours.
          </h2>
        </div>

        {/* Desktop horizontal steps */}
        <div
          className="hidden md:flex"
          style={{ justifyContent: 'space-between', position: 'relative', marginBottom: 40 }}
        >
          {/* Background track */}
          <div style={{
            position: 'absolute',
            top: 14,
            left: '12.5%',
            right: '12.5%',
            height: 1,
            backgroundColor: 'rgba(232,241,242,0.07)',
          }} />

          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[index] = el }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              {/* Animated cyan connector */}
              {index > 0 && (
                <div
                  ref={(el) => { lineRefs.current[index] = el }}
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: '50%',
                    left: '-50%',
                    height: 1,
                    backgroundColor: '#7FC8D1',
                    transformOrigin: 'left center',
                  }}
                />
              )}

              {/* Step dot */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#1D2E42',
                border: '1px solid rgba(232,241,242,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(232,241,242,0.40)', letterSpacing: '0.04em' }}>{step.number}</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#E8F1F2', margin: '0 0 8px 0' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(232,241,242,0.40)', margin: 0, maxWidth: 180, lineHeight: 1.5 }}>
                {step.note}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { if (!stepRefs.current[index]) stepRefs.current[index] = el }}
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#1D2E42',
                border: '1px solid rgba(232,241,242,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(232,241,242,0.38)', letterSpacing: '0.04em' }}>{step.number}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#E8F1F2', margin: '4px 0 4px 0' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(232,241,242,0.40)', margin: 0, lineHeight: 1.5 }}>
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Proof line */}
        <p
          ref={proofLineRef}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(232,241,242,0.28)', textAlign: 'center', marginTop: 48, letterSpacing: '0.05em' }}
        >
          Average turnaround: 72 hours from shoot to post.
        </p>
      </div>
    </section>
  )
}
