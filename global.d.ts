declare const __PATH_PREFIX__: string;
declare const __REDUX_DEVTOOLS_EXTENSION__: string;
declare module '*.less';
declare module '*.json';
declare module '*.gltf';
declare module '*.svg';
declare module 'algoliasearch/lite';

interface PostItem {
  id?: string;
  body?: string;
  tableOfContents?: any;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    category: string;
  };
  fields: {
    slug: string;
  };
}

interface ChildMdxItem {
  node: {
    childMdx: PostItem;
  };
}
