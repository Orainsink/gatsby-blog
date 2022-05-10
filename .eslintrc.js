module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [`react-app`, `plugin:react-hooks/recommended`],
  rules: {
    'no-unused-expressions': 'warn',
    strict: 'error',
  },
};
