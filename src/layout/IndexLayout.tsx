import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import Info from '../components/SideBlocks/Info';
import Footer from '../components/Footer';
import SideBar from '../components/SideBlocks/SideBar';
import TagsBlock from '../components/SideBlocks/TagsBlock';
import styles from '../styles/Indexlayout.module.less';
import useBackgroundColor from '../hooks/useBackgroundColor';
import loadable from '@loadable/component';
const Tools = loadable(() => import('../components/SideBlocks/Tools'));
const MyGitalk = loadable(() => import('../components/MyGitalk'));

interface Props {
  children?: any;
}

/**index Layout */
const Layout = ({ children }: Props) => {
  const { scene, trigger, skip } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
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
    <div
      className={classnames(styles.wrapper, wrapperClass)}
      id="markdownBody"
      ref={wrapperRef}
    >
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
            <MyGitalk title="首页评论" />
          </Col>
          <SideBar>
            <Info />
            <TagsBlock />
            <Tools />
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
