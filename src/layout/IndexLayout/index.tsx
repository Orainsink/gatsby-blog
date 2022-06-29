import { useEffect, useState, ReactNode, memo, ReactElement } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import SideBar, { Info, TagsBlock, Tools } from '../../components/SideBlocks';
import * as styles from './index.module.less';
import { useBackgroundColor } from '../../hooks';
import Comment from '../../components/Comment';
import { iRootState } from '../../redux/store';
import Footer from '../../components/Footer';

interface Props {
  children: ReactNode;
}

/**index Layout */
const Layout = ({ children }: Props): ReactElement => {
  const { scene, trigger, skip } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const [wrapperClass, setWrapperClass] = useState('');

  useBackgroundColor(skip);

  useEffect(() => {
    dispatch({ type: 'HAS_ARROW', payload: true });
    dispatch({ type: 'CUR_TAG', payload: '' });
  }, [dispatch]);

  useEffect(() => {
    setWrapperClass(
      !scene || skip
        ? styles.disActive
        : trigger
        ? styles.trigger
        : styles.active
    );
  }, [scene, skip, trigger]);

  return (
    <div className={classnames(styles.wrapper, wrapperClass)} id="markdownBody">
      {scene && !skip && (
        <div
          className={classnames(styles.clickTip, trigger ? styles.show : null)}
        >
          Click to slide
        </div>
      )}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.mainWrap}>
            {children}
            <Comment />
          </div>
          <SideBar>
            <Info />
            <TagsBlock />
            <Tools />
          </SideBar>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default memo(Layout);
