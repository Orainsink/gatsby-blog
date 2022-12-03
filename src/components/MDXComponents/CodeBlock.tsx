import { useState, ReactElement, memo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { Button } from 'antd';
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

import { theme as lightTheme } from '../../assets/theme/customPrism';
import { useIsDark } from '../../hooks';

const labelSharedStyles = css`
  padding: 2px 12px 0px;
  background: var(--color-code-bg);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0px 0px;
  color: var(--color-text) !important;
  font-weight: var(--font-weight-lg);
`;

const LabelsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 14px;
  transform: translateY(-98%);
  text-transform: uppercase;
`;

const LanguageLabel = styled.div`
  ${labelSharedStyles}
  pointer-events: none;
  margin: 0 5px;
  height: 32px;
  line-height: 32px;
`;

const CopyButton = styled(Button)`
  ${labelSharedStyles}
  transition: none;
  font-family: inherit;
`;

const HighlightContainer = styled.div`
  margin: var(--space-xl) 0 var(--space-md) 0;
  position: relative;
`;

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
          <HighlightContainer>
            <LabelsContainer>
              <LanguageLabel>{language}</LanguageLabel>
              <CopyButton
                type="link"
                onClick={() => {
                  copyToClipboard(children);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
              >
                {copied ? <SmileOutlined /> : <CopyOutlined />}
                {copied ? 'succeed' : 'copy'}
              </CopyButton>
            </LabelsContainer>
            <pre
              className={className}
              style={{
                ...style,
                padding: 'var(--space-sm)',
                borderRadius: 'var(--border-radius-sm)',
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
          </HighlightContainer>
        )}
      </Highlight>
    );
  }
);
