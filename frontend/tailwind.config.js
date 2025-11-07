/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colours: {
        primary:  "#6C9BCF",
        primaryD: "#5B8FB9",
        secondary:"#F5F8FA",
        secondaryD:"#1C1F2A",
        accent:   "#B3E5FC",
        accentD:  "#66B2FF",
        ink:      "#2E2E2E",
        inkD:     "#EAEAEA",
        success:  "#A5D6A7",
        successD: "#388E3C",
        error:    "#EF9A9A",
        errorD:   "#E57373",
      },
    },
  },
  plugins: [],
}

