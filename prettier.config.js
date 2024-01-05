/** @type {import("prettier").Config} */
const config = {
  semi: false,
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
  ],
  customAttributes: ["className"],
  customFunctions: ["classNames"],
  printWidth: 70,
}

module.exports = config
