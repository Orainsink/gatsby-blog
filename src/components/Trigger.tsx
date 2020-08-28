/**
 * change scene Trigger
 */
import React from 'react';
import styles from '../styles/Trigger.module.less';
import { useDispatch } from 'react-redux';

/**首页触发器 */
const Trigger: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.trigger}
      onMouseEnter={() => {
        dispatch({ type: 'TRIGGER', payload: true });
      }}
      onMouseLeave={() => {
        dispatch({ type: 'TRIGGER', payload: false });
      }}
      onClick={() => {
        dispatch({ type: 'SCENE', payload: false });
        dispatch({ type: 'TRIGGER', payload: false });
      }}
    />
  );
};

export default React.memo(Trigger);
