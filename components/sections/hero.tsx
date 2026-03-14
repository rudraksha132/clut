'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current) return

    let titleSplit: SplitText | null = null
    let subtitleSplit: SplitText | null = null

    const initSplitText = () => {
      // Split text by lines and words/chars as requested
      // "overflow hidden text animations with splittext (both letters and words in same heading)"
      titleSplit = new SplitText(titleRef.current, {
        type: 'lines, words, chars',
        linesClass: 'overflow-hidden line-wrapper',
        wordsClass: 'word-wrapper',
        charsClass: 'char-wrapper'
      })

      subtitleSplit = new SplitText(subtitleRef.current, {
        type: 'lines',
        linesClass: 'overflow-hidden'
      })

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.5 }
      })

      // Animation: Cascade lines up
      tl.from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        delay: 0.5
      })
      .from(subtitleSplit.lines, {
        yPercent: 100,
        stagger: 0.1,
        opacity: 0
      }, '-=1.2')
      .from('.hero-cta', {
          y: 20,
          opacity: 0,
          stagger: 0.1
      }, '-=1')
    }

    // Wait for fonts to be ready to ensure correct measurements for SplitText
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initSplitText()
      })
    } else {
      // Fallback for browsers without document.fonts
      setTimeout(initSplitText, 500)
    }

    return () => {
      titleSplit?.revert()
      subtitleSplit?.revert()
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-base overflow-hidden"
    >
      <div className="w-full max-w-5xl z-10">
        <h1 
          ref={titleRef}
          className="font-editorial text-hero-stat leading-tight tracking-tight mb-8"
        >
          Elevating digital experiences through creative excellence
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-sans text-hero-label text-mist max-w-2xl mx-auto mb-12"
        >
          We are a team of visionary artists and creative developers redefining the boundaries of the digital landscape.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="hero-cta px-10 py-4 bg-ink text-base rounded-full font-sans font-medium hover:scale-105 transition-transform duration-300">
            Explore our potential
          </button>
          <button className="hero-cta px-10 py-4 border border-rule text-ink rounded-full font-sans font-medium hover:bg-surface transition-colors duration-300">
            Our vision
          </button>
        </div>
      </div>

      {/* Decorative blurred element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-[120px] -z-0 pointer-events-none" />
    </section>
  )
}
