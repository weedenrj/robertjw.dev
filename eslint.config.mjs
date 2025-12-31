import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['**/.astro/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      'no-useless-rename': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportNamespaceSpecifier",
          message: 'import * syntax is not allowed. Use named imports instead.',
        },
        {
          selector: "Literal[value='use client']",
          message: "'use client' is a Next.js directive and has no effect in Astro. Remove it and use client:* directives in .astro files instead.",
        },
        {
          selector: "Literal[value=\"use client\"]",
          message: "'use client' is a Next.js directive and has no effect in Astro. Remove it and use client:* directives in .astro files instead.",
        },
      ],
    },
  },
]
