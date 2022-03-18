import { memo } from 'react';
import { useSelector } from 'react-redux';

import * as styles from './index.module.less';
import mainBg from '../../../content/assets/mainBg.svg';
import { iRootState } from '../../redux/store';

const Bg = () => {
  const { scene } = useSelector((state: iRootState) => state);

  return (
    <div
      data-testid="bg"
      className={styles.bg}
      style={{ top: scene ? '100vh' : '0' }}
    >
      <img src={mainBg} alt="" className={styles.bgSvg} />
    </div>
  );
};
export default memo(Bg);
