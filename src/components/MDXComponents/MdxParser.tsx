import { MDXProvider } from '@mdx-js/react';
import { ReactElement, ReactNode } from 'react';

import { AnchorBlock } from './AnchorBlock';
import { CodeBlock, CodeBlockProps } from './CodeBlock';
import { ImgBlock } from './ImgBlock';

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
      }}
    >
      {children}
    </MDXProvider>
  );
};
