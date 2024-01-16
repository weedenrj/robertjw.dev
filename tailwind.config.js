/** @type {import('tailwindcss').Config} */
const Colors = require("./constants/Colors.json")

const assetLink = (link) => `url("/${link}")`

const safelist = [
  // SIZES
  ...[...Array(200)].map((_, i) => `w-${i + 1}`),
  ...[...Array(200)].map((_, i) => `h-${i + 1}`),
  // GRID
  ...[...Array(200)].map((_, i) => `grid-cols-${i + 1}`),
  // MISC
  // COLORS
  ...Object.keys(Colors.accent).map(
    (accent) => `bg-accent-${accent} border-accent-${accent}`,
  ),
]

module.exports = {
  safelist,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { ...Colors },
      screens: {
        xs: "300px",
        "3xl": "2560px",
      },
      fontSize: {
        xxs: ["10px", "14px"],
      },
      height: {
        18: "72px",
        38: "152px",
        46: "184px",
        124: "570px",
      },
      width: {
        18: "72px",
        38: "152px",
        46: "184px",
        124: "570px",
      },
      minWidth: {
        18: "72px",
        38: "152px",
        46: "184px",
        124: "570px",
      },
      minHeight: {
        18: "72px",
        38: "152px",
        46: "184px",
        124: "570px",
      },
      animation: {
        blob: "blob 7s infinite",
        pop: 'buttonPop 0.25s ease-out',
      },
      fontFamily: {
        title: "var(--title-font)",
        lato: "var(--body-font)",
      },
      scale: {
        '102': '1.025'
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
        buttonPop: {
          '0%': { transform: 'scale(.90)' },
          '40%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.0)' }
        }
      },
      backgroundImage: {
        sketch: assetLink("RedShedSketchDark.webp"),
        heroMobile: assetLink("heroMobile.webp"),
        heroDesktop: assetLink("heroDesktop.webp"),
        about: assetLink("bar.webp"),

        "fade-left":
          "linear-gradient(90deg, #000 25.14%, rgba(0, 0, 0, 0.00) 84.96%)",
        "fade-right":
          "linear-gradient(-90deg, #000 25.14%, rgba(0, 0, 0, 0.00) 84.96%)",
      },
      textShadow: {
        "black-border":
          "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;",
        "black-border-bottom":
          "0px 0 black, 0 2px black, 0px 0 black, 0 3px black;",
        "black-border-bottom-thin":
          "0px 0 black, 0 1px black, 0px 0 black, 0 1px black;",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
}
