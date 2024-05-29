import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,ts}', // Indica a Tailwind que procese todos los archivos HTML y TypeScript en el directorio src
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#47003e',
          DEFAULT: '#3490dc',
          dark: '#631558',
        },
        secondary: {
          light: '#fff',
          DEFAULT: '#ffeb3b',
          dark: '#f59e0b',
        },
        accent: {
          light: '#d1f7c4',
          DEFAULT: '#38c172',
          dark: '#1f9d55',
        },
        neutral: {
          light: '#f5f5f5',
          DEFAULT: '#9e9e9e',
          dark: '#616161',
        },
      },
    },
  },
  plugins: [],
};

export default config;
