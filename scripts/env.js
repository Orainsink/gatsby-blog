const isProduction =
  ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1;
module.exports = isProduction;
