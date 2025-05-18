/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#F2EFEA',
          light: '#f7f5f2',
          dark: '#e8e4dd'
        },
        coral: {
          DEFAULT: '#FC7753',
          light: '#fd9477',
          dark: '#fb5a2f'
        },
        tiffany: {
          DEFAULT: '#66D7D1',
          light: '#8ce0dc',
          dark: '#40cec6'
        },
        violet: {
          DEFAULT: '#403D58',
          light: '#504c6e',
          dark: '#302e42'
        },
        straw: {
          DEFAULT: '#DBD56E',
          light: '#e3de8e',
          dark: '#d3cc4e'
        }
      }
    },
  },
  plugins: [],
};