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
        'spin-slow': 'spin 8s linear infinite',
        sparkleLeft: 'sparkleLeft 2s ease-in-out infinite',
        sparkleRight: 'sparkleRight 2s ease-in-out infinite',
        'sound-wave': 'soundWave 1s ease-in-out infinite',
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
            opacity: '0',
            transform: 'translate(-50%, 0) scale(0.5)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translate(-50%, -20px) scale(1)',
          }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        sparkleLeft: {
          '0%': { 
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateX(0) scale(0.5)',
          },
          '10%': {
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(-5px) scale(0.8)',
          },
          '50%': { 
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(-10px) scale(1.2)',
          },
          '90%': {
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(-15px) scale(0.8)',
          },
          '100%': { 
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateX(-20px) scale(0.5)',
          }
        },
        sparkleRight: {
          '0%': { 
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateX(0) scale(0.5)',
          },
          '10%': {
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(5px) scale(0.8)',
          },
          '50%': { 
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(10px) scale(1.2)',
          },
          '90%': {
            opacity: '1',
            visibility: 'visible',
            transform: 'translateX(15px) scale(0.8)',
          },
          '100%': { 
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateX(20px) scale(0.5)',
          }
        },
        soundWave: {
          '0%': { height: '3px' },
          '50%': { height: '12px' },
          '100%': { height: '3px' }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}