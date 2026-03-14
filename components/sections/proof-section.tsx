'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

interface CaseStudyCard {
  id: string
  platform: string
  niche: string
  resultHeadline: string
  metric1: string
  unit1: string
  metric2: string
  unit2: string
  quote: string
  founder: string
}

const CASE_STUDIES: CaseStudyCard[] = [
  {
    id: '1',
    platform: 'Instagram',
    niche: 'B2B Founder',
    resultHeadline: 'From 800 to 14K followers',
    metric1: '3.2M',
    unit1: 'views',
    metric2: '90',
    unit2: 'days',
    quote: 'They took one call, wrote the script, showed up, filmed. I never touched a caption.',
    founder: 'Arjun Mehta · Founder, GrowthOS',
  },
  {
    id: '2',
    platform: 'LinkedIn',
    niche: 'SaaS',
    resultHeadline: '480K impressions in first month',
    metric1: '480K',
    unit1: 'impressions',
    metric2: '+340%',
    unit2: 'inbound',
    quote: 'From concept to published in 5 days. That would normally take 6 weeks with our old team.',
    founder: 'Marcus Rodriguez · CMO, CloudFlow',
  },
  {
    id: '3',
    platform: 'YouTube',
    niche: 'Consulting',
    resultHeadline: '14 edits. 3 videos. 1.2M views.',
    metric1: '1.2M',
    unit1: 'views',
    metric2: '6.2%',
    unit2: 'CTR',
    quote: 'Consistent, high-quality output without the creative bottleneck. Game-changing for solo operators.',
    founder: 'Alexandra Patel · Founder, DataVault',
  },
]

export function ProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
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
      id="proof"
      style={{ padding: '80px 24px', backgroundColor: '#0F1C2D' }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.30)', marginBottom: 16 }}>
            Proven Results
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E8F1F2', fontWeight: 400, margin: 0 }}>
            Real work. Real numbers. Real founders.
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {CASE_STUDIES.map((study, index) => (
            <div
              key={study.id}
              ref={(el) => { cardRefs.current[index] = el }}
              style={{
                backgroundColor: '#162336',
                border: '1px solid rgba(232,241,242,0.06)',
                borderRadius: 16,
                padding: 28,
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-6px)'
                el.style.borderColor = 'rgba(232,241,242,0.12)'
                el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'rgba(232,241,242,0.06)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: 'rgba(232,241,242,0.04)', borderRadius: 8, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 28, opacity: 0.2, color: '#E8F1F2' }}>▶</span>
              </div>

              {/* Platform badge */}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#7FC8D1', marginBottom: 8 }}>
                {study.platform} · {study.niche}
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: '#E8F1F2', margin: '0 0 20px 0', lineHeight: 1.3 }}>
                {study.resultHeadline}
              </h3>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(232,241,242,0.06)' }}>
                {[{ v: study.metric1, u: study.unit1 }, { v: study.metric2, u: study.unit2 }].map((m, i) => (
                  <div key={i}>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(28px, 4vw, 40px)',
                      background: 'linear-gradient(135deg, #E8F1F2 0%, #7FC8D1 60%, #5D727E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      margin: '0 0 4px 0',
                      lineHeight: 1,
                    }}>
                      {m.v}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(232,241,242,0.30)', margin: 0, letterSpacing: '0.04em' }}>{m.u}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(232,241,242,0.45)', lineHeight: 1.6, margin: '0 0 14px 0', fontStyle: 'italic' }}>
                "{study.quote}"
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(232,241,242,0.28)', margin: 0, letterSpacing: '0.02em' }}>
                — {study.founder}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
