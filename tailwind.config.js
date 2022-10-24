const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('daisyui')
  ],
  theme: {
    extend: {
      // overwrite configuration
      colors: {
          emerald: colors.emerald,
          violet: colors.violet,
          rose: colors.rose,
          blue: colors.indigo,
      }
    }
  }
}