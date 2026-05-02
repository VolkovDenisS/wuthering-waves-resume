/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'ww-bg': '#0a0a0c', // Deep Charcoal/Black
        'ww-panel': 'rgba(20, 22, 28, 0.6)', // Glassmorphism base
        'ww-accent': '#f3c84f', // Electric Gold/Yellow
        'ww-accent-hover': '#fff29c',
        'ww-cyan': '#00e5ff',
        'ww-text': '#f2f2f2',
        'ww-muted': '#8a8a8e',
        'ww-border': 'rgba(255, 255, 255, 0.15)' // Thin transparent borders
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      letterSpacing: {
        'widest': '.25em',
        'mega': '.5em'
      }
    },
  },
  plugins: [],
}
