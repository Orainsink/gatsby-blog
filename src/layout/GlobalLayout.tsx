import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/variables.less';
import '../styles/global.less';
import Header from '../components/Header';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';
import { useHasMounted, useBackTop } from '../hooks';
import '../assets/css/base.less';

/**global PageElement */
const GlobalLayout = ({ children }) => {
  const { scene } = useSelector((state: any) => state);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);
  const hasMounted = useHasMounted();
  useBackTop();

  return (
    <>
      <div>{children}</div>
      {hasMounted && <Header />}
      {hasMounted && <Bg />}
      {hasMounted && <BackTop />}
    </>
  );
};

export default React.memo(GlobalLayout);
