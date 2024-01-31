module.exports = {
  extends: ['../../.eslintrc.cjs'],
  ignorePatterns: ['dist', './src/stories', './src/utils/*.test.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
