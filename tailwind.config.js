/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
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
          primary: "#5b21b6",
          "primary-focus": "#4c1d95",
          secondary: "#5b21b6",
          "secondary-content": "#ffffff",
          accent: "#36d399",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#e96d7b",
          secondary: "#242933",
          "secondary-content": "#ffffff",
          accent: "#36d399",
        },
      },
    ],
  },
};
