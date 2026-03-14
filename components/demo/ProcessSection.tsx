'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Strategy call',
    note: '20 min. We decide if this works.',
  },
  {
    num: '02',
    title: 'Script & shoot',
    note: 'We handle everything. You show up.',
  },
  {
    num: '03',
    title: 'Edit & refine',
    note: '2 rounds of changes, max.',
  },
  {
    num: '04',
    title: 'Publish & monitor',
    note: 'You keep all rights. We track results.',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll('.process-step') || []
      const lines = stepsRef.current?.querySelectorAll('.connector-line') || []

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
        }
      })

      steps.forEach((step, i) => {
        tl.fromTo(step, 
          { opacity: 0.3, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 
          i === 0 ? 0 : '>-=0.3'
        )
        if (lines[i]) {
          tl.fromTo(lines[i],
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: 'expo.out', transformOrigin: 'left center' },
            '<'
          )
        }
      })

      tl.fromTo(footerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '>+=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="py-32 px-6 bg-base overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-4 mb-24 items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/38">Section III</span>
          <h2 className="font-serif italic text-hero-label text-ink">The Process</h2>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {STEPS.map((step, i) => (
            <div key={step.num} className="process-step flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-4">
                 <span className="font-mono text-[11px] opacity-30 tracking-wider transition-opacity duration-300">
                   {step.num}
                 </span>
                 {i < STEPS.length - 1 && (
                   <div className="connector-line hidden md:block absolute left-[30px] right-[-30px] top-[7px] h-px bg-ink/10" />
                 )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-[13px] text-mist leading-relaxed max-w-[200px]">
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={footerRef} className="mt-32 flex justify-center opacity-0">
          <p className="font-mono text-xs text-mist tracking-widest uppercase">
            Average turnaround: 72 hours from shoot to post.
          </p>
        </div>
      </div>
    </section>
  )
}
