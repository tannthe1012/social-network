module.exports = {
	plugins: ["import"],
	rules: {
		'no-script-url': 0,
	},
	globals: {
		document: true,
		window: true,
	},
	env: {
		browser: true,
	},
	parser: "babel-eslint"
};
