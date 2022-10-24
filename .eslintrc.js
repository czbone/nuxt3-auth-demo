module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true
	},
	plugins: ['vue', '@typescript-eslint', 'unused-imports'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'prettier'
	],
	rules: {
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/class-name-casing': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-console': 'error',
		'unused-imports/no-unused-imports': 'error',
		'vue/first-attribute-linebreak': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/singleline-html-element-content-newline': 'off',
	},
};
