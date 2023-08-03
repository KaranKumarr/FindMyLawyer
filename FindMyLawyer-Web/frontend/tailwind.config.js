const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '3xl': "1920px",
      ...defaultTheme.screens
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
        '3xl': '7rem'
      },
    },
    extend:
    {
      fontFamily: {
        'logo': ['Figtree', 'sans-serif']
      },
      colors: {
        'primary': '#9FC131',
        'primary-400': '#B7CC70',
        'primary-600': '#768F24',
        'primary-700': '#374211',
        'primary-800': '#3B4224',
        'secondary-a': '#9230C2',
        'secondary-b': '#510675',
        'neutral': '#FFFFF0',
        'neutral-contrast': '#353935',
        'exception': '#FF484E',
        'gold': '#FF9529'
      },
    },
  },
  plugins: [],
};