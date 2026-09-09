import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        surface: '#002C49',
        line: '#005499',
        accent: '#1E90FF',
        paper: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['3.25rem', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-md': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        prose: '58ch',
      },
    },
  },
  plugins: [],
}

export default config
