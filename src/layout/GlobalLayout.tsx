import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/variables.less';
import '../assets/css/global.less';
import Header from '../components/Header';
import BackTop from '../components/BackTop';
import { useHasMounted, useBackTop } from '../hooks';
import '../assets/css/base.less';
import loadable from '@loadable/component';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
const Bg = loadable(() => import('../components/Bg'));

/**global PageElement */
const GlobalLayout = ({ children }) => {
  const { scene } = useSelector((state: iRootState) => state);

  const hasMounted = useHasMounted();
  useBackTop();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  return (
    <ErrorBoundary>
      <div>{children}</div>
      {hasMounted && <Header />}
      {hasMounted && <Bg />}
      {hasMounted && <BackTop />}
    </ErrorBoundary>
  );
};

export default React.memo(GlobalLayout);
