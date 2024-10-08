module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'beansmile/vue',
    'plugin:vue/essential',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    },
  },
  globals: {
    qq: true
  }
}
