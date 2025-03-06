export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        gradientMove: "gradientMove 5s ease infinite",
        // 5s duration, infinite loop
      },
    },
  },
  plugins: [],
};
