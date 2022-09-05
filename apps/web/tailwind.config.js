/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: { heart: "heartbeat 1s infinite" },
      keyframes: {
        heartbeat: {
          "0%": { transform: "scale(0.75)" },
          "20%": { transform: "scale(1)" },
          "40%": { transform: "scale(0.75)" },
          "60%": { transform: "scale(1)" },
          "80%": { transform: "scale(0.75)" },
          "100%": { transform: "scale(0.75)" },
        },
      },
    },
  },
  plugins: [],
};

// eslint-disable-next-line no-undef
module.exports = tailwindConfig;
