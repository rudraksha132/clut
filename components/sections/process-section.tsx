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
  const containerRef = useRef<HTMLDivElement>(null)
  const stepContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const stepDotRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    // Pin timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: '+=150%', // Scroll distance
        pin: true,
        scrub: 1, // Smooth scrubbing
      },
    })

    // Setup initial states
    gsap.set(stepContainerRefs.current, { opacity: 0.3, y: 20 })
    gsap.set(lineRefs.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(stepDotRefs.current, { backgroundColor: '#1A2E4A', borderColor: 'rgba(232,241,242,0.12)' })

    // Animate each step sequentially
    PROCESS_STEPS.forEach((_, index) => {
      // 1. Light up current step
      tl.to(stepContainerRefs.current[index], {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, index * 1.5)

      // 2. Light up the dot
      tl.to(stepDotRefs.current[index], {
        backgroundColor: 'var(--ember)',
        borderColor: 'var(--ember)',
        boxShadow: '0 0 0 8px var(--amber-glow)',
        scale: 1.25,
        duration: 0.15,
        ease: 'power2.out',
      }, index * 1.5).to(stepDotRefs.current[index], {
        scale: 1.0,
        duration: 0.38,
        ease: 'elastic.out(1, 0.5)',
      }, (index * 1.5) + 0.15)

      // 3. Draw connecting line to next step (if not last step)
      if (index < PROCESS_STEPS.length - 1) {
        tl.to(lineRefs.current[index + 1], {
          scaleX: 1,
          duration: 1,
          ease: 'power1.inOut',
        }, (index * 1.5) + 0.3)
      }
    })

    // Small pause at the end
    tl.to({}, { duration: 0.5 })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: 'linear-gradient(color-mix(in srgb, var(--surface) 92%, transparent), color-mix(in srgb, var(--surface) 92%, transparent)), url(/assets/hero/process-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div ref={containerRef} style={{ maxWidth: 1152, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 80, textAlign: 'center' }}>
          <div className="text-eyebrow" style={{ color: 'var(--ember)', opacity: 0.65, marginBottom: 16 }}>
            How We Work
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', fontWeight: 400, fontStyle: 'italic', margin: 0 }}>
            From idea to impact in 72 hours.
          </h2>
        </div>

        {/* Track */}
        <div className="flex flex-col md:flex-row justify-between relative w-full gap-12 md:gap-0">
          
          {/* Faint Background Track (desktop) */}
          <div className="hidden md:block" style={{
            position: 'absolute',
            top: 20, // Center of the 40px dot
            left: '12.5%',
            right: '12.5%',
            height: 2,
            backgroundColor: 'rgba(232,241,242,0.05)',
            zIndex: 0,
          }} />

          {/* Faint Vertical Track for mobile */}
          <div className="md:hidden" style={{
            position: 'absolute',
            left: 20, // Center of the 40px dot
            top: '0',
            bottom: '0',
            width: 2,
            backgroundColor: 'rgba(232,241,242,0.05)',
            zIndex: 0,
          }} />

          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepContainerRefs.current[index] = el }}
              className="flex-1 flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative z-10"
              style={{ flex: 1 }}
            >
              {/* Animated connecting line drawing from previous step */}
              {index > 0 && (
                <div
                  ref={(el) => { lineRefs.current[index] = el }}
                  className="hidden md:block"
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: '50%', // Centers between the two step columns
                    left: '-50%',
                    height: 2,
                    backgroundColor: 'var(--ember)',
                    zIndex: -1,
                  }}
                />
              )}

              {/* Step indicator dot */}
              <div 
                ref={(el) => { stepDotRefs.current[index] = el }}
                className="flex-shrink-0 mr-6 md:mr-0 md:mb-6"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid var(--rule)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'color-mix(in srgb, var(--ember) 55%, transparent)', letterSpacing: '0.04em', fontWeight: 600 }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: '#E8F1F2', margin: '0 0 12px 0' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(232,241,242,0.50)', margin: 0, maxWidth: 220, lineHeight: 1.5 }}>
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
