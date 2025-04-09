/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
import tailwindcssMotion from 'tailwindcss-motion';
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      screens:{
        'xxs': '375px',
        'xs':'480px',
        'sm':'576px',
        'md':'768px',
        'lg':'992px',
        'xl':'1240px'
      },
      fontFamily:{
        Montserrat: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [ 
    flowbite.plugin(),
    tailwindcssMotion,
  ],
}

