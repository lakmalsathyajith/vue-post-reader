/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 0.5s ease-in-out',
      },
      keyframes: {
        bounce: {
          '0% 100%': { transform: 'translateY(0px)' },
          '10% 90%': { transform: 'translateY(-5px)' },
          '25% 75%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

    },
  },
  plugins: [],
};
