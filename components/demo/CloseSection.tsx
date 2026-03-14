'use client'

import React from 'react'
import { MagneticButton } from './MagneticButton'

export function CloseSection() {
  return (
    <div className="flex flex-col">
      <section id="close" className="min-h-[90vh] flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/35">Next Step</span>
          
          <h2 className="font-serif italic text-hero-stat text-ink leading-tight">
            20 minutes.
          </h2>
          
          <p className="font-sans text-hero-label text-mist max-w-[520px] leading-[1.4]">
            One call. We&apos;ll tell you exactly what your content needs — and whether we&apos;re the right team to do it.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6">
            <MagneticButton className="px-12 py-5 text-sm uppercase tracking-[0.06em]">
              Book a call →
            </MagneticButton>
            
            <p className="text-[12px] font-sans text-ink/35">
              No commitment. No pitch deck. No funnels.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="px-12 py-8 border-t border-ink/8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 2 15 6 15 11C15 16 12 22 12 22C12 22 9 16 9 11C9 6 12 2 12 2Z" fill="#00C4DB" />
            <path d="M12 7C12 7 13.5 9.5 13.5 12.5C13.5 15.5 12 18.5 12 18.5C12 18.5 10.5 15.5 10.5 12.5C10.5 9.5 12 7 12 7Z" fill="#1A4FD6" />
          </svg>
          <span className="text-[13px] font-semibold text-ink">clut.media</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[12px] text-mist font-medium">
          <span>© 2025</span>
          <a href="mailto:hello@clut.media" className="hover:text-ink transition-colors">hello@clut.media</a>
          <a href="/" className="hover:text-ink transition-colors">Back to main site ↗</a>
        </div>
      </footer>
    </div>
  )
}
