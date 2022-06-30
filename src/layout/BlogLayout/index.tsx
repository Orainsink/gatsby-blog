import { memo, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import Info from '../../components/SideBlocks/Info';
import SideBar from '../../components/SideBlocks/SideBar';
import * as styles from '../IndexLayout/index.module.less';
import { useBackgroundColor } from '../../hooks';
import Footer from '../../components/Footer';
interface Props {
  content?: ReactNode;
  sideBlocks?: ReactNode;
  children?: ReactNode;
}

/** blog posts Layout */
const Layout = (props: Props): ReactElement => {
  const { sideBlocks, children } = props;
  const dispatch = useDispatch();
  useBackgroundColor();

  useEffect(() => {
    dispatch({ type: 'SKIP', payload: true });
    dispatch({ type: 'HAS_ARROW', payload: false });
    dispatch({ type: 'SCENE', payload: false });
    globalThis.localStorage?.setItem('SCENE', '');
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
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

export default memo(Layout);
