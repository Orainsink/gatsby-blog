import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';

import '../assets/css/global.css';

import { BackTop } from '../components/BackTop';
import { useIsDark } from '../hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { sceneAtom } from '../store/atom';
import { defaultTheme } from '../assets/constants/defaultTheme';
import { DebugObserver } from '../components/Debugger';
import { GlobalStyles } from '../assets/theme/globalStyles';

const Header = lazy(
  () => import(/* webpackPreload: true */ '../components/Header')
);

const { darkAlgorithm, defaultAlgorithm } = theme;

interface Props {
  children: ReactNode;
}
/**global PageElement */
const GlobalLayout = ({ children }: Props): ReactElement => {
  const scene = useRecoilValue(sceneAtom);
  const isDark = useIsDark();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  return (
    <ErrorBoundary>
      {process.env.NODE_ENV === 'development' && <DebugObserver />}
      <ConfigProvider
        theme={{
          algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <ThemeProvider theme={{ ...defaultTheme }}>
          <GlobalStyles />
          <div>{children}</div>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <BackTop />
        </ThemeProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default GlobalLayout;
