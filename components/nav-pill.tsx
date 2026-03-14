'use client'

import React, { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Case Studies', href: '#proof' },
  { label: 'Process', href: '#process' },
  { label: 'Book a Call', href: '#close', isCTA: true },
]

export function NavPill() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 600) {
        setIsVisible(scrollY < lastScrollY)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 32,
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-20px'})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 100,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 24px', // Tighter vertical, wider horizontal
          borderRadius: 100,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)', // Extremely subtle white wash
          border: '1px solid rgba(255, 255, 255, 0.08)', // Delicate border
          gap: 16, // Even tighter for peak minimalism
        }}
      >
        {/* Logo */}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0em', color: 'var(--ink)' }}>
          CLUT.
        </span>

        {/* Separator Dot */}
        <div style={{ width: 2, height: 2, borderRadius: '50%', backgroundColor: 'var(--mist)' }} />

        {/* Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
          {NAV_LINKS.filter(l => !l.isCTA).map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--mist)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mist)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
