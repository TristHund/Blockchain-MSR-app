/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/routes/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f4',
          200: '#e5e5e5',
          300: '#d6d6d6',
          400: '#b8b8b8',
          500: '#9a9a9a',
          600: '#7b7b7b',
          700: '#5c5c5c',
          800: '#3d3d3d',
          900: '#1f1f1f',
        },
        accent: {
          50: '#f2fdfd',
          100: '#e6fafa',
          200: '#bff4f4',
          300: '#99eeee',
          400: '#4ddfdf',
          500: '#00d0d0',
          600: '#00bbbb',
          700: '#009999',
          800: '#007777',
          900: '#005e5e',
        },
      },
    },
  },
  plugins: [],
};
