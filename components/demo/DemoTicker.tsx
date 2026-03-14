'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

interface TickerItem {
  id: string
  platform: string
  title: string
  metric: string
  time: string
  icon: React.ReactNode
}

const TICKER_ITEMS: TickerItem[] = [
  { id: '1', platform: 'Instagram', title: 'Why I fired my agency', metric: '847K views', time: '3 days ago', icon: <div className="w-4 h-4 bg-ink rounded-sm" /> },
  { id: '2', platform: 'LinkedIn', title: 'The content mistake killing', metric: '124K views', time: '5 days ago', icon: <div className="w-4 h-4 bg-ink rounded-sm" /> },
  { id: '3', platform: 'YouTube', title: 'Building in public', metric: '312K views', time: '1 week ago', icon: <div className="w-4 h-4 bg-ink rounded-sm" /> },
  { id: '4', platform: 'Instagram', title: 'Scale without stress', metric: '942K views', time: '2 days ago', icon: <div className="w-4 h-4 bg-ink rounded-sm" /> },
  { id: '5', platform: 'LinkedIn', title: 'Product-led growth secret', metric: '88K views', time: '6 days ago', icon: <div className="w-4 h-4 bg-ink rounded-sm" /> },
]

export function DemoTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const totalHeight = container.scrollHeight / 2
    let currentY = 0
    const speed = 0.6 // px/frame

    const update = () => {
      if (isPaused) return
      currentY -= speed
      if (currentY <= -totalHeight) {
        currentY = 0
      }
      gsap.set(container, { y: currentY })
    }

    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [isPaused])

  return (
    <div 
      className="relative w-[320px] h-full overflow-hidden bg-surface border border-ink/8 rounded-2xl p-4 flex flex-col"
      style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)' }}
      data-cursor="ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-6 px-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-mist">Recent Results</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-medium uppercase text-mist">Live</span>
        </div>
      </div>

      <div ref={containerRef} className="flex flex-col gap-3">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="p-4 rounded-xl bg-base/40 border border-ink/5 hover:bg-ink/5 transition-colors group">
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-xs font-medium text-ink/70">{item.platform}</span>
            </div>
            <h4 className="text-[13px] font-normal text-ink mb-3 w-full text-left line-clamp-1">{item.title}</h4>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm font-semibold text-ink">{item.metric.split(' ')[0]}</span>
                <span className="text-[11px] text-mist ml-1">{item.metric.split(' ')[1]}</span>
              </div>
              <span className="text-[10px] font-mono text-mist">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
