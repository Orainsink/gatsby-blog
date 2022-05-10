import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import Header from '../components/Header';
import BackTop from '../components/BackTop';
import Bg from '../components/Bg';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';

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
      <Header />
      <Bg />
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
