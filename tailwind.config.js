/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        rad: {
          'primary': '#92e569',
          'secondary': '#5ef9ff',
          'accent': '#c3f29b',
          'neutral': '#29243d',
          'base-100': '#212b45',
          'info': '#1dabe7',
          'success': '#53e9d7',
          'warning': '#f2b55a',
          'error': '#e52461',
        }
      }
    ],
    darkTheme: 'dark',
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography"),
  ],
}
