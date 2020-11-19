/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * fix React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work
 * see: https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-469046186
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }
};
module.exports = {
  createPages: require('./scripts/createPages'),
  onCreateNode: require('./scripts/onCreateNode'),
};
