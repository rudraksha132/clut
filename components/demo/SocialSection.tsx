'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: "The speed and quality of output were mind-blowing. They took our concept from idea to published asset in under a week.",
    name: "Alex Rivera",
    role: "Founder, Peak SaaS",
    result: "3.2M views"
  },
  {
    quote: "Finally, content that actually feels like us. No agency-speak, just raw data and clean edits that convert.",
    name: "Sarah Chen",
    role: "Marketing Lead, Flow",
    result: "847K reach"
  },
  {
    quote: "They don't just edit videos. They understand the mechanics of the algorithm better than anyone we've worked with.",
    name: "James Wilson",
    role: "CEO, Pillar Health",
    result: "124K followers"
  }
]

export function SocialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.9, 
          ease: 'expo.out', 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="social" className="py-32 px-6 bg-base">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-4 mb-24 items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/38">Section IV</span>
          <h2 className="font-serif italic text-hero-label text-ink">Social Proof</h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i}
              className="flex flex-col bg-surface border border-ink/8 rounded-2xl p-10 hover:border-ink/15 transition-colors"
            >
              <p className="font-serif italic text-[22px] leading-[1.45] tracking-[-0.02em] text-ink mb-10">
                {t.quote}
              </p>
              
              <div className="mt-auto flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-bold text-ink leading-none">{t.name}</span>
                  <span className="text-[12px] text-mist leading-none">{t.role}</span>
                </div>
                
                <div className="inline-flex items-center self-start px-3 py-1 bg-cyan/10 border border-cyan/25 rounded-full">
                  <span className="text-[11px] font-semibold text-[#00748A] whitespace-nowrap">{t.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
