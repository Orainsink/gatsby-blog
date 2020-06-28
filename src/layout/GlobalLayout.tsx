import React, { useEffect } from 'react';
import Player from '../components/Player';
import { BrowserView } from 'react-device-detect';
import '../styles/global.less';
import Header from '../components/Header';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';
import { useSelector } from 'react-redux';

/**全局PageElement */
const GlobalLayout = ({ children, location, ...props }) => {
  const { scene } = useSelector((state) => state);

  /**切换是否可滚动, 不用useCallback的原因是切换页面的时候要重新获取body */
  const toggleScroll = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  };

  useEffect(() => {
    toggleScroll();
  }, [scene, toggleScroll]);

  return (
    <>
      {children}
      {!scene && <Header location={location} />}
      <Bg />
      <BackTop />
      <BrowserView>
        <Player />
      </BrowserView>
    </>
  );
};

export default React.memo(GlobalLayout);
