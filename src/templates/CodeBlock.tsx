import React, { useState, useCallback } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dark from 'prism-react-renderer/themes/vsDark';
import { Button } from 'antd';
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';

/**
 * code block component
 * default theme is vscode dark
 * @prop className: langClass 语言类型, 默认javascript // TODO: add sh plugin
 */
const CodeBlock = ({ children, className: langClass = 'javascript' }: any) => {
  const language = langClass.replace(/language-/, '');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((code: string) => {
    if (typeof code !== 'string') return;
    const el = document.createElement('textarea');
    el.value = code;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }, []);

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={dark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={{ margin: '40px 0', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              position: 'absolute',
              top: 0,
              right: '14px',
              transform: 'translateY(-98%)',
              fontSize: '18px',
              textTransform: 'uppercase',
              color: '#b9b9ba',
            }}
          >
            <div
              style={{
                padding: '2px 12px 0px',
                background: '#1e1e1e',
                borderRadius: '8px 8px 0px 0px',
                pointerEvents: 'none',
                margin: '0 5px',
                border: '1px solid #1e1e1e',
              }}
            >
              {language}
            </div>
            <Button
              type="link"
              onClick={() => {
                copyToClipboard(children);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
              style={{
                padding: '2px 12px 0px',
                background: '#1e1e1e',
                color: '#b9b9ba',
                borderRadius: '8px 8px 0px 0px',
              }}
            >
              {copied ? <SmileOutlined /> : <CopyOutlined />}
              {copied ? 'succeed' : 'copy'}
            </Button>
          </div>
          <pre
            className={className}
            style={{
              ...style,
              padding: '0.8em 0.8em',
              borderRadius: 4,
              lineHeight: 1.5,
              overflow: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <div key={`line_${i}`} {...getLineProps({ line, key: i })}>
                {line.map((token, key) =>
                  key === line.length - 1 ? (
                    <span
                      key={`token_${key}`}
                      {...getTokenProps({ token, key })}
                      style={{ display: 'inline' }}
                    />
                  ) : (
                    <span
                      key={`token_${key}`}
                      {...getTokenProps({ token, key })}
                    />
                  )
                )}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
