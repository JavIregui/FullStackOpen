module.exports = [
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				browser: true,
				es2020: true,
			},
		},
		ignores: ['dist', '.eslintrc.cjs'],
		plugins: {
			react: require('eslint-plugin-react'),
			'react-hooks': require('eslint-plugin-react-hooks'),
			'react-refresh': require('eslint-plugin-react-refresh'),
		},
		rules: {
			'indent': ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'never'],
			'eqeqeq': 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { 'before': true, 'after': true }],
			'no-console': 0,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 0,
			'no-unused-vars': 0,
		},
	},
	{
		files: ['**/*.jsx'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: '18.2',
			},
		},
	},
]