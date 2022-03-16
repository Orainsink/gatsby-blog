import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './index.module.less';
import { iRootState } from '../../redux/store';

/**
 * scene Trigger
 */
const Trigger = () => {
  const dispatch = useDispatch();
  const { skip, scene } = useSelector((state: iRootState) => state);

  const setTrigger = useCallback(
    (boo: boolean) => dispatch({ type: 'TRIGGER', payload: boo }),
    [dispatch]
  );

  if (skip || !scene) return null;

  return (
    <div
      className={styles.trigger}
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
      onClick={() => {
        dispatch({ type: 'SCENE', payload: false });
        setTrigger(false);
      }}
    />
  );
};

export default React.memo(Trigger);
