import React from 'react';
import { Link } from 'gatsby';
import Footer from '../components/Footer';
import Player from '../components/Player';
import { BrowserView } from 'react-device-detect';
import '../styles/global.less';

/**全局PageElement */
const Layout = ({ element, props }) => {
  return (
    <>
      <BrowserView>
        <Player />
      </BrowserView>
      {element}
    </>
  );
};

export default Layout;
