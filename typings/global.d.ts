declare const __PATH_PREFIX__: string;
declare module '*.json';
declare module '*.gltf';
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.glsl';
declare module 'gatsby-plugin-dark-mode';
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

declare module '@mdx-js/react' {
  type MDXProps = {
    children: React.ReactNode;
    components: any;
  };
  export class MDXProvider extends React.Component<MDXProps> {}
}
