'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ContentTicker } from '@/components/content-ticker'
import { Button } from '@/components/ui/button'
import { prefersReducedMotion } from '@/lib/design-system'

export function HookSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logoMarkRef = useRef<HTMLImageElement>(null)
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
      ;[logoMarkRef, eyebrowRef, statRef, contextRef, dataLineRef, ctasRef, tickerRef].forEach((r) => {
        if (r.current) (r.current as HTMLElement).style.opacity = '1'
      })
      return
    }

    const tl = gsap.timeline()

    if (logoMarkRef.current) {
      gsap.set(logoMarkRef.current, { opacity: 0, scale: 0.8, y: 10 })
      tl.to(logoMarkRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }, 0.1)
    }

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 6 })
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.25)
    }

    if (statRef.current) {
      gsap.set(statRef.current, { opacity: 0, y: 30, scale: 0.95 })
      tl.to(statRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out' }, 0.35)
    }

    if (contextRef.current) {
      gsap.set(contextRef.current, { opacity: 0, y: 14, x: -10 })
      tl.to(contextRef.current, { opacity: 1, y: 0, x: 0, duration: 0.65, ease: 'power3.out' }, 0.6)
    }

    if (dataLineRef.current) {
      gsap.set(dataLineRef.current, { opacity: 0 })
      tl.to(dataLineRef.current, { opacity: 1, duration: 0.4, ease: 'sine.out' }, 0.78)
    }

    if (ctasRef.current) {
      gsap.set(ctasRef.current, { opacity: 0, y: 12 })
      tl.to(ctasRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' }, 0.88)
    }

    if (tickerRef.current) {
      gsap.set(tickerRef.current, { opacity: 0, y: 40 })
      tl.to(tickerRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 1.0)
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
        backgroundImage: 'url(/assets/hero/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'var(--hero-overlay)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 1152, zIndex: 1, position: 'relative' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start w-full">

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Logo Mark + Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img 
                ref={logoMarkRef}
                src="/logo.jpg" 
                alt="CLUT Media" 
                style={{ width: 24, height: 24, objectFit: 'contain' }}
              />
              <div ref={eyebrowRef}>
                <span className="text-eyebrow">
                  CLUT Media · Results
                </span>
              </div>
            </div>

            {/* Hero Stat */}
            <h1
              ref={statRef}
              className="text-hero-stat gradient-text"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                margin: 0,
              }}
            >
              3.2M
            </h1>

            {/* Context */}
            <p
              ref={contextRef}
              className="text-hero-label text-ink"
              style={{
                margin: 0,
                maxWidth: 480,
                color: 'var(--ink)'
              }}
            >
              views in 90 days for a founder with 800 followers.
            </p>

            {/* Glassmorphism Stat Chips */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              {[
                { label: '90 DAYS', value: '3.2M' },
                { label: '14K FOLLOWERS', value: '+13.2K' }
              ].map((chip, i) => (
                <div key={i} style={{
                  background: 'var(--surface-glass)',
                  border: '1px solid var(--rule)',
                  borderRadius: 8,
                  padding: '8px 20px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mist)' }}>
                    {chip.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' }}>
                    {chip.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Data line */}
            <p
              ref={dataLineRef}
              className="text-data text-cyan"
              style={{ margin: 0 }}
            >
              Filmed in 1 day. Edited in 4 rounds. Posted. Done.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
              <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: 'var(--ember)', color: 'white', fontWeight: 700 }}
                onClick={() => document.getElementById('close')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                style={{ borderColor: 'rgba(208,128,48,0.45)', color: 'var(--ink)' }}
                onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the work
              </Button>
            </div>
          </div>

          {/* Right Column — Ticker (desktop) */}
          <div
            ref={tickerRef}
            style={{ height: 560 }}
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
