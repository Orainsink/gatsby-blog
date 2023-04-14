module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [`react-app`, 'plugin:mdx/recommended'],
  rules: {
    'no-unused-expressions': 'error',
    strict: 'error',
  },
  settings: {
    'mdx/code-blocks': true,
  },
  root: true,
};
