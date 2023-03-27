import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { PrismTheme } from 'prism-react-renderer';
import styled from 'styled-components';

import { getPreStyle } from './CodeBlock.styles';
import scope from './scope';
import { useIsDark } from '../../../hooks';

const PreviewContainer = styled.div<{ $isDark: boolean }>`
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  background-color: ${({ $isDark }) =>
    $isDark ? 'rgb(30, 30, 30)' : 'rgb(246, 246, 246)'};
  margin-top: var(--space-md);
`;

const Preview = styled(LivePreview)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Error = styled(LiveError)`
  white-space: pre;
  color: var(--color-error);
  margin: 0;
`;

interface LivePreProps {
  theme: PrismTheme;
  code: string;
  noInline?: boolean;
}
export const LivePre = ({ theme, code, noInline = false }: LivePreProps) => {
  const isDark = useIsDark();
  return (
    <LiveProvider code={code} theme={theme} scope={scope} noInline={noInline}>
      <LiveEditor style={getPreStyle({ padding: 0 })} />
      <PreviewContainer $isDark={isDark}>
        <Preview />
        <Error />
      </PreviewContainer>
    </LiveProvider>
  );
};
