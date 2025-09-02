/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        folks: ["ThatsFontFolks", "sans-serif"],
        arialnarrow7: ["'Arial Narrow'", "Arial", "sans-serif"], // ajout
      },
    },
  },
  plugins: [],
};
