import {
  memo,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  ReactElement,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

import { iRootState } from '../../redux/store';
import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import * as styles from './index.module.less';

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
  />
);

const Wrapper = (): ReactElement => {
  const { scene, trigger } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();

  const handleScene = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  const curStyle = useMemo<string>(
    () =>
      !scene ? styles.disActive : trigger ? styles.trigger : styles.active,
    [scene, trigger]
  );

  return (
    <ReactScrollWheelHandler downHandler={handleScene}>
      <div className={classnames(styles.wrapper, curStyle)}>
        <Suspense fallback={<DynamicFallback />}>
          <Dynamic />
        </Suspense>

        <ArrowSvg className={styles.arrow} onClick={handleScene} />
      </div>
    </ReactScrollWheelHandler>
  );
};
export default memo(Wrapper);
