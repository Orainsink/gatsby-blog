import React from 'react';
import '../styles/global.less';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
const Bg = loadable(() => import('../components/Bg'));
const BackTop = loadable(() => import('../components/BackTop'));
const Header = loadable(() => import('../components/Header'));

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
