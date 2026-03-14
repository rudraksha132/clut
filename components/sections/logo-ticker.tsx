'use client'

import React, { useEffect, useState } from 'react'

const MARKS = [
  "INSTAGRAM", "LINKEDIN", "YOUTUBE", "TIKTOK", 
  "3.2M VIEWS", "14K FOLLOWERS", "72HR TURNAROUND", 
  "ZERO OVERHEAD", "NO CONTRACTS", "FULL RIGHTS", 
  "CONTENT FIRST", "FOUNDED 2021"
]

export function LogoTicker() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setIsReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <div style={{
      overflow: 'hidden',
      width: '100%',
      height: 44,
      display: 'flex',
      alignItems: 'center',
    }}>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex;
          gap: 56px;
          white-space: nowrap;
          animation: ticker 22s linear infinite;
        }
        .ticker-mark {
          transition: opacity 200ms ease;
        }
        .ticker-mark:hover {
          opacity: 0.58 !important;
        }
      `}</style>
      <div 
        className="ticker-inner" 
        style={{ animationPlayState: isReducedMotion ? 'paused' : 'running' }}
      >
        {[...MARKS, ...MARKS].map((mark, index) => (
          <span
            key={index}
            className="ticker-mark text-eyebrow"
            style={{ 
              opacity: 0.22,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--ink)'
            }}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  )
}
