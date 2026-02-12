/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        allura: ["Allura", "serif"],
        poppins: ["Poppins", "serif"],
        pixel: ["Press Start 2P", "cursive"],
      },
      colors: {
        pink: {
          light: "#FFB6D9",
          button: "#FF1493",
          dark: "#FF69B4",
        },
      },
      boxShadow: {
        pixel: "8px 8px 0px rgba(0, 0, 0, 0.3)",
        "pixel-hover": "4px 4px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
