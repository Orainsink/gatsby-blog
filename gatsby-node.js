/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * fix React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work
 * see: https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-469046186
 */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const onCreateWebpackConfig = ({ actions, stage }) => {
  // antd的问题,css顺序冲突,目前没有找到更好的解决办法,只能过滤
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new FilterWarningsPlugin({
          exclude: /Conflicting order./,
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
