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
          backgroundColor: 'rgba(11,19,43,0.85)', // Deep Forge frosted
          border: '1px solid rgba(232,241,242,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
          <img src="/logo.jpg" alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
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
                  color: '#0B132B',
                  borderRadius: 100,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  marginLeft: 6,
                  transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.opacity = '0.9'
                  el.style.transform = 'scale(1.02)'
                  el.style.boxShadow = '0 0 12px rgba(232,241,242,0.3)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.opacity = '1'
                  el.style.transform = 'scale(1)'
                  el.style.boxShadow = 'none'
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
