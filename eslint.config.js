import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'README.md', '.next/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next': nextPlugin,
      sonarjs: sonarjsPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines': [
        'error',
        {
          max: 202,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      ...sonarjsPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    plugins: {
      jest: jestPlugin,
      'testing-library': testingLibraryPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      'jest/expect-expect': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-container': 'error',
      'testing-library/no-debugging-utils': 'error',
      'no-undef': 'off',
      'max-lines': 'off',
    },
  },
];
