/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem", // Extra extra small font size
      },
      backdropFilter: {
        none: "none",
        blur: "blur(30px)", // Blur filter
      },
      rotate: {
        8: "8deg",
        9: "-8deg",
      },
      colors: {
        "knap-10": "rgba(54, 69, 77, 0.1)",
        "bono-10": "#36454D",
        "bono-50": "#384455",
        hovercolor: "#ff0000",
        "taupe-10": "#BBD4E0",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        Konnect: ['"Konnect"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" }, // Move across the viewport width
        },
      },
      animation: {
        move: "move 15s linear infinite",
      },
    },
  },
  variants: {},
  plugins: [],
};
