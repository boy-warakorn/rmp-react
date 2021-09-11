module.exports = {
  important: true,
  purge: {
    mode: "all",
    content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "background-dark": "#363740",
      },
    },
  },
  screens: {
    fold: { max: "280px" },
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fontSize: {
    heading1: "1.5rem",
    heading2: "1.125rem",
    heading3: "0.875rem",
    default: "1rem",
    sm: "0.875rem",
    xs: "0.625rem",
  },
  borderRadius: {
    xs: "0.25rem",
    default: "0.312rem",
    body: "0.75rem",
    sm: "0.625rem",
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
