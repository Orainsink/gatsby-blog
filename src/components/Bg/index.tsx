import { memo, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import * as styles from './index.module.less';
import mainBg from '../../../content/assets/mainBg.svg';
import { sceneAtom } from '../../store/atom';

const Bg = (): ReactElement => {
  const scene = useRecoilValue(sceneAtom);
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
