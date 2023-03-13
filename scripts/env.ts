const isProduction =
  ['production', 'stage'].indexOf(process.env.NODE_ENV || 'stage') !== -1;

const isDevelopment = process.env.NODE_ENV === 'development';

export { isProduction, isDevelopment };
