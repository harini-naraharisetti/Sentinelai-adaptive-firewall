/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#00875a',
          950: '#022c22',
        },
        surface: {
          50: '#fafafa',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d1d5db',
          card: '#ffffff',
          dark: '#0f172a',
        },
        cyber: {
          950: '#0f172a',
          900: '#1e293b',
          850: '#334155',
          800: '#475569',
          750: '#64748b',
          700: '#94a3b8',
          600: '#cbd5e1',
          500: '#64748b',
          400: '#94a3b8',
          300: '#475569',
          200: '#334155',
          100: '#0f172a',
        },
        threat: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#10b981',
          info: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'brand': '0 8px 20px -4px rgba(0, 135, 90, 0.3)',
        'glow-green': '0 0 20px -4px rgba(16, 185, 129, 0.35)',
        'glow-cyan': '0 0 20px -4px rgba(6, 182, 212, 0.35)',
        'glow-purple': '0 0 20px -4px rgba(139, 92, 246, 0.35)',
        'glow-red': '0 0 20px -4px rgba(239, 68, 68, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
