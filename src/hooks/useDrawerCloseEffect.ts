import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import { sceneAtom } from './../store/atom';

/**
 * fix bug.
 * When antd Drawer is closed, the Drawer component resets the overflow style of body, causing scrolling to fail.
 * @function useDrawerCloseEffect
 * @param {Boolean} visible
 **/
export const useDrawerCloseEffect = (visible: boolean): void => {
  const scene = useRecoilValue(sceneAtom);

  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);
};
