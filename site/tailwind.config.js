/** @type {import('tailwindcss').Config} */

const assetLink = (link) => `url("/${link}")`

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: "#b45331",
        darkRed: "#933515",
        yellow: "#eaa749",
        darkYellow: "#bf871f",
        brown: "#B47A31",
        themeGray: "#82888d"
      },
      animation: {
        blob: "blob 7s infinite",
      },
      fontFamily: {
        'title': ['title', 'sans-serif'],
        'lato': ['Lato', 'sans-serif']
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      textShadow: {
        'black-border': "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;",
        'black-border-bottom': '0px 0 black, 0 2px black, 0px 0 black, 0 3px black;',
        'black-border-bottom-thin': '0px 0 black, 0 1px black, 0px 0 black, 0 1px black;',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
