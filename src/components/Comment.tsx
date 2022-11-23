import { memo, ReactElement, useCallback } from 'react';
import { useMountedState, useUpdateEffect } from 'react-use';

import { useIsDark } from '../hooks';

export const Comment = memo((): ReactElement | null => {
  const isDark = useIsDark();
  const hasMounted = useMountedState()();

  const commentsRefCb = useCallback((node: HTMLDivElement) => {
    if (node) {
      const scriptEl = document.createElement('script');
      scriptEl.async = true;
      scriptEl.src = 'https://utteranc.es/client.js';
      scriptEl.setAttribute('repo', 'Orainsink/gatsby-blog');
      scriptEl.setAttribute('issue-term', 'title');
      scriptEl.setAttribute('id', 'utterances');
      scriptEl.setAttribute('label', 'comment');
      scriptEl.setAttribute('crossorigin', 'anonymous');
      scriptEl.setAttribute('theme', isDark ? 'github-dark' : 'github-light');

      if (node) {
        node.appendChild(scriptEl);
      } else {
        console.log(`Error adding utterances comments`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
