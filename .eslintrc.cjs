/** @type {import("eslint").Linter.Config} */

const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['isaacscript', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './cli/tsconfig.eslint.json', './cli/dist/index.js'],
  },
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',

    'isaacscript/complete-sentences-jsdoc': 'warn',
    'isaacscript/format-jsdoc-comments': 'warn',
  },
};

module.exports = config;
