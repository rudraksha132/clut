'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'
import { WordSplit } from '@/components/ui/word-split'

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
  const quoteRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !cardsWrapperRef.current) return
    const reduced = prefersReducedMotion()
    
    if (reduced) {
      // Show everything statically if user prefers no motion
      gsap.set(cardRefs.current, { x: 0, opacity: 1, scale: 1, position: 'relative', margin: '0 0 40px 0' })
      const allWords = sectionRef.current.querySelectorAll('[data-word]')
      gsap.set(allWords, { opacity: 1, y: 0 })
      return
    }

    // Targeted ref cleanup to avoid stale entries
    cardRefs.current = cardRefs.current.filter(Boolean)
    quoteRefs.current = quoteRefs.current.filter(Boolean)

    // Fixed: Initial state for quote words set BEFORE timeline
    const allWords = sectionRef.current.querySelectorAll('[data-word]')
    gsap.set(allWords, { opacity: 0, y: 16 })

    // Create a pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%', // Scroll for 2 screen heights
        pin: true,
        scrub: 1, // Smooth scrubbing
      },
    })

    // Cards start off-screen right
    gsap.set(cardRefs.current, { 
      x: '100vw',
      opacity: 0.2, // reveal slightly
      scale: 0.9,
      visibility: 'visible', // reveal now that GSAP is in control
    })

    // Header fades out slightly as we scroll
    tl.to(headerRef.current, { opacity: 0.5, y: -20, duration: 1 }, 0)

    // Bring cards in one by one horizontally
    cardRefs.current.forEach((card, i) => {
      // Stack from right to left with significant separation
      const activeX = i * -80; // Base position when active
      const activeY = i * 20;
      const rotationY = i * -8;
      
      tl.to(card, {
        x: activeX,
        y: activeY,
        rotationY: rotationY,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
      }, i * 0.8)
      
      // Word stagger reveal plays correctly now that initial state is set
      const words = quoteRefs.current[i]?.querySelectorAll('[data-word]')
      if (words && words.length > 0) {
        tl.to(words, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power2.out',
        }, (i * 0.8) + 0.6)
      }
      
      // Push previous cards slightly back and more to the left
      // Fixed: Formula ensures deterministic positions and prevents flying off-screen
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          tl.to(cardRefs.current[j], {
            x: (j * -80) - ((i - j) * 120),
            y: (j * 20) - ((i - j) * 10),
            scale: Math.max(0.82, 0.95 - ((i - j) * 0.03)),
            opacity: Math.max(0.15, 0.8 - ((i - j) * 0.25)),
            duration: 1.5,
            ease: 'power2.out',
          }, i * 0.8)
        }
      }
    })

    // Give a little pause at the end of the timeline
    tl.to({}, { duration: 0.5 })

    return () => { 
      // Fixed: Targeted cleanup
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative w-full h-screen overflow-hidden flex items-center"
      style={{
        backgroundColor: 'var(--base)',
      }}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-24"
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
          style={{ position: 'relative', width: 480, minWidth: 480, height: 620, perspective: 1200 }}
        >
          {CASE_STUDIES.map((study, index) => (
            <div
              key={study.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className="absolute top-0 right-0"
              style={{
                width: 440,
                opacity: 0, // Prevent hydration flash
                visibility: 'hidden', // Preventive against flash
                backgroundColor: 'rgba(11, 19, 43, 0.85)', // var(--base) with slight transparency
                backdropFilter: 'blur(12px)',
                borderRadius: 24,
                padding: '24px', // Tighter padding for larger image focus
                border: '1px solid var(--rule)',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)', 
                willChange: 'transform, opacity',
                transformOrigin: 'right center',
              }}
            >
              {/* Fixed Image Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 280, // Increased height for more prominence
                borderRadius: 12, // Softer inner radius
                overflow: 'hidden',
                marginBottom: 24 // Balanced spacing
              }}>
                <Image
                  src={study.image}
                  alt={`${study.platform} case study`}
                  fill
                  sizes="440px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority={index === 0} // Priority loading for visible pinned elements
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 25%, var(--base) 100%)',
                  zIndex: 1
                }}/>
              </div>

              {/* Platform badge */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="text-eyebrow text-steel" style={{ marginBottom: 12 }}>
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

                {/* Quote with WordSplit */}
                <div 
                  ref={(el) => { quoteRefs.current[index] = el }}
                  className="text-body" 
                  style={{ color: 'var(--mist)', margin: '0 0 16px 0', fontStyle: 'italic', display: 'block' }}
                >
                  "<WordSplit text={study.quote} />"
                </div>
                <p className="text-data text-steel" style={{ margin: 0, opacity: 0.55 }}>
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
