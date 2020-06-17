import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import Player from '../components/Player';
import { BrowserView } from 'react-device-detect';

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
