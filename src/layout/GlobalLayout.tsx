import {
  memo,
  useEffect,
  ReactElement,
  ReactNode,
  lazy,
  Suspense,
} from 'react';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import { BackTop } from '../components/BackTop';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useRecoilValue } from 'recoil';
import { sceneAtom } from '../store/atom';

const Header = lazy(
  () => import(/* webpackPreload: true */ '../components/Header')
);

interface Props {
  children: ReactNode;
}
/**global PageElement */
const GlobalLayout = ({ children }: Props): ReactElement => {
  const scene = useRecoilValue(sceneAtom);

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
      <BackTop />
    </ErrorBoundary>
  );
};

export default memo(GlobalLayout);
