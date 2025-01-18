/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
      "./assets/components/**/*.{js,vue,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'smoky-black': '#1112OD',
          'olive-drab': '#565449',
          'bone': '#D8CFBC',
          'floral-white': '#FFFBF4',
        },
        fontFamily: {
          lora: ['Lora', 'sans-serif'],
        },
        screens: {
          'xs':'376px',
          'sm':'576px',
          'lg':'960px',
          'xl':'1200px',
          '1.5xl':'1600px',
          '2xl':'1920px',
        }
      },
    },
    plugins: [],
  }