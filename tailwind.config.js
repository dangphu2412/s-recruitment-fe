// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');
//https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    variables: {
      'header-height': '12rem',
      'footer-height': '6rem'
    },
    colors: {
      success: 'var(--bs-success)',
      primary: 'var(--bs-primary)',
      disable: 'var(--bs-gray)',
      white: 'var(--bs-white)',
      black: 'var(--bs-gray-900)',
      gray: 'var(--bs-gray-900)',
      body: 'var(--bs-body-color)',
      dark: 'var(--bs-dark)'
    }
  },
  plugins: []
};
