/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Mono', 'monospace'],
        serif: ['Space Mono', 'monospace'],
        mono: ['Space Mono', 'monospace'],
        display: ['Anton SC', 'sans-serif']
      },
      colors: {
        ink: '#050505',
        card: 'rgba(255,255,255,0.065)',
        line: 'rgba(255,255,255,0.12)'
      },
      boxShadow: {
        glow: '0 0 60px rgba(112, 87, 255, 0.22)',
        soft: '0 24px 80px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};
