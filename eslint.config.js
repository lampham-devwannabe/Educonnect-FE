import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import tslint from '@typescript-eslint/eslint-plugin/configs/recommended';

export default defineConfig({
  // Global ignores
  ignores: ['dist', 'node_modules', 'build', '.git', '.github', '.vscode'],

  // All files setup
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    'react': reactPlugin,
    'import': importPlugin,
    'jsx-a11y': jsxA11y,
    'react-hooks': reactHooks,
  },

  linterOptions: {
    reportUnusedDisableDirectives: true,
  },

  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },

  rules: {
    ...js.configs.recommended.rules,
    ...tslint.rules,
  },

  // Configurations for different file types
  configs: [
    // JS/TS files
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          project: './tsconfig.json',
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {},
        },
      },
      rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',

        // React rules
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-no-target-blank': 'error',

        // General rules
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': 'error',
        'no-var': 'error',
        'eqeqeq': ['error', 'always', { null: 'ignore' }],

        // Accessibility
        'jsx-a11y/anchor-is-valid': 'warn',
      },
    },

    // React JSX/TSX files
    {
      files: ['**/*.{jsx,tsx}'],
      rules: {
        ...reactHooks.configs['recommended-latest'].rules,
        ...reactRefresh.configs.vite.rules,
      },
    },

    // Test files
    {
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    }
  ]
});