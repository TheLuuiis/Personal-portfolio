import sass from 'rollup-plugin-sass';

export default {
	input: 'src/index.js',
	output: {
		file: 'public/bundle.js',
		format: 'cjs',
	},
	plugins: [
		sass({
		  output: 'public/bundle.css'
		})
	  ]
};
