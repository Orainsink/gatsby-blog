import { useEffect, useState } from 'react';

import isClient from '../utils/isClient';
import { MediaQueryMap } from '../assets/constants/common';

type MediaQuery = keyof typeof MediaQueryMap | 'prefers-color-scheme: dark'
/**
 * tracks state of a CSS media query
 * https://github.com/streamich/react-use/blob/master/src/useMedia.ts
 * @example import {useMedia} from 'react-use';

const Demo = () => {
  const isMobile = useMedia('isMobile');

  return (
    <div>
      Screen is wide: {isWide ? 'Yes' : 'No'}
    </div>
  );
};
 */
export const useMedia = (query: MediaQuery , defaultState: boolean = false) => {
  const [state, setState] = useState(
    isClient ? () => window.matchMedia(query).matches : defaultState
  );

  useEffect(() => {
    let mounted = true;
    const _query = MediaQueryMap[query] ?? query;
    const mql = window.matchMedia(_query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};
