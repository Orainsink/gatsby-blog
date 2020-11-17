import React, { useEffect } from 'react';
import '../styles/global.less';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import useBackgroundColor from '../hooks/useBackgroundColor';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';

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
      <div>{children}</div>
      <Header location={location} />
      <Bg />
      <BackTop />
    </>
  );
};

export default React.memo(GlobalLayout);
