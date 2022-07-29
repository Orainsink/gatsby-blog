import { memo, useCallback, lazy, Suspense, ReactElement } from 'react';
import classnames from 'classnames';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import * as styles from './index.module.less';
import { ReactComponent as LoadingSvg } from '../../assets/img/loading.svg';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { sceneAtom, triggerAtom } from '../../store/atom';

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

    return !scene ? styles.disActive : trigger ? styles.trigger : styles.active;
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
      <div className={classnames(styles.wrapper, dynamicSceneStyle)}>
        <Suspense fallback={<DynamicFallback />}>
          <Dynamic />
        </Suspense>

        <ArrowSvg className={styles.arrow} onClick={handleScene} />
      </div>
    </ReactScrollWheelHandler>
  );
});
