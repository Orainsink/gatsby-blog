import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { iRootState } from '../redux/store';

const Comment = () => {
  const commentBox = useRef<HTMLDivElement>(null);
  const theme = useSelector((state: iRootState) => state.theme);

  useLayoutEffect(() => {
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

    if (commentBox?.current) {
      commentBox.current.appendChild(scriptEl);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  useEffect(() => {
    document
      .querySelector('iframe.utterances-frame')
      // @ts-ignore
      ?.contentWindow.postMessage(
        {
          type: 'set-theme',
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        },
        'https://utteranc.es/'
      );
  }, [theme]);

  return <div ref={commentBox} className="comments"></div>;
};
export default React.memo(Comment);
