/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f8',
          100: '#b3e6e8',
          200: '#80d5d8',
          300: '#4dc4c8',
          400: '#1ab3b8',
          500: '#017E84',
          600: '#016b70',
          700: '#01585c',
          800: '#014548',
          900: '#013234',
        },
        secondary: {
          50: '#f3eef2',
          100: '#daced9',
          200: '#c1aec0',
          300: '#a88ea7',
          400: '#8f6e8e',
          500: '#5D3653',
          600: '#4f2e47',
          700: '#41263b',
          800: '#331e2f',
          900: '#251623',
        },
      },
    },
  },
  plugins: [],
};
