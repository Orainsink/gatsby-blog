import React, { useEffect } from 'react';
import '../styles/global.less';
import { useSelector } from 'react-redux';
import BackTop from '../components/BackTop';
import Header from '../components/Header';
import useBackgroundColor from '../hooks/useBackgroundColor';
import loadable from '@loadable/component';
const Bg = loadable(() => import('../components/Bg'));

/**global PageElement */
const GlobalLayout = ({ children, location }) => {
  const { scene } = useSelector((state: any) => state);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  useBackgroundColor();

  return (
    <>
      {children}
      <Header location={location} />
      <Bg />
    </>
  );
};

export default React.memo(GlobalLayout);
