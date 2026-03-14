'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '#hook' },
  { label: 'Case Studies', href: '#proof' },
  { label: 'Process', href: '#process' },
]

export function DemoNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500">
      <div className={cn(
        "flex items-center gap-6 px-6 py-3 rounded-full border transition-all duration-500",
        "bg-base/82 backdrop-blur-md border-ink/10 shadow-sm",
        isScrolled ? "scale-95 opacity-90" : "scale-100 opacity-100"
      )}>
        {/* Flame Logo */}
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 2 15 6 15 11C15 16 12 22 12 22C12 22 9 16 9 11C9 6 12 2 12 2Z" fill="#00C4DB" />
            <path d="M12 7C12 7 13.5 9.5 13.5 12.5C13.5 15.5 12 18.5 12 18.5C12 18.5 10.5 15.5 10.5 12.5C10.5 9.5 12 7 12 7Z" fill="#1A4FD6" />
          </svg>
          <span className="font-serif italic font-bold tracking-tight text-ink hidden sm:inline">clut.media</span>
        </div>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-ink/55 hover:text-ink/90 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
             href="#close"
             className="ml-2 px-4 py-1.5 text-xs font-semibold bg-ink text-base rounded-full hover:scale-105 active:scale-95 transition-transform"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  )
}
