/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#dce5f1',
          200: '#bdd0e6',
          300: '#91b3d5',
          400: '#5f91c0',
          500: '#3d74a9',
          600: '#2d5c8d',
          700: '#254972',
          800: '#1c3656',
          900: '#0b192c',
          950: '#060f1b',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(11, 25, 44, 0.05)',
        'soft-md': '0 4px 6px -1px rgba(11, 25, 44, 0.08), 0 2px 4px -2px rgba(11, 25, 44, 0.04)',
        'soft-lg': '0 10px 15px -3px rgba(11, 25, 44, 0.08), 0 4px 6px -4px rgba(11, 25, 44, 0.03)',
        'soft-xl': '0 20px 25px -5px rgba(11, 25, 44, 0.08), 0 8px 10px -6px rgba(11, 25, 44, 0.03)',
      }
    },
  },
  plugins: [],
}
