import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        // primary: "#7ECBFF",
      },
      backgroundColor: {
        nav: "#13293D",
        primary: "#162F46",
        primaryText: "#5fd4ee",
      },
      colors: {
        nav: "#13293D",
        primary: "#5fd4ee",
        secondary: "#618eb7",
      },
    },
  },
  plugins: [],
} satisfies Config;
