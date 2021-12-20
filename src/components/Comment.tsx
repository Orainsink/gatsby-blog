import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { iRootState } from '../redux/store';

const Comment = () => {
  const theme = useSelector((state: iRootState) => state.theme);

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
        globalThis.localStorage?.getItem('theme') === 'dark'
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
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        },
        'https://utteranc.es/'
      );
    }
  }, [theme]);

  return <div ref={commentsRefCb} className="comments"></div>;
};
export default React.memo(Comment);
