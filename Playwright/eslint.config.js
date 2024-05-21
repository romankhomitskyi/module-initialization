import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['**/*.js', 'node_modules/', 'playwright-report/'],
	},
	eslint.configs.recommended,

	{
		languageOptions: {
			globals: {
				window: 'readonly',
				global: 'writable',
				document: 'readonly',
				console: 'readonly',
				process: 'readonly',
				'Buffer': 'readonly',
				setTimeout: 'readonly',
			},
		},
		rules: {
			'no-unused-vars': 'off',
		},
	},

	{
		files: ['**/*.ts', '*.ts'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: true,
			},
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-inferrable-types': 'warn',
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'args': 'all',
					'argsIgnorePattern': '^_',
					'caughtErrors': 'all',
					'caughtErrorsIgnorePattern': '^_',
					'destructuredArrayIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
					'ignoreRestSiblings': true,
				},
			],
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ 'overrides': { 'accessors': 'off', 'constructors': 'no-public' } },
			],
			'@typescript-eslint/ban-types': [
				'error',
				{
					'types': {
						'Object': {
							'message': 'Avoid using the `Object` type. Did you mean `object`?',
						},
						'Function': {
							'message':
								'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
						},
						'Boolean': {
							'message': 'Avoid using the `Boolean` type. Did you mean `boolean`?',
						},
						'Number': {
							'message': 'Avoid using the `Number` type. Did you mean `number`?',
						},
						'String': {
							'message': 'Avoid using the `String` type. Did you mean `string`?',
						},
						'Symbol': {
							'message': 'Avoid using the `Symbol` type. Did you mean `symbol`?',
						},
					},
				},
			],
		},
	},
	{
		plugins: {
			playwright: playwright,
		},
		rules: {
			'playwright/no-wait-for-selector': 'error',
			'playwright/expect-expect': 'off',
			'playwright/no-skipped-test': 'off',
			'playwright/no-page-pause': 'error',
			'playwright/no-conditional-in-test': 'off',
		},
	}
);
