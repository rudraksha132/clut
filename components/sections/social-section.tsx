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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.1,
      })
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social"
      style={{ padding: '80px 24px', backgroundColor: '#0F1C2D' }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.30)', marginBottom: 16 }}>
            Testimonials
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E8F1F2', fontWeight: 400, margin: 0 }}>
            Words from folks we've worked with.
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => { cardRefs.current[index] = el }}
              style={{
                backgroundColor: '#162336',
                border: '1px solid rgba(232,241,242,0.06)',
                borderRadius: 16,
                padding: '28px 32px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(232,241,242,0.12)'
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(232,241,242,0.06)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Quote */}
              <blockquote style={{ margin: '0 0 24px 0' }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(17px, 2.2vw, 22px)',
                  lineHeight: 1.45,
                  letterSpacing: '-0.02em',
                  color: '#E8F1F2',
                  margin: 0,
                  opacity: 0.88,
                }}>
                  {t.quote}
                </p>
              </blockquote>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: '#E8F1F2', margin: '0 0 2px 0' }}>{t.name}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(232,241,242,0.35)', margin: 0 }}>{t.role}</p>
                </div>
                {/* Result pill */}
                <div style={{
                  backgroundColor: 'rgba(127,200,209,0.10)',
                  border: '1px solid rgba(127,200,209,0.22)',
                  borderRadius: 100,
                  padding: '5px 14px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, color: '#7FC8D1' }}>{t.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
