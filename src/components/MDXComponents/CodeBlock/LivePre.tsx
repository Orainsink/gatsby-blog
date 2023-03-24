import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { getPreStyle } from './CodeBlock.styles';
import { PrismTheme } from 'prism-react-renderer';

interface LivePreProps {
  theme: PrismTheme;
  code: string;
}
export const LivePre = ({ theme, code }: LivePreProps) => (
  <LiveProvider code={code} noInline={true} theme={theme}>
    <LiveEditor style={getPreStyle({})} />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);
