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

interface MdxItem extends MarkdownRemark {
  body?: string;
}

interface ChildMdxItem {
  node: {
    childMdx: MdxItem;
  };
}
