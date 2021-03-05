/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const glob = require('glob');
const { removeSync } = require('fs-extra');

/**inject webpack config */
const onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    plugins: [
      // antd的问题,css顺序冲突,目前没有找到更好的解决办法,只能过滤
      new FilterWarningsPlugin({
        exclude: /Conflicting order./,
      }),
      /**
       * sentry source map
       * https://docs.sentry.io/platforms/javascript/guides/gatsby/sourcemaps/
       */
      stage === 'build-javascript' &&
        new SentryWebpackPlugin({
          authToken: process.env.GATSBY_SENTRY_AUTH,
          org: 'orainsink',
          project: 'orainsink',
          include: './public',
          release: 'blog',
          ignore: ['node_modules', 'webpack.config.js', 'assets'],
        }),
      /**delete sourcemap before deploy*/
      stage === 'build-javascript' && {
        apply: (compiler) =>
          compiler.hooks.done.tap('CleanJsMapPlugin', (compilation, cb) => {
            glob.sync('./public/**/*.js.map').forEach((f) => removeSync(f));
            cb && cb();
          }),
      },
    ].filter(Boolean),
  });
};

module.exports = {
  createPages: require('./scripts/createPages'),
  onCreateNode: require('./scripts/onCreateNode'),
  onCreateWebpackConfig,
};
