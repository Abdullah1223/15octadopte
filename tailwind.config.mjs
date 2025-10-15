
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        
      },
      animation:{
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        
        'fade-in': 'fadeIn var(--fade-duration, 3s) ease-out',
       'slide-up':'slideUp var(--slider-duration,0.5s) ease-out',
      'slide-down': 'slideDown var(--slider-duration,1s) ease-out',
      'slide-down-sm': 'slideDownSm var(--slider-duration,1s) ease-out',
      'scale-low':'scaleLow var(--scale-duration,1s) ease out'
      }, 
      

      keyframes: {
        slideUp:{
          '0%':{transform:'translateY(50%)'},
          '100%':{transform:'translateY(0)'},
        },
        slideDown: {
          '0%': { transform: 'translateY(-60%) scale(0)' },
          '100%': { transform: 'translateY(0) scale(100%)' },
        },
        scaleLow: {
          '0%':{transform:'scale(100%)'},
          '100%':{transform:'scale(0)'},
        },
        slideDownSm: {
          '0%': { transform: 'translateY(-100%) scale(0)' },
          '100%': { transform: 'translateY(0) scale(100%) ' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
