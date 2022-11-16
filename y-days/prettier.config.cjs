/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: "always",
};

module.exports = config;
