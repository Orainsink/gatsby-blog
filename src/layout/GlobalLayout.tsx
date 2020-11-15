import React from 'react';
import '../styles/global.less';
import { useSelector } from 'react-redux';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';
import Header from '../components/Header';
import useBackgroundColor from '../hooks/useBackgroundColor';

/**global PageElement */
const GlobalLayout = ({ children, location }) => {
  const { scene } = useSelector((state: any) => state);

  /**
   * Toggle whether it is scrollable
   * The reason why not using useCallback is that each time I switch pages, I have to get the body node.
   * */
  const body = document.getElementsByTagName('body')[0];
  body.style.overflowY = scene ? 'hidden' : 'auto';

  useBackgroundColor();

  return (
    <>
      <Bg />
      {children}
      <Header location={location} />
      <BackTop />
    </>
  );
};

export default React.memo(GlobalLayout);
