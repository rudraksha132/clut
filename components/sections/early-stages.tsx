'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WordSplit } from '@/components/ui/word-split'

gsap.registerPlugin(ScrollTrigger)

export function EarlyStages() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const words = sectionRef.current.querySelectorAll('[data-word]')
    
    if (words.length > 0) {
      // Pinning/Highlight animation: Word by word illumination
      gsap.to(words, {
        opacity: 1,
        color: 'var(--ink)',
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 py-24"
    >
      <div className="w-full max-w-4xl text-center">
        <span className="font-mono text-eyebrow text-ember uppercase tracking-widest mb-6 block">
          Current Phase: Alpha
        </span>
        <div ref={textContainerRef} className="font-editorial text-headline leading-tight lowercase" style={{ opacity: 1 }}>
          <WordSplit 
            text="We are currently in the early stages of our journey, meticulously sculpting a platform that merges human intuition with algorithmic precision. The potential is vast, and we are just getting started." 
          />
        </div>
      </div>
    </section>
  )
}
