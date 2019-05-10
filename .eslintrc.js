module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': [1, { forbid: ['any'] }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }]
  },
  globals: {
    window: true,
    document: true,
  },
};
