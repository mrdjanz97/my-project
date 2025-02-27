/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'false',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      container: {
        padding: '2rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        jsg: {
          primary: '#F1F3F5',
          secondary: '#D1D3D4',
          accent: '#6996F5',
          neutral: '#fff',
          'base-100': '#ffffff',
          'green-500': '#6CCB85',
          'red-500': '#FF6A62',
          'black-500': '#303030',
          'gray-500': '#5D5D5D',
          'base-200': '#FDFDFD',
          'base-300': '#F1F3F5',
        },
      },
      'light',
    ],
  },
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      addComponents({
        '.btn': {
          border: 'none !important',
          outline: 'none !important',
        },
      });
    },
  ],
};
