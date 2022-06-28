import {
  memo,
  useEffect,
  Suspense,
  lazy,
  ReactElement,
  ReactNode,
} from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import BackTop from '../components/BackTop';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
const Header = lazy(() => import('../components/Header'));
const Bg = lazy(() => import('../components/Bg'));
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
      <div>{children}</div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <Bg />
      </Suspense>
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
