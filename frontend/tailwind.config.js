/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1320",
        slate: "#1a2433",
        mist: "#f4f6f9",
        brand: "#1f7a8c",
        accent: "#f2c14e",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      boxShadow: {
        card: "0 20px 45px -25px rgba(15, 23, 42, 0.4)",
      },
    },
  },
  plugins: [],
};
