/**
 * 上下切换的 Trigger
 */
import * as React from 'react';
import styles from '../styles/Trigger.module.less';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

/**首页触发器 */
const Trigger: React.FC = () => {
  const { scene } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {scene && (
        <div
          className={classnames(
            styles.trigger,
            scene ? styles.bottom : styles.top
          )}
          onMouseEnter={() => {
            dispatch({ type: 'TRIGGER', payload: true });
          }}
          onMouseLeave={() => {
            dispatch({ type: 'TRIGGER', payload: false });
          }}
          onClick={() => {
            dispatch({ type: 'SCENE', payload: false });
          }}
        />
      )}
    </>
  );
};

export default React.memo(Trigger);
