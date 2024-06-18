/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baskervville: ["Baskervville", "serif"],
        inter: ["Inter", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
        basier: ["basier", "monospace"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      colors: {
        purple: "#100a16",
        white: "#fbf8f9",
        codeOrange: '#fa8231',
        codeGreen: '#649664',
        codePurple: '#c678dd',
        codeRed: '#f85149',
        codeBlue: "#9CDCFE",
        "dark-primary": "#111111",
        "text-primary": "#44566c",
        "dark-focus-border": "#FF6464",
        "dark-mobile-primary": "#1d1d1d",
        "light-bg": "#F8FBFB",
        "light-bg-secondary": "#fcf4ff",
        "light-bg-three": "#fff0f0",
        "light-bg-four": "#edf2f2",
        "light-bg-five": "#F3F6F6",
        "light-bg-six": "EDF2ED",
        "dark-bg": "#0D0D0D",
        "dark-bg-two": "#1c1c1c",
        "dark-bg-three": "#4D4D4D",
        "light-icon": "#F95054",
        "dark-border": "#212425",
        "dark-borde-secondary": "#333333",
        "dark-border-two": "#3D3A3A",
        "main-text": "#A6A6A6",
        "light-text": "#7B7B7B",
        "light-title": "#526377",
        "dark-text": "#b7b7b7",
        "modal-text": "#ef4060",
        "fb-icon": "#1773EA",
        "twitter-icon": "#1C9CEA",
        "linkedin-icon": "#0072b1",
        "light-border": "#B5B5B5",
        "light-border-two": "#E3E3E3",
        "focus-border-one": "rgb(81,133,212)",
        "focus-text-one": "#5185D4",
        "focus-border-two": "#CA56F2",
        "btn-primary": "#FA5252",
        "btn-secondary": "#DD2476",
        "btn-test": "rgb(250 82 82 / 0)",
        "icon-color-one": "#E93B81",
        "icon-color-two": "#6AB5B9",
        "icon-color-three": "#FD7590",
        "icon-color-four": "#C17CEB",
        "skill-bg-one": "#fcf0ff",
        "skill-bg-two": "#fefae0",
        "skill-bg-three": "#fff4f4",
        "skill-bg-four": "#ffe8f2",
        "skill-bg-five": "#effaff",
        "progress-bg-one": "#FF6464",
        "progress-bg-two": "#9272d4",
        "progress-bg-three": "#5185d4",
        "progress-bg-four": "#ca56f2",
        "edu-card-one": "#fff4f4",
        "edu-card-two": "#fff1fb",
        "exp-card-one": "#eef5fa",
        "exp-card-two": "#f2f4ff",
        "gradient-to": "#dd2476",
      },
      backgroundImage: {
        "home-bg": "url('/src/images/light-bg.jpg')",
        "close-light": "url('/src/images/close-light.jpg')",
        "home-bg-dark": "url('/src/images/dark-bg.jpg')",
        "close-dark": "url('/src/images/close-dark.png')",

        "bg-gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        'gradient-fade-black-right': 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #111111 100%)',
        'gradient-fade-black-left': 'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #111111 100%)',
      },
      animation: {
        fadeOut: "1s ease-in-out 4s fadeOut",
        fadeIn: "1s ease-in-out 0s fadeIn",
        move: "move 5s 1",
        blob: "blob 7s infinite",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        move: {
          "25%": {
            transform: 'translatey(-46px)'
          },
          "50%": {
            transform: 'translatey(-78px)'
          },
          "75%": {
            transform: 'translatey(-112px)'
          },
          "100%": {
            transform: 'translatey(20px)'
          },
        },
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
      }),
    },
  },
  plugins: [
    function plugin({ addUtilities }) {
      addUtilities({
        '.scroll-hide': {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Webkit-based browsers (Chrome, Safari and Opera) */
          "&::-webkit-scrollbar": {
            "display": "none",
          }
        },

        '.text-input': {
          "@apply block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-text-primary bg-transparent border-0 border-b-[2px] border-light-border appearance-none dark:text-white dark:border-dark-borde-secondary dark:focus:border-dark-focus-border focus:outline-none focus:ring-0 focus:border-dark-focus-border": {}
        },
        '.text-input-label': {
          "@apply peer-focus:font-medium absolute text-sm text-gray-500 dark:text-main-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-focus-border-two peer-focus:dark:text-dark-focus-border peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8": {}
        },
        '.card': {
          '@apply bg-card-bg rounded-3xl border border-card-border': {}
        },
        '.form-label': {
          '@apply font-semibold select-none': {}
        },
        '.basic-container': {
          '@apply bg-gray-100 rounded-xl': {}
        },
        '.click-container': {
          '@apply basic-container hover:bg-status-info hover:bg-opacity-10 cursor-pointer disabled:cursor-not-allowed': {}
        },
        '.outlined-container': {
          '@apply rounded-lg bg-gray-300 bg-opacity-40 border-dashed border-accent-900 border-2': {}
        },
        '.border-input-color': {
          '@apply border-primary-500 focus-within:border-primary-700 dark:border-primary-500 dark:focus-within:border-primary-300': {}
        },
        '.text-input-color': {
          '@apply text-gray-600 focus:text-black dark:text-white/50 dark:focus:text-white': {}
        },
        '.input-core': {
          '@apply text-input-color focus:outline-none caret-primary-700 dark:caret-primary-300': {}
        },

        '.w-full-mobile': {
          '@apply w-full tablet:max-w-md tablet:rounded-3xl': {}
        },

        '.p-button-comfy': {
          '@apply py-2 px-4': {}
        },
        '.p-button-compact': {
          '@apply py-1 px-3': {}
        },

        '.button-core': {
          '@apply transition font-semibold cursor-pointer select-none flex items-center hover:no-underline disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed focus:outline-none sm:focus:outline': {},
        },
        '.button-red-gradient': {
          '@apply button-core text-lg text-white transition-all ease-in-out duration-200 rounded-[35px] bg-gradient-to-r from-btn-secondary to-btn-primary hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary': {},
        },
        '.button-plain-accent': {
          '@apply button-core rounded-xl text-accent-700 hover:bg-accent-700 hover:bg-opacity-10': {},
        },
        /**
         * Poor experience using these environment variables. They weren't catching the space the
         * address bar took up on bottom b/c that just shifts the viewport, doesn't overlay it. Two 
         * different concepts. However in landscape mode its not uncommon to see some padding for
         * black navigation bar on the bottom.
         * @see https://webkit.org/blog/7929/designing-websites-for-iphone-x/
         */
        '.pb-safe': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.pt-safe': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.pl-safe': {
          'padding-left': 'env(safe-area-inset-left)',
        },
        '.pr-safe': {
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.mb-safe': {
          'margin-bottom': 'env(safe-area-inset-bottom)',
        },
        '.mt-safe': {
          'margin-top': 'env(safe-area-inset-top)',
        },
        '.ml-safe': {
          'margin-left': 'env(safe-area-inset-left)',
        },
        '.mr-safe': {
          'margin-right': 'env(safe-area-inset-right)',
        },
      })
    },
  ],
  darkMode: "class",
};
