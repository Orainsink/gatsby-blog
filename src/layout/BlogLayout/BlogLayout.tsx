import { useEffect, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';

import { hasArrowAtom, sceneAtom, skipAtom } from '../../store/atom';
import { Info, SideBar } from '../../components/SideBlocks';
import * as styles from '../IndexLayout/index.module.less';
import { useBackgroundColor } from '../../hooks';
import { useSetRecoilState } from 'recoil';
import { Footer } from '../../components/Footer';
import { Bg } from '../../components/Bg';

interface Props {
  content?: ReactNode;
  sideBlocks?: ReactNode;
  children?: ReactNode;
}

/** blog posts Layout */
export const Layout = (props: Props): ReactElement => {
  const { sideBlocks, children } = props;
  const setSkip = useSetRecoilState(skipAtom);
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const setScene = useSetRecoilState(sceneAtom);
  useBackgroundColor();

  useEffect(() => {
    setSkip(true);
    setHasArrow(false);
    setScene(false);

    localStorage.setItem('SCENE', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <Bg />
      <main className={classnames(styles.main, styles.container)} id="main">
        <div className={styles.mainWrap}>{children}</div>
        <SideBar>
          <Info />
          {sideBlocks}
        </SideBar>
      </main>
      <Footer />
    </div>
  );
};
