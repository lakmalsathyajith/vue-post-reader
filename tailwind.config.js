/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-import-module-exports
import { colors as defaultColors } from 'tailwindcss/defaultTheme';

const colors = {
  ...defaultColors,
  ...{
    white: '#FFFFFF',
    black: '#000000',
    blue: '#1fb6ff',
    green: '#13ce66',
    yellow: '#ffc82c',
    homeBg: '#F4F4F4',
    'gray-dark': '#273444',
    gray: '#8492a6',
    'gray-light': '#d3dce6',
    'reset-button': '#2DFF7E',
    'reset-button-text': '#334B3F',
  },
};

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
    colors,
  },
  plugins: [],
};
