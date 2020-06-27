import React from 'react';
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
