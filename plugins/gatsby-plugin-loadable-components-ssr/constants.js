const statsFilename = 'loadable-stats-build-javascript.json';
/**
 * https://github.com/hector-del-rio/gatsby-plugin-loadable-components-ssr/blob/master/src/constants.js
 */
// Apparently there's no way to get the build path (public/) as a variable from gatsby.
// The code below is as found in gatsby's source code itself:
//  https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/cache-dir/static-entry.js#L21
const statsPath = `${process.cwd()}/public/${statsFilename}`;

module.exports = {
  statsPath,
  statsFilename,
};
