import {
  memo,
  useEffect,
  ReactElement,
  ReactNode,
  lazy,
  Suspense,
} from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import BackTop from '../components/BackTop';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { iRootState } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
const Header = lazy(
  () => import(/* webpackPreload: true */ '../components/Header')
);
const Bg = lazy(() => import(/* webpackPreload: true */ '../components/Bg'));

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
      <Suspense fallback={null}>
        <Bg />
      </Suspense>
      <div>{children}</div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
