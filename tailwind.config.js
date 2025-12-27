/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E64A19',
          light: '#FF8A65',
        },
        secondary: {
          DEFAULT: '#004E89',
          dark: '#003366',
          light: '#0055A4',
        },
        accent: '#F7B32B',
        success: '#00A86B',
        warning: '#FFA500',
        error: '#D90000',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      spacing: {
        'nav-height': '64px',
        'bottom-nav-height': '64px',
      },
      zIndex: {
        'nav': '1000',
        'side-menu': '2000',
        'overlay': '1999',
        'bottom-nav': '999',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }
  ],
}
