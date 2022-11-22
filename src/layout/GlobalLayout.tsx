import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';

import '../assets/css/variables.css';
import '../assets/css/global.less';
import '../assets/css/base.less';

import { BackTop } from '../components/BackTop';
import { useBackTop } from '../hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { sceneAtom } from '../store/atom';
import { defaultTheme } from '../assets/constants/defaultTheme';
import { DebugObserver } from '../components/Debugger';

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
      {process.env.NODE_ENV === 'development' && <DebugObserver />}
      <ThemeProvider theme={defaultTheme}>
        <div>{children}</div>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <BackTop />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default GlobalLayout;
