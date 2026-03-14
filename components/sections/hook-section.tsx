'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ContentTicker } from '@/components/content-ticker'
import { Button } from '@/components/ui/button'
import { prefersReducedMotion } from '@/lib/design-system'

export function HookSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const statRef = useRef<HTMLHeadingElement>(null)
  const contextRef = useRef<HTMLParagraphElement>(null)
  const dataLineRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = prefersReducedMotion()

    if (reduced) {
      ;[eyebrowRef, statRef, contextRef, dataLineRef, ctasRef, tickerRef].forEach((r) => {
        if (r.current) (r.current as HTMLElement).style.opacity = '1'
      })
      return
    }

    const tl = gsap.timeline()

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 6 })
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.18)
    }

    // Hero stat: animate with opacity + y, NO SplitText to preserve background-clip gradient
    if (statRef.current) {
      gsap.set(statRef.current, { opacity: 0, y: 30, scale: 0.95 })
      tl.to(statRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.28)
    }

    if (contextRef.current) {
      gsap.set(contextRef.current, { opacity: 0, y: 10 })
      tl.to(contextRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6)
    }

    if (dataLineRef.current) {
      gsap.set(dataLineRef.current, { opacity: 0 })
      tl.to(dataLineRef.current, { opacity: 1, duration: 0.35, ease: 'sine.out' }, 0.78)
    }

    if (ctasRef.current) {
      gsap.set(ctasRef.current, { opacity: 0, y: 12 })
      tl.to(ctasRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.7)' }, 0.88)
    }

    if (tickerRef.current) {
      gsap.set(tickerRef.current, { opacity: 0, y: 40 })
      tl.to(tickerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 1.0)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        backgroundColor: '#0F1C2D',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1152 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start w-full">

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Eyebrow */}
            <div ref={eyebrowRef}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(232,241,242,0.38)' }}>
                CLUT Media · Results
              </span>
            </div>

            {/* Hero Stat — NO SplitText, use whole-element animation to preserve gradient */}
            <h1
              ref={statRef}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(80px, 13vw, 168px)',
                lineHeight: 0.84,
                letterSpacing: '-0.06em',
                fontWeight: 400,
                margin: 0,
                /* gradient text */
                background: 'linear-gradient(135deg, #E8F1F2 0%, #7FC8D1 55%, #5D727E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              3.2M
            </h1>

            {/* Context */}
            <p
              ref={contextRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 2vw, 22px)',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                color: 'rgba(232,241,242,0.70)',
                margin: 0,
                maxWidth: 480,
              }}
            >
              views in 90 days for a founder with 800 followers.
            </p>

            {/* Data line */}
            <p
              ref={dataLineRef}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'rgba(232,241,242,0.35)',
                letterSpacing: '0.06em',
                margin: 0,
              }}
            >
              Filmed in 1 day. Edited in 4 rounds. Posted. Done.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('close')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the work
              </Button>
            </div>
          </div>

          {/* Right Column — Ticker (desktop) */}
          <div
            ref={tickerRef}
            style={{ height: 500 }}
            className="hidden lg:block"
          >
            <ContentTicker />
          </div>

        </div>

        {/* Mobile Ticker */}
        <div className="lg:hidden" style={{ marginTop: 48, height: 300 }}>
          <ContentTicker />
        </div>
      </div>
    </section>
  )
}
