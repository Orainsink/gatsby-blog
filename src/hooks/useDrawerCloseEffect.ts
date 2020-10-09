import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * fix bug.
 * When antd Drawer is closed, the Drawer component resets the overflow style of body, causing scrolling to fail.
 * @function useDrawerCloseEffect
 * @param {Boolean} visible
 **/
const useDrawerCloseEffect = (visible: boolean) => {
  const scene = useSelector((state) => state.scene);

  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);
};
export default useDrawerCloseEffect;
