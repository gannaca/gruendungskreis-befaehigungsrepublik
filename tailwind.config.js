/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-tertiary': '#1a1a1a',
        'accent-cyan': '#00ffff',
        'accent-magenta': '#ff00ff',
        'accent-yellow': '#ffff00',
        'accent-orange': '#ff6600',
        'accent-red': '#ff3333',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-muted': '#666666',
        'border-subtle': '#2a2a2a',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 60px rgba(0,255,255,0.3)',
        'glow-magenta': '0 0 60px rgba(255,0,255,0.3)',
      }
    },
  },
  plugins: [],
}
