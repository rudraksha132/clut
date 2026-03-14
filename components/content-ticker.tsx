'use client'

import React, { useEffect, useRef } from 'react'

interface TickerItem {
  id: string
  platform: string
  contentTitle: string
  metric: string
  metricLabel: string
  time: string
}

const TICKER_ITEMS: TickerItem[] = [
  { id: '1', platform: 'Instagram', contentTitle: 'Why I fired my agency', metric: '847K', metricLabel: 'views', time: '3 days ago' },
  { id: '2', platform: 'LinkedIn', contentTitle: 'The content mistake killing your brand', metric: '124K', metricLabel: 'views', time: '5 days ago' },
  { id: '3', platform: 'YouTube', contentTitle: 'Building in public — week 12', metric: '312K', metricLabel: 'views', time: '1 week ago' },
  { id: '4', platform: 'TikTok', contentTitle: 'What $0 content looks like vs $10K', metric: '2.1M', metricLabel: 'views', time: '10 days ago' },
  { id: '5', platform: 'Instagram', contentTitle: 'Founder who almost quit — then went viral', metric: '680K', metricLabel: 'views', time: '2 weeks ago' },
  { id: '6', platform: 'LinkedIn', contentTitle: 'I posted every day for 30 days', metric: '94K', metricLabel: 'views', time: '3 weeks ago' },
  { id: '7', platform: 'YouTube', contentTitle: 'The truth about content agencies', metric: '445K', metricLabel: 'views', time: '1 month ago' },
  { id: '8', platform: 'TikTok', contentTitle: 'How we got 1M views with no budget', metric: '3.2M', metricLabel: 'views', time: '5 weeks ago' },
]

const ALL_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS]

export function ContentTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const baseSpeed = 0.55

    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += baseSpeed
        const halfHeight = inner.scrollHeight / 2
        if (posRef.current >= halfHeight) posRef.current = 0
        inner.style.transform = `translateY(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const handleMouseEnter = () => { isPausedRef.current = true }
    const handleMouseLeave = () => { isPausedRef.current = false }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative h-full overflow-hidden rounded-2xl" style={{
      border: '1px solid rgba(232,241,242,0.06)',
      backgroundColor: '#162336',
    }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(232,241,242,0.04)' }}>
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#4ADE80',
            animation: 'pulse-dot 2s ease-in-out infinite',
            boxShadow: '0 0 6px #4ADE80',
          }}
        />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(232,241,242,0.30)' }}>
          Recent results — live
        </span>
      </div>

      {/* Scroll area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          height: 'calc(100% - 44px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div ref={innerRef} className="will-change-transform">
          {ALL_ITEMS.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="px-4 py-3 transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(232,241,242,0.04)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(232,241,242,0.04)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'
              }}
            >
              <div className="flex items-center gap-1 mb-1">
                <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(232,241,242,0.35)', fontFamily: 'var(--font-sans)' }}>{item.platform}</span>
              </div>
              <p style={{ fontSize: 13, fontFamily: 'var(--font-sans)', color: 'rgba(232,241,242,0.75)', lineHeight: 1.35, marginBottom: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.contentTitle}
              </p>
              <div className="flex items-baseline gap-1">
                <span style={{ fontSize: 15, fontWeight: 600, color: '#E8F1F2', fontFamily: 'var(--font-sans)' }}>{item.metric}</span>
                <span style={{ fontSize: 11, color: 'rgba(232,241,242,0.35)', fontFamily: 'var(--font-sans)' }}>{item.metricLabel}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(232,241,242,0.22)', letterSpacing: '0.03em' }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
