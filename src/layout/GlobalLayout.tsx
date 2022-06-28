import { memo, useEffect, ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import BackTop from '../components/BackTop';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Bg from '../components/Bg';

interface Props {
  children: ReactNode;
}
/**global PageElement */
const GlobalLayout = ({ children }: Props): ReactElement => {
  const { scene } = useSelector((state: iRootState) => state);

  useBackTop();
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  return (
    <ErrorBoundary>
      <Bg />
      <div>{children}</div>
      <Header />
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
