declare const __PATH_PREFIX__: string;
declare const __REDUX_DEVTOOLS_EXTENSION__: string;
declare module '*.less';
declare module '*.json';
declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}
declare module '*.gltf';
declare module '*.svg';
declare module 'algoliasearch/lite';
declare module '@loadable/component';
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
