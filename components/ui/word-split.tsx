'use client'

import React, { useMemo } from 'react'

interface WordSplitProps {
  text: string
  className?: string
  wordClassName?: string
}

export function WordSplit({ text, className, wordClassName }: WordSplitProps) {
  const words = useMemo(() => text.split(' '), [text])

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <span
          key={i}
          className={wordClassName}
          data-word
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'pre',
            opacity: 0,
            transform: 'translateY(10px)'
          }}
        >
          {word}{i !== words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
