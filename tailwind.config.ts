import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        nav: "#13293D",
        primary: "#112941",
      },
      colors: {
        primary: "#5fd4ee",
        secondary: "#618eb7",
      },
    },
  },
  plugins: [],
} satisfies Config;
