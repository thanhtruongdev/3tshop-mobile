// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
	expoConfig,
	{
		ignores: ['dist/*', 'node_modules/*', '.expo/*', '**/build/**', '**/ios/**', '**/android/**', '**/assets/**', '**/fastlane/**'],
	},
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		rules: {
			'no-unused-vars': 'warn',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'prettier/prettier': [
				'warn',
				{
					printWidth: 140,
					tabWidth: 2,
					useTabs: true,
					singleQuote: true,
					semi: true,
					trailingComma: 'all',
					bracketSpacing: true,
					arrowParens: 'always',
					bracketSameLine: false,
					endOfLine: 'lf',
				},
			],
		},
	},
]);
