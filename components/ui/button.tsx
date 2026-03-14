'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const beamRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
      const button = buttonRef.current
      if (!button || typeof window === 'undefined') return

      const handleMouseMove = (e: MouseEvent) => {
        if (!beamRef.current) return
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        beamRef.current.style.left = x + 'px'
        beamRef.current.style.top = y + 'px'
      }
      const handleMouseEnter = () => {
        if (beamRef.current) beamRef.current.style.opacity = '1'
      }
      const handleMouseLeave = () => {
        if (beamRef.current) beamRef.current.style.opacity = '0'
      }

      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, [])

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: '10px 24px', fontSize: 13 },
      md: { padding: '14px 36px', fontSize: 14 },
      lg: { padding: '18px 48px', fontSize: 15 },
    }

    if (variant === 'primary') {
      return (
        <button
          ref={buttonRef}
          className={cn('relative overflow-hidden cursor-pointer', className)}
          style={{
            backgroundColor: 'var(--ink)',
            color: 'var(--base)',
            borderRadius: 100,
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
            boxShadow: '0 4px 16px rgba(232,241,242,0.15)',
            ...sizeStyles[size],
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'scale(1.02)'
            el.style.boxShadow = '0 8px 32px var(--mint-glow)'
            el.style.backgroundColor = '#ffffff'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
            el.style.backgroundColor = 'var(--ink)'
          }}
          {...props}
        >
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{children}</span>
        </button>
      )
    }

    // Secondary — ghost style on dark bg
    return (
      <button
        ref={buttonRef}
        className={cn('cursor-pointer', className)}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--ink)',
          borderRadius: 100,
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: '1px solid var(--rule)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          transition: 'border-color 0.2s ease, background 0.2s ease',
          ...sizeStyles[size],
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.borderColor = 'rgba(255, 255, 255, 0.40)'
          el.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.borderColor = 'var(--rule)'
          el.style.backgroundColor = 'transparent'
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
