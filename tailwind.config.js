/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'], // 这个真jb重要
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				react: {
					nav: '#20232a',
					banner: '#282c34',
				},
			},
			spacing: {
				100: '28rem',
			},
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
	},
	plugins: [],
};
