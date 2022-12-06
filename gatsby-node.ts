/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// import SentryWebpackPlugin from '@sentry/webpack-plugin';
// import { removeSync } from 'fs-extra';
// import glob from 'glob';
// import type { GatsbyNode } from 'gatsby';

export { createPages } from './scripts/createPages';
export { onCreateNode } from './scripts/onCreateNode';

/**inject webpack config */
// export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
//   actions,
//   stage,
// }) => {
//   actions.setWebpackConfig({
//     plugins: [
//       /**
//        * sentry source map
//        * https://docs.sentry.io/platforms/javascript/guides/gatsby/sourcemaps/
//        */
//       stage === 'build-javascript' &&
//         new SentryWebpackPlugin({
//           authToken: process.env.GATSBY_SENTRY_AUTH,
//           org: 'orainsink',
//           project: 'orainsink',
//           include: 'public',
//           ignore: ['node_modules', 'webpack.config.js', 'assets'],
//         }),
//       /**delete sourcemap before deploy*/
//       stage === 'build-javascript' && {
//         apply: (compiler: any) =>
//           compiler.hooks.done.tap(
//             'CleanJsMapPlugin',
//             (_: any, cb = () => {}) => {
//               glob.sync('./public/**/*.js.map').forEach((f) => removeSync(f));
//               cb && cb();
//             }
//           ),
//       },
//     ].filter(Boolean),
//   });
// };
