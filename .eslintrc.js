module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: [1],
    'arrow-parens': [1],
    'max-len': [1, { code: 120 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
