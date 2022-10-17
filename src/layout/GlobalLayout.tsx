import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';

import '../assets/css/variables.less';
import '../assets/css/global.less';
import { BackTop } from '../components/BackTop';
import { useBackTop } from '../hooks';
import '../assets/css/base.less';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useRecoilValue } from 'recoil';
import { sceneAtom } from '../store/atom';
import { MediaQueryMap } from '../assets/constants/breakPoints';

const Header = lazy(
  () => import(/* webpackPreload: true */ '../components/Header')
);

const getTheme = () => ({
  media: MediaQueryMap,
});

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
      <ThemeProvider theme={getTheme}>
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
