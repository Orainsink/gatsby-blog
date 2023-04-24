declare const __PATH_PREFIX__: string;

declare module 'jinrishici';
declare module 'wordcloud';
declare module 'postcss-preset-env';
declare module 'typography';
declare module 'gatsby-plugin-open-graph-images' {
  const createOpenGraphImage: (
    createFn: any,
    options: any
  ) => {
    path: string;
    size: {
      width: string;
      height: string;
    };
  };
  export { createOpenGraphImage };
}
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

interface OgImage {
  path: string;
  size: {
    width: string;
    height: string;
  };
}

interface PageContext {
  id: string;
  ogImage: OgImage;
}
