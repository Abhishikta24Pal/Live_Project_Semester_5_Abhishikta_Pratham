/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- SereneSpace (mockup) palette ---
        ssBg:        "#EAF4FF",   // page background (very light blue)
        ssNavy:      "#1F4B6E",   // headings / main text
        ssText:      "#2C5376",   // body text
        ssPrimary:   "#2E6FAE",   // buttons / key accents
        ssPrimaryH:  "#265E94",   // button hover
        ssIcon:      "#2A6AA6",   // icon stroke
        ssCardBg:    "#FFFFFF",   // cards
        ssCardBrd:   "#D9E8F6",   // card border
        // optional dark counterparts
        ssBgD:       "#101720",
        ssNavyD:     "#E6EEF7",
        ssCardBgD:   "#1B2330",
        ssCardBrdD:  "#2A3547",
      },
      boxShadow: {
        ss: "0 6px 16px rgba(31, 75, 110, 0.08)", // soft blue-ish shadow
      },
      borderRadius: {
        xl2: "1.25rem",
      }
    },
  },
  plugins: [],
};

