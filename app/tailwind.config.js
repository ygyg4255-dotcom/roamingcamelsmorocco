/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          navy: "#404D72",
          terracotta: "#99403D",
          dark: "#24140F",
          dark2: "#231510",
          cream: "#E3E5DB",
          sand: "#D8CDAF",
          creamLight: "#E4E6DB",
          green: "#2F5A47",
          gold: "#EBC766",
          grayBg: "#F6F6F6",
        }
      },
      fontFamily: {
        sans: ["'Bernina Sans Regular'", "'Bernina Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        serif: ["'VioletJWSerif-Regular'", "'orpheuspro'", "Georgia", "serif"],
      },
      maxWidth: {
        'site': '1140px',
        'wide': '1290px',
      }
    },
  },
  plugins: [],
}
