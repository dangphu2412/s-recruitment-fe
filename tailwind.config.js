// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');
//https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/@zach.codes/react-calendar/dist/**/*.js'
  ],
  theme: {
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 1px 1px #ffffffe6, 0 20px 27px #0000000d'
      }
    },
    variables: {
      'header-height': '12rem',
      'footer-height': '6rem'
    },
    colors: {
      ...colors,
      success: 'var(--bs-success)',
      primary: 'var(--bs-primary)',
      disable: 'var(--bs-gray)',
      white: 'var(--bs-white)',
      black: 'var(--bs-gray-900)',
      gray: 'var(--bs-gray-900)',
      body: 'var(--bs-body-color)',
      dark: 'var(--bs-dark)',
      sprimary: '#fa4210'
    }
  },
  plugins: []
};
