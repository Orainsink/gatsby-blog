import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { iRootState } from '../../redux/store';
import classnames from 'classnames';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import loadable from '@loadable/component';
import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import * as styles from './index.module.less';
import { ReactComponent as LoadingSvg } from '../../assets/img/loading.svg';
const Dynamic = loadable(() => import('./Dynamic'), {
  fallback: (
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
  ),
});

const Wrapper = () => {
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
        <Dynamic />
        <ArrowSvg className={styles.arrow} onClick={handleScene} />
      </div>
    </ReactScrollWheelHandler>
  );
};
export default React.memo(Wrapper);
