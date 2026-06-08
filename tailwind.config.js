/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0A2D5E',
            light:   '#1B4F8A',
            dark:    '#061B3A',
          },
          red: {
            DEFAULT: '#C8102E',
            light:   '#E8294A',
            dark:    '#9A0C23',
          },
          black: '#0D0D0D',
          white: '#FAFAFA',
          gray: {
            50:  '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          },
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0A2D5E 0%, #1B4F8A 50%, #C8102E 100%)',
        'gradient-hero':  'linear-gradient(180deg, rgba(10,45,94,0.85) 0%, rgba(10,45,94,0.6) 60%, rgba(200,16,46,0.3) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'float':      'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
