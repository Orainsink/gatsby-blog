import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { PrismTheme } from 'prism-react-renderer';
import styled from 'styled-components';

import { getPreStyle } from './CodeBlock.styles';
import scope from './scope';

const PreviewContainer = styled.div`
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--prism-plain-background);
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
export const LivePre = ({ theme, code, noInline = false }: LivePreProps) => (
  <LiveProvider code={code} theme={theme} scope={scope} noInline={noInline}>
    <LiveEditor style={getPreStyle({ padding: 0 })} />
    <PreviewContainer>
      <Preview />
      <Error />
    </PreviewContainer>
  </LiveProvider>
);
