/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1512CB'
      },
      fontFamily: {
        inter: ['Inter', 'san-serif'],
      }
    },
  },
  plugins: [],
}
