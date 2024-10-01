/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        sofia: ["Sofia Sans Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
