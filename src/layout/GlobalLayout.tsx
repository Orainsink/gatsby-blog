import React, { useEffect } from 'react';
import '../styles/global.less';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import useBackgroundColor from '../hooks/useBackgroundColor';
import Bg from '../components/Bg';
import BackTop from '../components/BackTop';
import useHasMounted from '../hooks/useHasMounted';

/**global PageElement */
const GlobalLayout = ({ children }) => {
  const { scene } = useSelector((state: any) => state);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);
  const hasMounted = useHasMounted();
  useBackgroundColor();

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
