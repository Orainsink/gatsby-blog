/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
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
        new SentryWebpackPlugin({
          authToken: process.env.GATSBY_SENTRY_AUTH,
          org: 'orainsink',
          project: 'orainsink',
          include: 'src',
          ignore: ['node_modules', 'webpack.config.js', 'assets'],
        }),
      ],
    });
  }
};
module.exports = {
  createPages: require('./scripts/createPages'),
  onCreateNode: require('./scripts/onCreateNode'),
  onCreateWebpackConfig,
};
