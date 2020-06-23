import React from 'react';
import Player from '../components/Player';
import { BrowserView } from 'react-device-detect';
import '../styles/global.less';
import Header from '../components/Header';
import Bg from '../components/Bg';
import { useSelector, useDispatch } from 'react-redux';

/**全局PageElement */
const GlobalLayout = ({ children, location, ...props }) => {
  const { scene } = useSelector((state) => state);
  return (
    <>
      {children}
      {!scene && <Header />}
      <Bg location={location} />
      <BrowserView>
        <Player />
      </BrowserView>
    </>
  );
};

export default React.memo(GlobalLayout);
