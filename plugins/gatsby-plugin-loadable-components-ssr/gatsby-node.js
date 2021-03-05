/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const LoadablePlugin = require('@loadable/webpack-plugin');
const { unlinkSync } = require('fs');
const { statsFilename, statsPath } = require('./constants');
/**inject webpack config */
const onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    plugins: [
      /**loadable-components-ssr plugin
       * see https://github.com/hector-del-rio/gatsby-plugin-loadable-components-ssr
       */
      stage === 'build-javascript' &&
        new LoadablePlugin({ filename: statsFilename }),
    ].filter(Boolean),
  });
};

/**inject babel config */
const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: '@loadable/babel-plugin' });
};

const onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath);
};

module.exports = {
  onCreateBabelConfig,
  onPostBuild,
  onCreateWebpackConfig,
};
