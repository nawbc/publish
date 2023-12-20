module.exports = {
  extends: ['../../.eslintrc.cjs'],
  ignorePatterns: ['dist'],
  rules: {
    'no-useless-escape': 'warn',
    'no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-unreachable': 'warn',
    'no-extra-semi': 'warn',
    'no-fallthrough': 'off',
    'no-empty': 'warn',
    'no-case-declarations': 'off',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/triple-slash-reference': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};
