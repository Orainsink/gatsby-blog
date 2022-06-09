declare const __PATH_PREFIX__: string;
declare const __REDUX_DEVTOOLS_EXTENSION__: string;
declare module '*.json';
declare class MediaMetadata {
  title: string;
  artist: string;
  artwork: { [key: string]: string }[];
  constructor({
    title,
    artist,
    artwork,
  }: {
    title: string;
    artist: string;
    artwork: { [key: string]: string }[];
  });
}
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}

declare module '*.gltf';
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.glsl';
declare module 'algoliasearch/lite';
declare module 'classnames';
declare module '@mdx-js/react';
declare module 'react-instantsearch-dom';
declare module 'gatsby-plugin-dark-mode';
declare module 'howler';
declare module 'jinrishici';
declare module 'wordcloud';
declare module 'postcss-preset-env';
declare module 'webpack-filter-warnings-plugin';
declare module 'typography';
declare module 'gltf-pipeline' {
  import * as gltfPipeline from 'gltf-pipeline';

  export default gltfPipeline;
}

declare module '*.gql' {
  const content: string;
  export default content;
}

declare module 'escape-string-regexp' {
  declare function escapeStringRegexp(str: string): string;
  export default escapeStringRegexp;
}
