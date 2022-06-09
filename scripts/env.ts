import { env } from 'process';

const isProduction =
  ['production', 'stage'].indexOf(env.NODE_ENV || 'stage') !== -1;

export default isProduction;
