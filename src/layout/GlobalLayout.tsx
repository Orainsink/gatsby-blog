import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import theme from 'antd/es/theme/export';

import '../assets/css/variables.css';
import '../assets/css/global.less';

import { BackTop } from '../components/BackTop';
import { useBackTop, useIsDark } from '../hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { sceneAtom } from '../store/atom';
import { defaultTheme } from '../assets/constants/defaultTheme';
import { DebugObserver } from '../components/Debugger';

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

  useBackTop();
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = scene ? 'hidden' : 'auto';
  }, [scene]);

  return (
    <ErrorBoundary>
      {process.env.NODE_ENV === 'development' && <DebugObserver />}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
          algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <ThemeProvider theme={defaultTheme}>
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
