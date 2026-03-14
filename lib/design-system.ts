/**
 * CLUT Media Design System
 * Centralized theme, colors, easing, and animation constants
 */

export const COLORS = {
  // Base Palette (Forge Light)
  base: '#F8F7F4',
  surface: '#EFEDE8',
  ink: '#0E0C0A',
  mist: 'rgba(14, 12, 10, 0.42)',
  rule: 'rgba(14, 12, 10, 0.08)',

  // Accents
  cyan: '#00C4DB',
  blue: '#1A4FD6',
  ember: '#C85A2A',

  // States
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
}

export const TYPOGRAPHY = {
  // Font families
  families: {
    sans: '"Inter", sans-serif',
    serif: '"Instrument Serif", serif',
    mono: '"JetBrains Mono", monospace',
  },

  // Sizes (clamp values in px)
  sizes: {
    heroStat: 'clamp(80px, 13vw, 168px)',
    eyebrow: 'clamp(12px, 1.8vw, 16px)',
    heroLabel: 'clamp(16px, 2vw, 22px)',
    headline: 'clamp(28px, 4vw, 56px)',
    body: 'clamp(16px, 2vw, 18px)',
    data: 'clamp(14px, 1.8vw, 16px)',
  },

  // Line heights
  lineHeights: {
    tight: 0.84,
    normal: 1.3,
    relaxed: 1.6,
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.06em',
    normal: '-0.02em',
    wide: '0.02em',
  },
}

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
}

export const SHADOWS = {
  sm: '0 2px 8px rgba(14, 12, 10, 0.06)',
  md: '0 4px 16px rgba(14, 12, 10, 0.1)',
  lg: '0 8px 32px rgba(14, 12, 10, 0.15)',
}

export const BORDER_RADIUS = {
  sm: 'calc(0.375rem - 2px)',
  md: '0.375rem',
  lg: 'calc(0.375rem + 4px)',
}

/**
 * GSAP Custom Easing Functions
 * These match the spec's easing requirements
 */
export const EASING = {
  // Smooth ease out
  expoOut: 'power2.out',
  // Bouncy elastic ease
  backOut: 'back.out(2.2)',
  // Linear entrance
  linear: 'none',
  // Smooth power curve
  power2Out: 'power2.out',
  power3Out: 'power3.out',
}

/**
 * Animation Timing Specifications (milliseconds)
 * From design spec §05
 */
export const ANIMATIONS = {
  // Hook section timing
  hook: {
    total: 1600,
    stats: { start: 280, duration: 750 },
    line: { start: 280, duration: 500 },
    cta1: { start: 400, duration: 600 },
    cta2: { start: 500, duration: 600 },
    ticker: { start: 600, duration: 800 },
  },

  // Proof section
  proof: {
    stagger: 120,
    triggerPoint: 'top 78%',
  },

  // Process section
  process: {
    stepDuration: 500,
    stepStagger: 200,
    triggerPoint: 'top 68%',
  },

  // Social section
  social: {
    stagger: 100,
    triggerPoint: 'top 76%',
  },

  // Close section
  close: {
    duration: 600,
    stagger: 100,
  },
}

/**
 * Responsive Breakpoints
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Layout Constants
 */
export const LAYOUT = {
  maxWidth: '1400px',
  gutter: 'var(--spacing-lg)',
  containerPadding: {
    mobile: 'var(--spacing-md)',
    tablet: 'var(--spacing-lg)',
    desktop: 'var(--spacing-2xl)',
  },
}

/**
 * Utility function to get responsive values
 */
export function getResponsiveValue(mobile: string, tablet?: string, desktop?: string): string {
  return desktop ? `${mobile} @md ${tablet} @lg ${desktop}` : mobile
}

/**
 * Smooth scroll configuration for Lenis
 */
export const SCROLL_CONFIG = {
  duration: 1.0, // seconds
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
}

/**
 * Ticker animation configuration
 * Speed: base + (pageVelocity * 1.4)
 */
export const TICKER_CONFIG = {
  baseSpeed: 30, // px/s
  velocityMultiplier: 1.4,
  pauseDuration: 0.3, // seconds
}

/**
 * Animation prefers-reduced-motion check
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Custom cursor configuration
 */
export const CURSOR_CONFIG = {
  outer: {
    size: 24, // px
    border: 2, // px
    color: COLORS.ink,
    opacity: 0.4,
  },
  inner: {
    size: 5, // px
    color: COLORS.ink,
  },
  states: {
    default: { text: '' },
    clickable: { text: 'CLICK' },
    media: { text: 'PLAY' },
    ticker: { text: 'DRAG' },
  },
}

/**
 * CTA Button configuration
 */
export const CTA_CONFIG = {
  primary: {
    bg: COLORS.ink,
    text: COLORS.base,
    beamColor: COLORS.cyan,
  },
  secondary: {
    bg: COLORS.surface,
    text: COLORS.ink,
    borderColor: COLORS.rule,
  },
}
