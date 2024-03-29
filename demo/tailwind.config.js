/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "black": "#000000",

      "dark": "#04020D",
      "darkGrey": "#211F28",
      // "darkGrey": "#2E3032",
      "darkBlue": "#304C75",
      "lightBlue": "#7F9EBE",
      "light": "#EBF0F4"
    },
  },
  plugins: [],
};
