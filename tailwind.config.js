/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bubble1: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100px)' },
        },
        bubble2: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-120px)' },
        },
        bubble3: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-150px)' },
        },
        bubble4: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-80px)' },
        },
        bubble5: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-130px)' },
        },
        bubble6: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-170px)' },
        },
        bubble7: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-90px)' },
        },
        bubble8: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-110px)' },
        },
        bubble9: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-140px)' },
        },
        bubble10: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-160px)' },
        },
      },
      animation: {
        bubble1: 'bubble1 25s linear infinite, sideWays 2s ease-in-out infinite alternate',
        bubble2: 'bubble2 22s linear infinite, sideWays 3s ease-in-out infinite alternate',
        bubble3: 'bubble3 28s linear infinite, sideWays 2s ease-in-out infinite alternate',
        bubble4: 'bubble4 20s linear infinite, sideWays 2s ease-in-out infinite alternate',
        bubble5: 'bubble5 29s linear infinite, sideWays 4s ease-in-out infinite alternate',
        bubble6: 'bubble6 21s linear infinite, sideWays 2s ease-in-out infinite alternate',
        bubble7: 'bubble7 20s linear infinite, sideWays 4s ease-in-out infinite alternate',
        bubble8: 'bubble8 22s linear infinite, sideWays 3s ease-in-out infinite alternate',
        bubble9: 'bubble9 29s linear infinite, sideWays 2s ease-in-out infinite alternate',
        bubble10: 'bubble10 26s linear infinite, sideWays 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
