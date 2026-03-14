'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function MagneticButton({ children, className, onClick, variant = 'primary' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const xTo = gsap.quickTo(button, 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(button, 'y', { duration: 0.8, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = button.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      xTo(x * 0.3)
      yTo(y * 0.3)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group",
        variant === 'primary' ? "bg-ink text-base shadow-lg" : "bg-transparent border border-ink/20 text-ink",
        className
      )}
    >
      {/* Beam effect for primary button */}
      {variant === 'primary' && (
        <div
          ref={beamRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-beam pointer-events-none"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
