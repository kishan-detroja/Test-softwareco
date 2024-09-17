/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public/**/*.{js,jsx,ts,tsx,html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textColor:{
        "txt-color": '#202224'
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'menu-item-bg':'#4880FF',
        'dashboard-bg':'#F5F6FA',
        'dashboard-dark-bg':'#1B2431',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
