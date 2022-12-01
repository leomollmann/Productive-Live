/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'dimgray',
        contrast: 'white',
        blue: '#3C4F6E',
        red: '#B20B0B',
        green: '#489E3A',
      },
      fontFamily: {
        'primary': 'monospace',
      },
    },
  },
  plugins: []
}
