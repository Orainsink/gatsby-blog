import { useState, ReactElement, memo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { Button } from 'antd';
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';

import { theme as lightTheme } from '../../assets/theme/customPrism';
import { useIsDark } from '../../hooks';

export interface CodeBlockProps {
  children: string;
  className: string;
}
/**
 * code block component
 * default theme is vscode dark
 * @prop className: langClass 语言类型, 必传，否则会作为单个 code 渲染
 */
export const CodeBlock = memo(
  ({ children, className: langClass }: CodeBlockProps): ReactElement => {
    const language = langClass.replace(/language-/, '') as Language;
    const [copied, setCopied] = useState(false);
    const isDark = useIsDark();

    const copyToClipboard = (code: string) => {
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
    };

    const theme = isDark ? vsDark : lightTheme;

    return (
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{
              margin: '2em 0 1em 0',
              position: 'relative',
            }}
          >
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
                color: 'var(--color-text)',
              }}
            >
              <div
                style={{
                  padding: '2px 12px 0px',
                  background: 'var(--color-code-bg)',
                  borderRadius: '8px 8px 0px 0px',
                  pointerEvents: 'none',
                  margin: '0 5px',
                  height: '32px',
                  lineHeight: '32px',
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
                  background: 'var(--color-code-bg)',
                  color: 'var(--color-text)',
                  borderRadius: '8px 8px 0px 0px',
                  transition: 'none',
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
                maxHeight: '40em',
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
  }
);
