'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const CASE_STUDIES = [
  {
    id: '1',
    platform: 'Instagram',
    niche: 'B2B Founder',
    headline: 'From 800 to 14K followers',
    metrics: [
      { value: '14.2', unit: 'K', label: 'Followers' },
      { value: '3.2', unit: 'M', label: 'Views' },
    ],
    quote: '"CLUT transformed my profile from a ghost town to a lead magnet."',
    thumbnail: '/case-01.jpg' // Placeholder
  },
  {
    id: '2',
    platform: 'LinkedIn',
    niche: 'SaaS CEO',
    headline: 'Dominated the algorithm',
    metrics: [
      { value: '847', unit: 'K', label: 'Impressions' },
      { value: '12', unit: '%', label: 'Conv. Rate' },
    ],
    quote: '"Finally, content that actually drives pipeline."',
    thumbnail: '/case-02.jpg'
  },
  {
    id: '3',
    platform: 'YouTube',
    niche: 'Creative Agency',
    headline: 'Viral launch sequence',
    metrics: [
      { value: '1.2', unit: 'M', label: 'Reach' },
      { value: '72', unit: 'hr', label: 'Speed' },
    ],
    quote: '"Unmatched speed without sacrificing cinematic quality."',
    thumbnail: '/case-03.jpg'
  }
]

export function ProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.9, 
          ease: 'expo.out', 
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proof" className="py-32 px-6 bg-base">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-4 mb-16 items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/38">Section II</span>
          <h2 className="font-serif italic text-hero-label text-ink">Proof (Case Studies)</h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id}
              className="group relative flex flex-col bg-surface border border-ink/8 rounded-2xl p-7 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-ink/18"
              data-cursor="media"
            >
              {/* Video Thumbnail Placeholder */}
              <div className="aspect-video w-full bg-ink/5 rounded-lg mb-8 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-base/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-ink border-b-[6px] border-b-transparent translate-x-0.5" />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <span className="text-[10px] uppercase font-medium tracking-widest text-mist">
                  {study.platform} · {study.niche}
                </span>
                <h3 className="text-xl font-semibold text-ink">{study.headline}</h3>
              </div>

              {/* Bento-style Metric Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-serif italic text-4xl gradient-text">{metric.value}</span>
                      <span className="text-sm font-medium text-ink/50 uppercase">{metric.unit}</span>
                    </div>
                    <span className="text-[11px] font-mono text-mist uppercase tracking-wider">{metric.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-mist leading-relaxed italic">
                {study.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
