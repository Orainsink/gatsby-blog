import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { iRootState } from '../redux/store';

/**
 * fix bug.
 * When antd Drawer is closed, the Drawer component resets the overflow style of body, causing scrolling to fail.
 * @function useDrawerCloseEffect
 * @param {Boolean} visible
 **/
export const useDrawerCloseEffect = (visible: boolean) => {
  const scene = useSelector((state: iRootState) => state.scene);

  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);
};
