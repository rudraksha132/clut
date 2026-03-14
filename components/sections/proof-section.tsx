'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'

gsap.registerPlugin(ScrollTrigger)

import Image from 'next/image'

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
  image: string
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
    image: '/assets/cases/case-founder.jpg'
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
    image: '/assets/cases/case-doordash.jpg'
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
    image: '/assets/cases/case-agency.jpg'
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
      style={{
        backgroundImage: 'linear-gradient(color-mix(in srgb, var(--base) 90%, transparent), color-mix(in srgb, var(--base) 90%, transparent)), url(/assets/hero/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left: Sticky Header area within the pinned section */}
        <div ref={headerRef} className="w-full md:w-1/3 z-10">
          <div className="text-eyebrow" style={{ marginBottom: 16 }}>
            Proven Results
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', fontWeight: 400, fontStyle: 'italic', margin: 0 }}>
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
                backgroundColor: 'var(--surface)',
                borderRadius: 20,
                padding: '32px',
                boxShadow: 'inset 0 0 0 1px rgba(234,240,242,0.07), 0 24px 48px -12px rgba(0,0,0,0.5)',
                willChange: 'transform, opacity',
                transformOrigin: 'right center',
              }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                width: '100%',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 24
              }}>
                <Image
                  src={study.image}
                  alt={`${study.platform} case study`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 25%, rgba(7,14,27,0.88) 100%)',
                  zIndex: 1
                }}/>
              </div>

              {/* Platform badge */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="text-eyebrow" style={{ color: 'var(--ember)', marginBottom: 12 }}>
                  {study.platform} · {study.niche}
                </div>
                <h3 className="text-headline" style={{ color: 'var(--ink)', margin: '0 0 24px 0', fontSize: 'clamp(20px, 2.5vw, 24px)' }}>
                  {study.resultHeadline}
                </h3>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
                  {[{ v: study.metric1, u: study.unit1 }, { v: study.metric2, u: study.unit2 }].map((m, i) => (
                    <div key={i}>
                      <p className="gradient-text" style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(40px, 5vw, 60px)',
                        margin: '0 0 4px 0',
                        lineHeight: 1,
                      }}>
                        {m.v}
                      </p>
                      <p className="text-data text-cyan" style={{ margin: 0, opacity: 0.7 }}>{m.u}</p>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-body" style={{ color: 'var(--mist)', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                  "{study.quote}"
                </p>
                <p className="text-data text-cyan" style={{ margin: 0, opacity: 0.55 }}>
                  — {study.founder}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
