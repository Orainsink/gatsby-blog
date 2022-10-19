import { memo, useCallback, lazy, Suspense, ReactElement } from 'react';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import { ReactComponent as LoadingSvg } from '../../assets/img/loading.svg';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { sceneAtom, triggerAtom } from '../../store/atom';

const activeStyles = css`
  top: 0;
  width: 100%;
`;

const disActiveStyles = css`
  top: -100vh;
  visibility: hidden;
`;

const triggerStyles = css`
  transform: translateY(-10vh);
  top: 0;
  width: 100%;
`;

const CanvasContainer = styled.div<{
  status: 'disActive' | 'trigger' | 'active';
}>`
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  user-select: none;
  background: #0a0a0a;
  transition: all 0.5s ease-out;

  ${({ status }) => {
    switch (status) {
      case 'disActive':
        return disActiveStyles;
      case 'active':
        return activeStyles;
      case 'trigger':
        return triggerStyles;
      default:
        return;
    }
  }}
`;

const arrowAme = keyframes`
0% {
  opacity: 1;
  transform: translateX(0);
}
5% {
  transform: translateX(-0.1rem);
}
100% {
  transform: translateX(1rem);
  opacity: 0;
}`;

const arrowFixedAme = keyframes`
5% {
  opacity: 0;
}
20% {
  opacity: 0.4;
}
100% {
  opacity: 1;
}`;

const Arrow = styled(ArrowSvg)`
  width: 40px;
  height: 17px;
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  margin: auto;
  bottom: 10px;
  left: 0;
  right: 0;
  cursor: pointer;
  overflow: visible;
  transform: rotate(90deg) scale(1.4);
  path {
    transition: all 1.5s cubic-bezier(0.2, 1, 0.3, 1);
  }
  path:nth-child(1) {
    animation: ${arrowAme} 1.5s cubic-bezier(0.2, 1, 0.3, 1) infinite running;
  }
  path:nth-child(2) {
    animation: ${arrowFixedAme} 1.5s cubic-bezier(0.2, 1, 0.3, 1) infinite
      running;
  }
`;

const Dynamic = lazy(() => import(/* webpackPrefetch: true */ './Dynamic'));
const DynamicFallback = (): ReactElement => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LoadingSvg />
  </div>
);

const dynamicSceneStyleSelector = selector({
  key: 'dynamicSceneStyle',
  get: ({ get }) => {
    const scene = get(sceneAtom);
    const trigger = get(triggerAtom);

    return !scene ? 'disActive' : trigger ? 'trigger' : 'active';
  },
});

export const HomeScene = memo((): ReactElement => {
  const setScene = useSetRecoilState(sceneAtom);
  const dynamicSceneStyle = useRecoilValue(dynamicSceneStyleSelector);

  const handleScene = useCallback(() => {
    setScene(false);
  }, [setScene]);

  return (
    <ReactScrollWheelHandler downHandler={handleScene}>
      <CanvasContainer status={dynamicSceneStyle}>
        <Suspense fallback={<DynamicFallback />}>
          <Dynamic />
        </Suspense>

        <Arrow onClick={handleScene} />
      </CanvasContainer>
    </ReactScrollWheelHandler>
  );
});
