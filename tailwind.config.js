export default {
	content: ["./app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)", // css variable "var" used for dynamic data
				"primary-light": "var(--color-primary-light)",
				background: "white",
			},
		},
	},
	plugins: [],
}
