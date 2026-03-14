import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        mono: 'var(--font-mono)',
      },
      colors: {
        base: 'var(--base)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        mist: 'var(--mist)',
        rule: 'var(--rule)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        ember: 'var(--ember)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
      },
      fontSize: {
        'hero-stat': ['var(--text-hero-stat)', { lineHeight: 'var(--text-hero-stat-lh)' }],
        'eyebrow': ['var(--text-eyebrow)', { lineHeight: '1.3' }],
        'hero-label': ['var(--text-hero-label)', { lineHeight: '1.3' }],
        'headline': ['var(--text-headline)', { lineHeight: '1.1' }],
        'body': ['var(--text-body)', { lineHeight: '1.6' }],
        'data': ['var(--text-data)', { lineHeight: '1.4' }],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        },
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
    },
  },
  plugins: [],
}

export default config
