/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      screens:{
        'xs':'468px',
        'sm':'640px',
        'md':'768px',
        'lg':'992px',
        'xl':'1240px'
      },
    },
  },
  plugins: [ flowbite.plugin()],
}

