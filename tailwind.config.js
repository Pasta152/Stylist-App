/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C8A96B',
          dim: 'rgba(200,169,107,0.12)',
          soft: 'rgba(200,169,107,0.25)',
        },
        surface: {
          1: '#111116',
          2: '#18181F',
          3: '#1F1F28',
        },
        border: {
          1: '#252530',
          2: '#30303D',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1)',
        'heart-pop': 'heartPop 0.3s ease',
        'pulse-slow': 'pulse 1.8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(100%)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        heartPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
