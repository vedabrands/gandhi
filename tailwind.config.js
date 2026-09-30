/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FAF7F0',
          100: '#FAF4E6',
          200: '#F1E4C3', // Base aged parchment
          300: '#E5D3A6',
          400: '#D4BE88',
          900: '#2A1A0E',
        },
        leather: {
          950: '#150C06',
          900: '#1A0F07',
          800: '#2A1A0E', // Base dark leather brown
          700: '#3D2717',
          600: '#4A3220',
          500: '#5C3F2B',
        },
        maroon: {
          900: '#3D0D0D',
          800: '#541414',
          700: '#7A1F1F', // Deep maroon accent
          600: '#9E2D2D',
          500: '#B83A3A',
        },
        gold: {
          300: '#E5C768',
          400: '#D4AF37',
          500: '#B8862B', // Antique gold border
          600: '#966B20',
          700: '#7A5418',
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        tactical: ['"Cinzel"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        caption: ['"IM Fell English"', 'serif'],
        mono: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'manuscript': '0 20px 50px rgba(26, 15, 7, 0.6), inset 0 0 80px rgba(42, 26, 14, 0.12)',
        'gold-glow': '0 0 25px rgba(184, 134, 43, 0.35)',
        'maroon-glow': '0 0 25px rgba(122, 31, 31, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s ease-in-out infinite alternate',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
      }
    },
  },
  plugins: [],
}
