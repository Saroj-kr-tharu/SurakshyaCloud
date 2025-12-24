/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./web/views/**/*.ejs",
    "./web/public/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}