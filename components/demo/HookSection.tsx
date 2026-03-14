'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DemoTicker } from './DemoTicker'
import { MagneticButton } from './MagneticButton'
import { cn } from '@/lib/utils'

export function HookSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroStatRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to(containerRef.current, { opacity: 1, duration: 0.4, ease: 'sine.out' })
        .fromTo(heroStatRef.current, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(2.2)' },
          0.28
        )
        .fromTo(contextRef.current,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 0.75, duration: 0.45, ease: 'power2.out' },
          0.55
        )
        .fromTo(dataRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'sine.out' },
          0.68
        )
        .fromTo(ctasRef.current?.children || [],
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.38, ease: 'back.out(1.7)', stagger: 0.1 },
          0.75
        )
        .fromTo(tickerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'sine.out' },
          0.9
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="hook" className="min-h-screen pt-40 pb-20 px-6 opacity-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Half: Hero Content */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/38">Case Study #01</span>
            
            <div ref={heroStatRef} className="hero-stat-container">
              <h1 className="font-serif italic text-hero-stat gradient-text leading-[0.84] tracking-[-0.06em]">
                3.2M
              </h1>
            </div>
            
            <div ref={contextRef} className="w-full max-w-md">
              <p className="font-sans text-hero-label text-ink leading-[1.3] tracking-[-0.02em]">
                views in 90 days for a founder with 800 followers.
              </p>
            </div>

            <div ref={dataRef} className="mt-2">
              <p className="font-mono text-[13px] text-mist tracking-[0.04em]">
                Filmed in 1 day. Edited in 4 rounds. Posted. Done.
              </p>
            </div>
          </div>

          <div ref={ctasRef} className="flex flex-wrap gap-4 mt-8">
            <MagneticButton onClick={() => document.getElementById('close')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a 20-min call →
            </MagneticButton>
            <MagneticButton 
              variant="secondary" 
              onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the work ↓
            </MagneticButton>
          </div>
        </div>

        {/* Right Half: Live Content Ticker */}
        <div ref={tickerRef} className="hidden lg:flex justify-end h-[60vh]">
          <DemoTicker />
        </div>
      </div>
    </section>
  )
}
