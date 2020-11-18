import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import Info from '../components/SideBlocks/Info';
import Footer from '../components/Footer';
import SideBar from '../components/SideBlocks/SideBar';
import TagsBlock from '../components/SideBlocks/TagsBlock';
import Comment from '../components/SideBlocks/Comment';
import styles from '../styles/Indexlayout.module.less';
import useHasMounted from '../hooks/useHasMounted';
interface Props {
  children?: any;
}

/**index Layout */
const Layout = ({ children }: Props) => {
  const { scene, trigger, skip } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'HAS_ARROW', payload: true });
    dispatch({ type: 'CUR_TAG', payload: '' });
  }, [dispatch]);

  const hasMounted = useHasMounted();

  return (
    <div
      className={classnames(
        styles.wrapper,
        !scene || skip
          ? styles.disActive
          : trigger
          ? styles.trigger
          : styles.active
      )}
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
          </Col>
          <SideBar>
            <Info />
            <TagsBlock />
            <Comment />
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
