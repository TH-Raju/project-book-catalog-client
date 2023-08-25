/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancingScript: ['Dancing Script', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },

  plugins: [require("daisyui")],
};
