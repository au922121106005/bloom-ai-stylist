/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        // 🌸 Floral Theme Colors

        blush: '#F8D7DA',
        rose: '#E8AEB7',
        lavender: '#CDB4DB',
        sage: '#A3B18A',
        cream: '#FFF8F2',
        beige: '#EEDFCC',
        ivory: '#FAF9F6',
        mocha: '#8D6E63',
        gold: '#D4A373',
        forest: '#5F6F52',

      },

    },
  },

  plugins: [],
}