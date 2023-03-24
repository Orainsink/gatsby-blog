import rangeParser from 'parse-numeric-range';
import Highlight from 'prism-react-renderer';
import { CSSProperties } from 'react';
import { getPreStyle } from './CodeBlock.styles';

interface Token {
  types: string[];
  content: string;
  empty?: boolean;
}

interface NormalPreProps {
  className: string;
  style: CSSProperties;
  tokens: Token[][];
  getLineProps: Highlight['getLineProps'];
  lineStr: string | undefined;
  getTokenProps: Highlight['getTokenProps'];
}

export const NormalPre = ({
  className,
  style,
  tokens,
  getLineProps,
  lineStr,
  getTokenProps,
}: NormalPreProps) => {
  const shouldHighlightLine = (lineIndex: number): boolean => {
    const RE = /{([\d,-]+)}/;
    if (!lineStr) return false;
    if (RE.test(lineStr)) {
      const strlineNumbers = RE.exec(lineStr)?.[1] ?? '';
      const lineNumbers = rangeParser(strlineNumbers);
      return lineNumbers.includes(lineIndex + 1);
    } else {
      return false;
    }
  };

  return (
    <pre className={className} style={getPreStyle(style)}>
      {tokens.map((line, i) => {
        const isLastLineEmpty =
          i === tokens.length - 1 && line.length === 1 && line[0].empty;
        if (isLastLineEmpty) return null;

        const lineProps = getLineProps({ line, key: i });
        if (shouldHighlightLine(i)) {
          lineProps.className = `${lineProps.className} highlight-line`;
        }
        return (
          <div key={`line_${i}`} {...lineProps}>
            {line.map((token, key) =>
              key === line.length - 1 ? (
                <span
                  key={`token_${key}`}
                  {...getTokenProps({ token, key })}
                  style={{ display: 'inline' }}
                />
              ) : (
                <span key={`token_${key}`} {...getTokenProps({ token, key })} />
              )
            )}
          </div>
        );
      })}
    </pre>
  );
};
