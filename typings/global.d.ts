declare const __PATH_PREFIX__: string;

declare module 'jinrishici';
declare module 'wordcloud';
declare module 'postcss-preset-env';
declare module 'typography';
declare module 'gltf-pipeline' {
  import * as gltfPipeline from 'gltf-pipeline';

  export default gltfPipeline;
}

declare module '@mdx-js/react' {
  type MDXProps = {
    children: React.ReactNode;
    components: any;
  };
  export class MDXProvider extends React.Component<MDXProps> {}
}
