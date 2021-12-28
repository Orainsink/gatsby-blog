import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import SideBar from '../../components/SideBlocks';
import * as styles from './index.module.less';
import { useBackgroundColor } from '../../hooks';
import Comment from '../../components/Comment';
import { iRootState } from '../../redux/store';
import Footer from '../../components/Footer';

interface Props {
  children?: React.ReactNode;
}

/**index Layout */
const Layout = ({ children }: Props) => {
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
        <Row justify="space-between" gutter={8}>
          <Col flex="1 1 800px" className={styles.mainWrap}>
            {children}
            <Comment />
          </Col>
          <SideBar>
            <SideBar.Info />
            <SideBar.TagsBlock />
            <SideBar.Tools />
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
