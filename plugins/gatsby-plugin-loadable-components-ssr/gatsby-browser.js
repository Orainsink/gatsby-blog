const { render, hydrate } = require('react-dom');
const { loadableReady } = require('@loadable/component');

/**Allow a plugin to replace the ReactDOM.render/ReactDOM.hydrate function call by a custom renderer. */
const replaceHydrateFunction =
  (_, options) => (element, container, callback) => {
    loadableReady(() => {
      const renderFn =
        typeof options.useHydrate === 'undefined'
          ? // Using ReactDOM.hydrate on develop will throw an error in console
            process.env.GATSBY_BUILD_STAGE.includes('develop')
            ? render
            : hydrate
          : !!options.useHydrate
          ? hydrate
          : render;

      renderFn(element, container, callback);
    });
  };

module.exports = {
  replaceHydrateFunction,
};
