module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'airbnb-typescript-prettier',
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'react',
	],
	'rules': {
		'prettier/prettier': 'warn',
		'import/prefer-default-export': "off",
		'import/no-default-export': "error",
		'jsx-a11y/click-events-have-key-events': "off",
		'react/jsx-props-no-spreading': "off",
		'@typescript-eslint/explicit-module-boundary-types': "off",
		'@typescript-eslint/no-explicit-any': "off",
		'no-new': "off",
		'react-hooks/exhaustive-deps': "off",
	}
};