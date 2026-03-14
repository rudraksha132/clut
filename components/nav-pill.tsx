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
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '10px 18px',
          borderRadius: 100,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(22,35,54,0.85)',
          border: '1px solid rgba(232,241,242,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 6 9 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 9 12 2 12 2Z" fill="#7FC8D1"/>
            <path d="M12 8C12 8 9 12 9 15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15C15 12 12 8 12 8Z" fill="#0F1C2D" opacity="0.5"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: '#E8F1F2', letterSpacing: '-0.01em' }}>
            CLUT
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, backgroundColor: 'rgba(232,241,242,0.08)' }} />

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
          {NAV_LINKS.map((link) =>
            link.isCTA ? (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 16px',
                  backgroundColor: '#E8F1F2',
                  color: '#0F1C2D',
                  borderRadius: 100,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  marginLeft: 6,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.opacity = '0.85'
                  el.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.opacity = '1'
                  el.style.transform = 'scale(1)'
                }}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 10px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'rgba(232,241,242,0.45)',
                  textDecoration: 'none',
                  borderRadius: 100,
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(232,241,242,0.90)'
                  el.style.backgroundColor = 'rgba(232,241,242,0.06)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(232,241,242,0.45)'
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
