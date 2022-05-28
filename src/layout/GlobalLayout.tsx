import { memo, useEffect, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import BackTop from '../components/BackTop';
import Bg from '../components/Bg';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
const Header = lazy(() => import('../components/Header'));

/**global PageElement */
const GlobalLayout = ({ children }) => {
  const { scene } = useSelector((state: iRootState) => state);

  useBackTop();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  return (
    <ErrorBoundary>
      <div>{children}</div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Bg />
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
