'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export function DemoCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'clickable' | 'media' | 'ticker'>('default')

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    
    // Lerp 0.12 (approx 80ms lag at 60fps)
    const lerp = 0.12

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * lerp
      pos.y += (mouse.y - pos.y) * lerp
      
      gsap.set(outer, { x: pos.x, y: pos.y })
      gsap.set(inner, { x: mouse.x, y: mouse.y })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        setCursorState('clickable')
      } else if (target.closest('[data-cursor="media"]')) {
        setCursorState('media')
      } else if (target.closest('[data-cursor="ticker"]')) {
        setCursorState('ticker')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleInteraction)
    gsap.ticker.add(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleInteraction)
      gsap.ticker.remove(updatePosition)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <div
        ref={outerRef}
        className={cn(
          "absolute top-0 left-0 w-6 h-6 border-[1.5px] border-ink rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,border-radius] duration-300 ease-out flex items-center justify-center overflow-hidden",
          cursorState === 'clickable' && "w-12 h-12 bg-ink border-ink rounded-full",
          cursorState === 'media' && "w-[84px] h-[84px] bg-ink border-ink rounded-full",
          cursorState === 'ticker' && "w-10 h-10 bg-ink border-ink rounded-full"
        )}
      >
        <span className={cn(
          "text-[10px] font-mono uppercase tracking-widest text-base opacity-0 transition-opacity duration-300",
          cursorState !== 'default' && "opacity-100"
        )}>
          {cursorState === 'clickable' && 'Click'}
          {cursorState === 'media' && 'Play'}
          {cursorState === 'ticker' && 'Drag'}
        </span>
      </div>
      <div
        ref={innerRef}
        className="absolute top-0 left-0 w-[5px] h-[5px] bg-ink rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}
