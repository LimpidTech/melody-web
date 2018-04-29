module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'padded-blocks': [2, {
      blocks: 'never',
      classes: 'never',
      switches: 'never',
    }],
    'space-before-function-paren': [2, {
      anonymous: 'always',
      named: 'never'
    }],
  },
  globals: {}
}
