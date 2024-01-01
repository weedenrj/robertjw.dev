/** @type {import('tailwindcss').Config} */
const Colors = require('./constants/Colors.json')

const assetLink = (link) => `url("/${link}")`

const safelist = [
  // SIZES
  ...[...Array(200)].map((_, i) => `w-${i + 1}`),
  ...[...Array(200)].map((_, i) => `h-${i + 1}`),
  // GRID
  ...[...Array(200)].map((_, i) => `grid-cols-${i + 1}`),
  // MISC
  // COLORS
  ...Object.keys(Colors.accent).map(accent => `bg-accent-${accent} border-accent-${accent}`)
]


module.exports = {
  safelist,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: { ...Colors },
      screens: {
        'xs': '300px'
      },
      height: {
        '18': '72px',
        '38': '152px',
        '46': '184px'
      },
      width: {
        '18': '72px',
        '38': '152px',
        '46': '184px'
      },
      minWidth: {
        '18': '72px',
        '38': '152px',
        '46': '184px'
      },
      minHeight: {
        '18': '72px',
        '38': '152px',
        '46': '184px'
      },
      animation: {
        blob: "blob 7s infinite",
      },
      fontFamily: {
        'title': 'var(--title-font)',
        'lato': 'var(--body-font)'
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
      backgroundImage: {
        'sketch': assetLink("RedShedSketchDark.webp"),
        'hero': assetLink('pngs/pouring-beer.png')
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
