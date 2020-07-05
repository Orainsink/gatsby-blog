module.exports = ({ env }) => ({
  plugins: [env === 'production' ? require('cssnano') : null],
});
