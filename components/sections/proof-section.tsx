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
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !cardsWrapperRef.current) return

    // Create a pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%', // Scroll for 2 screen heights
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      },
    })

    // Cards start off-screen right
    gsap.set(cardRefs.current, { 
      x: '100vw',
      opacity: 0.2,
      scale: 0.9,
    })

    // Header fades out slightly as we scroll
    tl.to(headerRef.current, { opacity: 0.5, y: -20, duration: 1 }, 0)

    // Bring cards in one by one horizontally
    cardRefs.current.forEach((card, i) => {
      // Calculate position so they stack nicely
      const xOffset = i * 20; // Slight offset so they don't perfectly overlap until end? Or side-by-side depending on layout.
      
      // Let's make them slide in and stack
      // Move card to center
      tl.to(card, {
        x: xOffset,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      }, i * 0.8) // staggered start times
      
      // Push previous cards slightly back
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          tl.to(cardRefs.current[j], {
            scale: 1 - ((i - j) * 0.05),
            x: -((i - j) * 40),
            opacity: Math.max(0.4, 1 - ((i - j) * 0.3)),
            duration: 1.5,
            ease: 'power2.out',
          }, i * 0.8)
        }
      }
    })

    // Give a little pause at the end of the timeline
    tl.to({}, { duration: 0.5 })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative w-full h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: '#0B132B' }}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left: Sticky Header area within the pinned section */}
        <div ref={headerRef} className="w-full md:w-1/3 z-10">
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.40)', marginBottom: 16 }}>
            Proven Results
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E8F1F2', fontWeight: 400, margin: 0 }}>
            Real work.<br/>Real numbers.<br/>Real founders.
          </h2>
        </div>

        {/* Right: Card Stacking Area */}
        <div 
          ref={cardsWrapperRef} 
          className="w-full md:w-1/2 relative h-[500px]"
          style={{ perspective: 1000 }}
        >
          {CASE_STUDIES.map((study, index) => (
            <div
              key={study.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className="absolute top-0 right-0 w-full max-w-md"
              style={{
                backgroundColor: '#11203A',
                border: '1px solid rgba(232,241,242,0.08)',
                borderRadius: 20,
                padding: '32px',
                boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
                willChange: 'transform, opacity',
                transformOrigin: 'right center',
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#1A2E4A', borderRadius: 8, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24, opacity: 0.3, color: '#E8F1F2' }}>▶</span>
              </div>

              {/* Platform badge */}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#7FC8D1', marginBottom: 12 }}>
                {study.platform} · {study.niche}
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600, color: '#E8F1F2', margin: '0 0 24px 0', lineHeight: 1.3 }}>
                {study.resultHeadline}
              </h3>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(232,241,242,0.08)' }}>
                {[{ v: study.metric1, u: study.unit1 }, { v: study.metric2, u: study.unit2 }].map((m, i) => (
                  <div key={i}>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      background: 'linear-gradient(135deg, #E8F1F2 0%, #7FC8D1 60%, #5D727E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      margin: '0 0 4px 0',
                      lineHeight: 1,
                    }}>
                      {m.v}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(232,241,242,0.40)', margin: 0, letterSpacing: '0.04em' }}>{m.u}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(232,241,242,0.60)', lineHeight: 1.6, margin: '0 0 16px 0', fontStyle: 'italic' }}>
                "{study.quote}"
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(232,241,242,0.40)', margin: 0, letterSpacing: '0.02em' }}>
                — {study.founder}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
