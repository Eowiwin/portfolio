/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'floatUp': 'floatUp 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(0) translateX(20px)' },
          '75%': { transform: 'translateY(20px) translateX(10px)' },
        },
        floatUp: {
          '0%': { 
            transform: 'translate(-50%, 0) scale(0.5)',
            opacity: 0
          },
          '50%': { 
            transform: 'translate(-50%, -2em) scale(1)',
            opacity: 1
          },
          '100%': { 
            transform: 'translate(-50%, -4em) scale(1)',
            opacity: 0
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 