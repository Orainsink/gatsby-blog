import React, { useCallback, useEffect } from 'react';

import { useIsDark } from '../hooks/useIsDark';

const Comment = () => {
  const isDark = useIsDark()

  const commentsRefCb = useCallback((node) => {
    if (node) {
      const scriptEl = document.createElement('script');
      scriptEl.async = true;
      scriptEl.src = 'https://utteranc.es/client.js';
      scriptEl.setAttribute('repo', 'Orainsink/gatsby-blog');
      scriptEl.setAttribute('issue-term', 'title');
      scriptEl.setAttribute('id', 'utterances');
      scriptEl.setAttribute('label', 'comment');
      scriptEl.setAttribute('crossorigin', 'anonymous');
      scriptEl.setAttribute(
        'theme',
        isDark
          ? 'github-dark'
          : 'github-light'
      );

      if (node) {
        node.appendChild(scriptEl);
      } else {
        console.log(`Error adding utterances comments`);
      }
    }
  }, []);

  useEffect(() => {
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

  return <div ref={commentsRefCb} className="comments"></div>;
};
export default React.memo(Comment);
