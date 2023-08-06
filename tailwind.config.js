const defaultConfig = require('tailwindcss/defaultConfig')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		},
		colors:{
			"background": "#1E1E1E",
			"primary": "#FDC92E",
			"white": "#fff"
		}
	},
  plugins: [],
}

