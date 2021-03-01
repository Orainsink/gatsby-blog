/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const SentryPlugin = require('webpack-sentry-plugin');
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
        new SentryPlugin({
          apiKey: process.env.GATSBY_SENTRY_AUTH,
          organization: 'orainsink',
          project: 'orainsink',
          include: /public/,
          release: function (hash) {
            return hash;
          },
          deleteAfterCompile: true,
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
