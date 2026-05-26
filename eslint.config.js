export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.firebase/**',
      '**/images/**',
      'firebase-init.js',
    ],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'eqeqeq': ['warn', 'always'],
      'curly': 'warn',
    },
  },
];
