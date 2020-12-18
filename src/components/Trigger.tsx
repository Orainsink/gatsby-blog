import React, { useCallback } from 'react';
import styles from '../styles/Trigger.module.less';
import { useDispatch } from 'react-redux';

/**
 * scene Trigger
 */
const Trigger = () => {
  const dispatch = useDispatch();

  const setTrigger = useCallback(
    (boo: boolean) => dispatch({ type: 'TRIGGER', payload: boo }),
    [dispatch]
  );

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
