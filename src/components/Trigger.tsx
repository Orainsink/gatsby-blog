/**
 * 上下切换的 Trigger
 */
import * as React from 'react';
import { useContext } from 'react';
import styles from '../styles/Trigger.module.less';
import { MainContext } from '../context/MainContext';
import classnames from 'classnames';

const Trigger = () => {
  const [state, dispatch] = useContext(MainContext);
  const { scene } = state;

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

export default Trigger;
