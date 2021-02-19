import React from 'react';
import styles from '../styles/Bg.module.less';
import { useSelector } from 'react-redux';
import mainBg from '../../content/assets/mainBg.svg';
import { iRootState } from '../redux/store';

const Bg = () => {
  const { scene } = useSelector((state: iRootState) => state);

  return (
    <div className={styles.bg} style={{ top: scene ? '100vh' : '0' }}>
      <img src={mainBg} alt="" className={styles.bgSvg} />
    </div>
  );
};
export default React.memo(Bg);
