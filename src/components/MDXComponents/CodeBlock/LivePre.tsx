import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import { getPreStyle } from './CodeBlock.styles';
import scope from './scope';

const PreviewContainer = styled.div`
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--prism-block-bg);
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
  code: string;
  noInline?: boolean;
}
export const LivePre = ({ code, noInline = false }: LivePreProps) => (
  <LiveProvider code={code} scope={scope} noInline={noInline}>
    <LiveEditor style={getPreStyle({ padding: 0 })} />
    <PreviewContainer>
      <Preview />
      <Error />
    </PreviewContainer>
  </LiveProvider>
);
