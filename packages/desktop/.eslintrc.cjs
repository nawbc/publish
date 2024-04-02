module.exports = {
  extends: [
    '../../.eslintrc.cjs',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
  ],
  ignorePatterns: ['dist'],
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
