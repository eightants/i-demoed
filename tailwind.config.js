module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xl: { max: "1580px" },
      lg: { max: "1200px" },
      md: { max: "900px" },
      sm: { max: "720px" },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
