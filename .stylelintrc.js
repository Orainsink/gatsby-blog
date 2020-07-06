module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  rules: {
    'unit-no-unknown': [
      true,
      {
        ignoreFunctions: ['image-set', 'X'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'function-calc-no-invalid': null,
  },
};
