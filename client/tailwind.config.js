/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:false,
  theme: {
    extend: {
      fontFamily: {
        primaryFont: ["Nunito", "serif"],
      },
      colors: {
        primary: "#10b981",
        primaryDark: "#059669",
        primaryLight: "#a7f3d0",
        darkHard: "#111827",
      },
      keyframes: {
        bumpLight: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        bumpHard: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.9)" },
          "30%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        bumpInfinite: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        bumpLight: "bumpLight .5s ease-out",
        bumpHard: "bumpHard 300ms ease-out",
        bumpInfinite: "bumpInfinite 1s infinite"
      },
    },
  },
  plugins: [],
};
