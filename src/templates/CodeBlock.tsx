import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dark from 'prism-react-renderer/themes/vsDark';

/**
 * code block component
 * default theme is vscode dark
 * @prop className: langClass 语言类型, 默认javascript // TODO: 安装sh插件
 */
const CodeBlock = ({ children, className: langClass = 'javascript' }: any) => {
  const language = langClass.replace(/language-/, '');
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={dark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: '16px 24px',
            borderRadius: 8,
            lineHeight: 2,
            margin: '15px 5px',
            overflow: 'auto',
          }}
        >
          {tokens.map((line, i) => (
            <div key={`line_${i}`} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={`token_${key}`} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
