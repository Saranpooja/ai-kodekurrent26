/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        slate: {
          950: '#030712',
        },
        teal: {
          350: '#5eead4',
          650: '#0d9488',
        },
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        growBar: {
          '0%': { transform: 'scaleY(0.2)' },
          '50%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0.4)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        growBar: 'growBar 1.2s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
        fadeIn: 'fadeIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
