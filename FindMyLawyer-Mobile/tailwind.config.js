/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
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
}

