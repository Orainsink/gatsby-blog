import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { PrismTheme } from 'prism-react-renderer';

import { getPreStyle } from './CodeBlock.styles';
import scope from './scope';

interface LivePreProps {
  theme: PrismTheme;
  code: string;
}
export const LivePre = ({ theme, code }: LivePreProps) => (
  <LiveProvider code={code} noInline={true} theme={theme} scope={scope}>
    <LiveEditor style={getPreStyle({ padding: 0 })} />
    <LivePreview />
    <LiveError />
  </LiveProvider>
);
