import { memo, ReactElement, useCallback, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { useIsDark, useHasMounted } from '../hooks';

export const Comment = memo((): ReactElement | null => {
  const isDark = useIsDark();
  const getScriptElementRef = useRef(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', 'Orainsink/gatsby-blog');
    scriptEl.setAttribute('issue-term', 'title');
    scriptEl.setAttribute('id', 'utterances');
    scriptEl.setAttribute('label', 'comment');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('theme', isDark ? 'github-dark' : 'github-light');
    return scriptEl;
  });
  const hasMounted = useHasMounted();

  const commentsRefCb = useCallback((node: HTMLDivElement) => {
    if (node) {
      if (node) {
        const scriptEl = getScriptElementRef.current();
        node.appendChild(scriptEl);
      } else {
        console.log(`Error adding utterances comments`);
      }
    }
  }, []);

  useUpdateEffect(() => {
    const frameDom: any = document.querySelector('iframe.utterances-frame');

    if (frameDom?.contentWindow) {
      frameDom.contentWindow.postMessage(
        {
          type: 'set-theme',
          theme: isDark ? 'github-dark' : 'github-light',
        },
        'https://utteranc.es/'
      );
    }
  }, [isDark]);

  return hasMounted ? (
    <div ref={commentsRefCb} className="comments"></div>
  ) : null;
});
