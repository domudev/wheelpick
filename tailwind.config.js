const { guessProductionMode } = require('@ngneat/tailwind');

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: {
        50: '#587885',
        100: '#4e6e7b',
        200: '#446471',
        300: '#3a5a67',
        400: '#30505d',
        500: '#264653',
        600: '#1c3c49',
        700: '#12323f',
        800: '#082835',
        900: '#001e2b',
      },
      accent: {
        50: '#5ccfc1',
        100: '#52c5b7',
        200: '#48bbad',
        300: '#3eb1a3',
        400: '#34a799',
        500: '#2a9d8f',
        600: '#209385',
        700: '#16897b',
        800: '#0c7f71',
        900: '#027567',
      },
      warn: '#E76F51',
    }),
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
