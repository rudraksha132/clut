'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/design-system'
import { LogoTicker } from '@/components/sections/logo-ticker'
import { WordSplit } from '@/components/ui/word-split'

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
  const testimonialsWrapperRef = useRef<HTMLDivElement>(null)
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = prefersReducedMotion()

    if (reduced) {
      // Show everything statically if user prefers no motion
      gsap.set(quoteRefs.current, { opacity: 1, scale: 1, position: 'relative', top: 'auto', left: 'auto', transform: 'none', margin: '0 0 60px 0' })
      const allWords = sectionRef.current.querySelectorAll('[data-word]')
      gsap.set(allWords, { opacity: 1, y: 0 })
      return
    }

    // Pin timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${TESTIMONIALS.length * 100}%`, // Scroll distance based on items
        pin: true,
        scrub: 1,
      },
    })

    // Setup: stack all quotes on top of each other, hide all but first
    // Note: quotes are absolute centered in a relative wrapper
    gsap.set(quoteRefs.current, { opacity: 0, scale: 0.95 })

    // Animate them fading in and out on scroll
    quoteRefs.current.forEach((quote, index) => {
      if (!quote) return

      const attribution = quote.querySelector('[data-attribution]')

      // 1. Fade/Scale in the container
      tl.to(quote, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })

      // 2. Reveal attribution
      if (attribution) {
        tl.to(attribution, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '<+0.2')
      }

      // Hold it there
      tl.to({}, { duration: 1 })

      // Fade out
      if (index < TESTIMONIALS.length - 1) {
        tl.to(quote, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
        })
      }
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center"
      style={{
        backgroundColor: 'var(--base)',
        paddingTop: 0, // Header ticker starts at top
      }}
    >
      {/* Top Logo Ticker */}
      <div className="w-full" style={{ borderBottom: '1px solid var(--rule)' }}>
        <LogoTicker />
      </div>

      {/* Content Area - Vertically Centered */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl px-6">

        {/* Label and Eyebrow */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_8px_var(--mint-glow)]" />
            <span className="text-eyebrow text-steel">Social Proof</span>
          </div>
          <div className="text-eyebrow" style={{ color: 'var(--mist)', opacity: 0.4 }}>
            Case Success
          </div>
        </div>

        {/* Quote Container Area */}
        <div
          ref={testimonialsWrapperRef}
          className="relative w-full max-w-5xl"
          style={{ height: 400 }}
        >
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => { quoteRefs.current[index] = el }}
              className="w-full text-center"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}
            >
              <div className="w-full max-w-4xl mx-auto px-6">
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 3.2vw, 36px)', // Smaller size as requested
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                  margin: '0 0 48px 0',
                }}>
                  "{t.quote}"
                </h3>

                {/* Attribution - simplified hidden by default for reveal */}
                <div data-attribution className="opacity-0 translate-y-4 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-8 py-4 rounded-2xl sm:rounded-[100px]" style={{ background: 'var(--surface-glass)', border: '1px solid var(--rule)', backdropFilter: 'blur(14px)', display: 'inline-flex' }}>
                  <div className="text-center sm:text-left">
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: '0 0 2px 0' }}>{t.name}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mist)', margin: 0 }}>{t.role}</p>
                  </div>

                  <div className="hidden sm:block" style={{ width: 1, height: 28, backgroundColor: 'var(--rule)' }} />

                  <div className="text-center sm:text-right">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0, 255, 255, 0.5)', margin: '0 0 2px 0' }}>Result</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--cyan-bright)', margin: 0 }}>
                      {t.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
