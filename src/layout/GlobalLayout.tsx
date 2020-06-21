import React from 'react';
import Player from '../components/Player';
import { BrowserView } from 'react-device-detect';
import '../styles/global.less';

/**全局PageElement */
const Layout = ({ element, props }) => {
  return (
    <>
      {element}
      <BrowserView>
        <Player />
      </BrowserView>
    </>
  );
};

export default Layout;
