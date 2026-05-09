/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#ffffff',
          subtle: '#f9fafb', // gray-50
        },
        text: {
          primary: '#111827', // gray-900
          secondary: '#4b5563', // gray-600
          muted: '#9ca3af', // gray-400
        },
        border: {
          DEFAULT: '#e5e7eb', // gray-200
          subtle: '#f3f4f6', // gray-100
        },
        status: {
          active: '#15803d', // green-700
          historical: '#374151', // gray-700
          accent: '#2563eb', // blue-600
        },
        statusBg: {
          active: '#dcfce7', // green-100
          historical: '#f3f4f6', // gray-100
        }
      },
    },
  },
  plugins: [],
}
