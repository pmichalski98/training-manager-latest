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
        setRow: "#1D3E5E",
        bgInput: "#5FD4EE",
        card: "#1B3A56",
        primaryText: "#5fd4ee",
      },
      colors: {
        nav: "#13293D",
        primary: "#5fd4ee",
        secondary: "#618eb7",
        lightCyan: "#B6D8F8",
        fadedBlue: "#6F8FAC",
      },
    },
  },
  plugins: [],
} satisfies Config;
