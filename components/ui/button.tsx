'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      sm: { padding: '8px 20px', fontSize: 12 },
      md: { padding: '12px 26px', fontSize: 14 },
      lg: { padding: '14px 32px', fontSize: 14 },
    }

    if (variant === 'primary') {
      return (
        <button
          ref={buttonRef}
          className={cn('relative overflow-hidden cursor-pointer', className)}
          style={{
            backgroundColor: '#E8F1F2',
            color: '#0F1C2D',
            borderRadius: 100,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
            boxShadow: '0 2px 12px rgba(232,241,242,0.15)',
            ...sizeStyles[size],
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'scale(1.02)'
            el.style.boxShadow = '0 6px 28px rgba(232,241,242,0.28)'
            el.style.backgroundColor = '#ffffff'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 2px 12px rgba(232,241,242,0.15)'
            el.style.backgroundColor = '#E8F1F2'
          }}
          {...props}
        >
          <span
            ref={beamRef}
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              left: '50%',
              top: '50%',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
          <span style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '1.1em',
            display: 'inline-flex',
            alignItems: 'center',
          }}>→</span>
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
          color: '#E8F1F2',
          borderRadius: 100,
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: '1px solid rgba(232,241,242,0.20)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'border-color 0.2s ease, background 0.2s ease',
          ...sizeStyles[size],
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.borderColor = 'rgba(232,241,242,0.50)'
          el.style.backgroundColor = 'rgba(232,241,242,0.06)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.borderColor = 'rgba(232,241,242,0.20)'
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
