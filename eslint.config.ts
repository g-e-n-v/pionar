import configPrettier from '@electron-toolkit/eslint-config-prettier'
import tslint from '@electron-toolkit/eslint-config-ts'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import * as reactCompiler from 'eslint-plugin-react-compiler'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default tslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginPerfectionist.configs['recommended-natural'],
  reactCompiler.configs.recommended,
  {
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReactRefresh.configs.vite.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../*'], message: 'Please use absolute import instead relative import.' }
          ]
        }
      ],
      'prefer-template': 'error',
      'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  },
  configPrettier
)
