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
<<<<<<< HEAD
        'xxs': '360px',
=======
        'xxs': '375px',
>>>>>>> 74841787ab085077067144e2b570e3649c0b5050
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

