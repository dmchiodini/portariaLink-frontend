import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import sonarjs from 'eslint-plugin-sonarjs';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ...sonarjs.configs.recommended,
    plugins: {
      jsxA11y,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'jsx-a11y/no-aria-hidden-on-focusable': 2,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-ambiguous-text': [
        2,
        {
          'words': [
            'Saiba mais',
            'Clique aqui',
            'aqui'
          ]
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used',
          'argsIgnorePattern': '^_'
        }
      ],
      'jsx-a11y/no-noninteractive-tabindex': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'import/no-anonymous-default-export': 'off'
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ]
  }
];

export default eslintConfig;
