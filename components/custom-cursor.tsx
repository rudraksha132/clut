'use client'

import React, { useEffect, useRef } from 'react'

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0, outerX: 0, outerY: 0 })
  const isVisibleRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lerp = 0.12

    const render = () => {
      if (outerRef.current && isVisibleRef.current) {
        posRef.current.outerX += (posRef.current.x - posRef.current.outerX) * lerp
        posRef.current.outerY += (posRef.current.y - posRef.current.outerY) * lerp
        outerRef.current.style.left = posRef.current.outerX + 'px'
        outerRef.current.style.top = posRef.current.outerY + 'px'
      }
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY
      if (innerRef.current) {
        innerRef.current.style.left = e.clientX + 'px'
        innerRef.current.style.top = e.clientY + 'px'
      }
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        if (outerRef.current) outerRef.current.style.opacity = '1'
        if (innerRef.current) innerRef.current.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      if (outerRef.current) outerRef.current.style.opacity = '0'
      if (innerRef.current) innerRef.current.style.opacity = '0'
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('a, button, [role="button"]')) {
        if (outerRef.current) {
          outerRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)'
          outerRef.current.style.borderColor = 'rgba(127,200,209,0.7)'
          outerRef.current.style.backgroundColor = 'rgba(127,200,209,0.06)'
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('a, button, [role="button"]')) {
        if (outerRef.current) {
          outerRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
          outerRef.current.style.borderColor = 'rgba(232,241,242,0.30)'
          outerRef.current.style.backgroundColor = 'transparent'
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: 26,
          height: 26,
          border: '1.5px solid rgba(232,241,242,0.30)',
          borderRadius: '50%',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease, opacity 0.2s ease',
          zIndex: 9999,
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
        className="hidden lg:block"
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          width: 5,
          height: 5,
          backgroundColor: '#7FC8D1',
          borderRadius: '50%',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
        className="hidden lg:block"
      />
    </>
  )
}
