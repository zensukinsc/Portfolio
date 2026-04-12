/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Serif 4', 'ui-serif', 'Georgia', 'serif'],
        serif: ['Source Serif 4', 'ui-serif', 'Georgia', 'serif'],
        inter: ['Source Serif 4', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        dark: '#121212',
      },
      animation: {
        'marquee-left': 'marquee-left 28s linear infinite',
        'marquee-right': 'marquee-right 28s linear infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
