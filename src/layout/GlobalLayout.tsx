import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import '../assets/css/base.less';

import { BackTop } from '../components/BackTop';
import { useBackTop } from '../hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useRecoilValue } from 'recoil';
import { sceneAtom } from '../store/atom';
import { defaultTheme } from '../assets/constants/defaultTheme';

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
