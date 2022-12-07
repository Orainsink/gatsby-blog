import { MDXProvider } from '@mdx-js/react';
import { ReactElement, ReactNode } from 'react';

import { AnchorBlock } from './AnchorBlock';
import { CodeBlock, CodeBlockProps } from './CodeBlock';
import { HxBlock, HxBlockProps } from './HxBlock';
import { ImgBlock } from './ImgBlock';

type HxBlockPropsBeforeInject = Omit<HxBlockProps, 'level'>;

export const MdxParser = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <MDXProvider
      components={{
        code: ({ children, className }: CodeBlockProps) => {
          return className ? (
            <CodeBlock className={className}>{children}</CodeBlock>
          ) : (
            <code>{children}</code>
          );
        },
        img: ImgBlock,
        a: AnchorBlock,
        h2: (props: HxBlockPropsBeforeInject) => (
          <HxBlock level={2} {...props} />
        ),
        h3: (props: HxBlockPropsBeforeInject) => (
          <HxBlock level={3} {...props} />
        ),
        h4: (props: HxBlockPropsBeforeInject) => (
          <HxBlock level={4} {...props} />
        ),
      }}
    >
      {children}
    </MDXProvider>
  );
};
