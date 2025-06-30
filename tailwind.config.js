/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue"
	],
	theme: {
		extend: {
			colors: {
				storefront: {
					black: "#0A0A0A",
					white: "#FFF9F9",
					special: "#D6837E",
					gray: "#D9D9D9",
					yellow: "#FCBA03",
				},
				dashboard: {
					text_light: "#f3f5f4",
					text_dark: "#0c0a0b",
					background_light: "#dcdcdc",
					background_dark: "#232323",
					special_gray: "#575757",
				},
			},
		},
	},
	plugins: [],
};
