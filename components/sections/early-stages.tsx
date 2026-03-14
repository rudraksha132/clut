'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function EarlyStages() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    let split: SplitText | null = null

    const initSplitText = () => {
      split = new SplitText(textRef.current, {
        type: 'lines, words',
        linesClass: 'overflow-hidden line-wrapper',
      })

      // Animation: Blur to Unblur on scroll
      gsap.fromTo(
        split.words,
        {
          filter: 'blur(20px)',
          opacity: 0,
          y: 30,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          stagger: {
            amount: 1.5,
            from: 'start',
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
            markers: false,
          }
        }
      )
    }

    // Wait for fonts to be ready to ensure correct measurements for SplitText
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initSplitText()
      })
    } else {
      // Fallback
      setTimeout(initSplitText, 500)
    }

    return () => {
      split?.revert()
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
        <div ref={textRef} className="font-editorial text-headline leading-tight lowercase">
          We are currently in the early stages of our journey, meticulously sculpting a platform that merges human intuition with algorithmic precision. The potential is vast, and we are just getting started.
        </div>
      </div>
    </section>
  )
}
