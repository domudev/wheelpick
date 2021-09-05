const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        blueGray: colors.blueGray,
        emerald: colors.emerald,
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
