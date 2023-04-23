import { useEffect, ReactElement, ReactNode, lazy, Suspense } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { StyleProvider } from '@ant-design/cssinjs';

import '../assets/css/prism-theme.css';

import { BackTop } from '../components/BackTop';
import { useIsDark } from '../hooks';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { sceneAtom } from '../store/atom';
import { defaultTheme } from '../assets/constants/defaultTheme';
// import { DebugObserver } from '../components/Debugger';
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
      {/* {isDevelopment && <DebugObserver />} */}
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
            token: {
              fontSize: 16,
              lineHeight: 1.6,
              colorPrimary: isDark ? '#faad14' : '#1677ff',
              colorPrimaryHover: 'var(--color-primary-active)',
              colorText: 'var(--color-text)',
              colorTextQuaternary: 'var(--color-text-disabled)',
              colorLink: 'var(--color-link)',
              colorLinkActive: 'var(--color-link-hover)',
              colorLinkHover: 'var(--color-link-active)',
              colorBorder: 'var(--color-border)',
              colorBorderSecondary: 'var(--color-border-secondary)',
              colorTextTertiary: 'var(--color-text-third)',
              colorSplit: 'var(--color-border)',
              // colorBgContainer: 'var(--color-bg-container)',
              colorBgContainerDisabled: 'var(--color-bg-container-disabled)',
              colorTextDisabled: 'var(--color-text-disabled)',
            },
            components: {
              Anchor: {
                fontSize: 14,
              },
            },
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
      </StyleProvider>
    </ErrorBoundary>
  );
};

export default GlobalLayout;
