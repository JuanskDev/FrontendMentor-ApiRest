/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: " #202c37",
        secondary: "#2b3743",
        lightMode: "#fafafa",
        lightModeInput: "#ffffff"
      },
      screens: {
        mini: "400px",
        sm: "695px",
        lg: "1150px",
        xl: "1400px",
      },
      plugins: [],
    },
  },
};
