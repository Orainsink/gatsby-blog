import { ReactElement } from 'react';

import * as styles from './index.module.less';
import mainBg from '../../../content/assets/mainBg.svg';

export const Bg = (): ReactElement => {
  return (
    <div className={styles.bg}>
      <img src={mainBg} alt="" className={styles.bgSvg} />
    </div>
  );
};
