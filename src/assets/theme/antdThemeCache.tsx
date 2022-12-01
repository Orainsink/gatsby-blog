import { FC } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

const cache = createCache();
export const antdStyleText = extractStyle(cache);

export const StyleCacheProvider: FC<any> = ({ children }) => (
  <StyleProvider cache={cache}>{children}</StyleProvider>
);
