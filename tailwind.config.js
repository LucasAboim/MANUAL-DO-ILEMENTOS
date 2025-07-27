/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './components/**/*.{vue,js}',
        './pages/**/*.vue',
        './layouts/**/*.vue',
        './app.vue',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
