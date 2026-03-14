'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  gradient?: boolean
}

export function HeroStat({
  children,
  className,
  as: Component = 'h1',
  gradient = false,
}: TypographyProps) {
  return (
    <Component
      className={cn(
        'font-serif text-hero-stat font-normal leading-[var(--text-hero-stat-lh)] tracking-tight',
        gradient && 'bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function Eyebrow({
  children,
  className,
  as: Component = 'div',
}: TypographyProps) {
  return (
    <Component
      className={cn(
        'font-sans text-eyebrow font-600 uppercase tracking-wider text-mist',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function Headline({
  children,
  className,
  as: Component = 'h2',
  gradient = false,
}: TypographyProps) {
  return (
    <Component
      className={cn(
        'font-serif text-headline font-normal leading-tight tracking-tight',
        gradient && 'bg-gradient-to-r from-ink to-cyan bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function Body({
  children,
  className,
  as: Component = 'p',
}: TypographyProps) {
  return (
    <Component className={cn('font-sans text-body leading-relaxed text-ink', className)}>
      {children}
    </Component>
  )
}

export function DataLabel({
  children,
  className,
  as: Component = 'span',
  gradient = false,
}: TypographyProps) {
  return (
    <Component
      className={cn(
        'font-mono text-data font-600',
        gradient && 'bg-gradient-to-r from-cyan to-ember bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function Caption({
  children,
  className,
  as: Component = 'p',
}: TypographyProps) {
  return (
    <Component className={cn('font-sans text-sm text-mist leading-normal', className)}>
      {children}
    </Component>
  )
}
