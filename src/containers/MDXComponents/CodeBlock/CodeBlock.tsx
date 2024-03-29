import { useState, ReactElement, memo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';

import {
  CopyButton,
  NameLabel,
  HighlightContainer,
  LabelsContainer,
  LanguageLabel,
} from './CodeBlock.styles';
import { has } from 'ramda';
import { LivePre } from './LivePre';
import { ReadonlyPre } from './ReadonlyPre';
import { copyToClipboard } from '../../../utils/copyToClipboard';

export interface CodeBlockProps {
  children: string;
  className: string;
  meta: Record<string, string | undefined>;
}

/**
 * code block component
 * default theme is vscode dark
 * @prop className: langClass 语言类型, 必传，否则会作为单个 code 渲染
 * @prop meta 写在mdx code block最前面的一些元数据，用于开启live模式及自定义代码行高亮
 */
export const CodeBlock = memo(
  ({ children, className: langClass, meta }: CodeBlockProps): ReactElement => {
    const language = langClass.replace(/language-/, '') as Language;
    const [copied, setCopied] = useState(false);
    const code = children.trim();

    const isLive = has('live', meta);
    const noInline = has('noInline', meta);
    const { name } = meta;

    const handleCopy = async () => {
      try {
        await copyToClipboard(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <HighlightContainer>
        <LabelsContainer>
          {name && <NameLabel>{name}</NameLabel>}
          <LanguageLabel>{language}</LanguageLabel>
          <CopyButton type="link" onClick={handleCopy}>
            {copied ? <SmileOutlined /> : <CopyOutlined />}
            {copied ? 'succeed' : 'copy'}
          </CopyButton>
        </LabelsContainer>
        {isLive ? (
          <LivePre code={code} noInline={noInline} />
        ) : (
          <Highlight
            {...defaultProps}
            code={code}
            language={language}
            theme={undefined}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <ReadonlyPre
                className={className}
                style={style}
                tokens={tokens}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                lineStr={meta.line}
              />
            )}
          </Highlight>
        )}
      </HighlightContainer>
    );
  }
);
