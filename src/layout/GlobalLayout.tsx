import React from 'react';
import '../styles/global.less';
import Header from '../components/Header';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';
import { useSelector } from 'react-redux';

/**global PageElement */
const GlobalLayout = ({ children, location, ...props }) => {
  const { scene } = useSelector((state) => state);

  /**
   * Toggle whether it is scrollable
   * The reason why not using useCallback is that each time I switch pages, I have to get the body node.
   * */
  const body = document.getElementsByTagName('body')[0];
  body.style.overflowY = scene ? 'hidden' : 'auto';

  return (
    <>
      {children}
      <Header location={location} />
      <Bg />
      <BackTop />
    </>
  );
};

export default React.memo(GlobalLayout);
