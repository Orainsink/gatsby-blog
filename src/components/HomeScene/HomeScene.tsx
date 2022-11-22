import { memo, useCallback, lazy, Suspense, ReactElement } from 'react';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import { ReactComponent as LoadingSvg } from '../../assets/img/loading.svg';
import { selector, useSetRecoilState } from 'recoil';
import { sceneAtom, triggerAtom } from '../../store/atom';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
  user-select: none;
  background: #0a0a0a;
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

const DynamicLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dynamic = lazy(() => import(/* webpackPrefetch: true */ './Dynamic'));
const DynamicFallback = (): ReactElement => (
  <DynamicLoading>
    <LoadingSvg />
  </DynamicLoading>
);

export const HomeScene = memo((): ReactElement => {
  const setScene = useSetRecoilState(sceneAtom);

  const handleScene = useCallback(() => {
    setScene(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactScrollWheelHandler downHandler={handleScene}>
      <CanvasContainer>
        <Suspense fallback={<DynamicFallback />}>
          <Dynamic />
        </Suspense>

        <Arrow onClick={handleScene} />
      </CanvasContainer>
    </ReactScrollWheelHandler>
  );
});
