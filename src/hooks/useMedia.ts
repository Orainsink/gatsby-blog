import { useEffect, useState } from 'react';

import { isClient } from '../utils/isClient';
import { MediaQueryMap } from '../assets/constants/breakPoints';

type MediaQuery = keyof typeof MediaQueryMap | 'prefers-color-scheme: dark';

const removeMediaPrefix = (query: string) => query.replace(/@media\s/, '');

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
export const useMedia = (
  query: MediaQuery,
  defaultState: boolean = false
): boolean => {
  const [state, setState] = useState(
    isClient ? () => window.matchMedia(query).matches : defaultState
  );

  useEffect(() => {
    let mounted = true;
    // @ts-ignore
    const _query = removeMediaPrefix(MediaQueryMap[query] ?? query);
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
