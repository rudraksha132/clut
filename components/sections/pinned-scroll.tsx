'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function PinnedScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panel1Ref = useRef<HTMLDivElement>(null)
  const panel2Ref = useRef<HTMLDivElement>(null)
  const panel3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = [panel1Ref.current, panel2Ref.current, panel3Ref.current]
    
    // Pinning animation with no anticipatePin
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 0,
      onUpdate: (self) => {
        // Simple scale/opacity transitions based on progress
        const progress = self.progress
        if (panel1Ref.current && panel2Ref.current && panel3Ref.current) {
            if (progress < 0.33) {
                panel1Ref.current.style.opacity = '1'
                panel2Ref.current.style.opacity = '0'
                panel3Ref.current.style.opacity = '0'
            } else if (progress < 0.66) {
                panel1Ref.current.style.opacity = '0'
                panel2Ref.current.style.opacity = '1'
                panel3Ref.current.style.opacity = '0'
            } else {
                panel1Ref.current.style.opacity = '0'
                panel2Ref.current.style.opacity = '0'
                panel3Ref.current.style.opacity = '1'
            }
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-ink text-base">
      <div 
        ref={panel1Ref} 
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
      >
        <span className="font-editorial text-hero-stat text-cyan mb-4">Discovery</span>
        <p className="font-sans text-hero-label text-mist">Unearthing hidden patterns in chaos.</p>
      </div>

      <div 
        ref={panel2Ref} 
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500"
      >
        <span className="font-editorial text-hero-stat text-blue mb-4">Sculpting</span>
        <p className="font-sans text-hero-label text-mist">Giving form to abstract possibilities.</p>
      </div>

      <div 
        ref={panel3Ref} 
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500"
      >
        <span className="font-editorial text-hero-stat text-ember mb-4">Deployment</span>
        <p className="font-sans text-hero-label text-mist">Launching innovation into the real world.</p>
      </div>
    </div>
  )
}
