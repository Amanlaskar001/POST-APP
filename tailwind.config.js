/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dBlue: "#092635",
        dGreen: "#1B4242",
        lGreen: "#5C8374",
        Green: "#9EC8B9",
      },
    },
  },
  plugins: [],
};
