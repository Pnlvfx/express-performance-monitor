import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  eslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintConfigPrettier,
  sonarjs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'prettier/prettier': [
        1,
        {
          trailingComma: 'all',
          singleQuote: true,
          semi: true,
          printWidth: 150,
          tabWidth: 2,
        },
      ],
      'no-var': 'error',
      semi: 'error',
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multi-spaces': 'error',
      'no-empty-function': 'error',
      'no-floating-decimal': 'error',
      'no-implied-eval': 'error',
      'no-lone-blocks': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-new': 'error',
      'no-octal-escape': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'no-unsafe-negation': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/catch-error-name': 'off',
    },
  },
);
