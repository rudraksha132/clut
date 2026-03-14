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
        top: 28,
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-20px'})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 100,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        className="w-auto min-w-max md:min-w-[520px] max-w-[95vw]"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderRadius: 100,
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
          backgroundColor: 'var(--surface-glass)',
          boxShadow: 'inset 0 0 0 1px rgba(234,240,242,0.09)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            CLUT
          </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 18, backgroundColor: 'var(--rule)' }} />
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
          {NAV_LINKS.map((link) =>
            link.isCTA ? (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 16px',
                  backgroundColor: 'var(--ember)',
                  color: 'white',
                  borderRadius: 100,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  marginLeft: 6,
                  transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = '#B8701A'
                  el.style.transform = 'scale(1.02)'
                  el.style.boxShadow = '0 0 12px var(--amber-glow)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = 'var(--ember)'
                  el.style.transform = 'scale(1)'
                  el.style.boxShadow = 'none'
                }}
              >
                {link.label}
              </a>
            ) : (
              <a
                className="hidden md:inline-block"
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 10px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--mist)',
                  textDecoration: 'none',
                  borderRadius: 100,
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--ink)'
                  el.style.backgroundColor = 'rgba(208,128,48,0.08)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--mist)'
                  el.style.backgroundColor = 'transparent'
                }}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
