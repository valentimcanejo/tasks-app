/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./pages/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#47294c",
          //"primary-focus": "#47294c",
          secondary: "#47294c",
          "secondary-content": "#ffffff",
          accent: "#36d399",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#BD5C64",
          secondary: "#242933",
          "secondary-content": "#ffffff",
          accent: "#36d399",
        },
      },
    ],
  },
};
