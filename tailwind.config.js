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
        gray: {
          1: '#CECED2',
          2: '#8E8E93',
          3: '#636366',
          4: '#48484A',
          5: '#363638',
          6: '#2C2C2E',
          7: '#1C1C1E',
          8: '#0C0B0B',
        },
      },
      fontFamily: {
        'primary': 'monospace',
      },
    },
  },
  plugins: []
}
