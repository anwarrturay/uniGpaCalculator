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
        'xs':'360px',
        'sm':'640px',
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

