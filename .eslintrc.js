module.exports = {
	parser: "@typescript-eslint/parser",

	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},

	plugins: ["jsx-a11y"],

	settings: {
		react: {
			pragma: "h",
		},
	},

	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
	],

	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": [1, { varsIgnorePattern: "^h$" }],
	},
};
