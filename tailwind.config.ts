import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "sm": "300px",

      "md": "768px",

      "lg": "1024px",

      "xl": "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
      keyframes: {
        rainbow: {
          "0%": { color: "#ff0000" }, // Red
          "10%": { color: "#ff7f00" }, // Orange
          "20%": { color: "#ffff00" }, // Yellow
          "30%": { color: "#7fff00" }, // Chartreuse
          "40%": { color: "#00ff00" }, // Green
          "50%": { color: "#00ff7f" }, // Spring Green
          "60%": { color: "#00ffff" }, // Cyan
          "70%": { color: "#007fff" }, // Azure
          "80%": { color: "#0000ff" }, // Blue
          "90%": { color: "#4b0082" }, // Indigo
          "100%": { color: "#9400d3" }, // Violet
        },
      },
      animation: {
        rainbow: "rainbow 10s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
