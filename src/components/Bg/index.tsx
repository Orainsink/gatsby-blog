import { memo, ReactElement } from 'react';

import * as styles from './index.module.less';
import mainBg from '../../../content/assets/mainBg.svg';

const Bg = (): ReactElement => {
  return (
    <div className={styles.bg}>
      <img src={mainBg} alt="" className={styles.bgSvg} />
    </div>
  );
};
export default memo(Bg);
