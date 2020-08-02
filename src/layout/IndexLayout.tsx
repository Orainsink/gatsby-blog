import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from '../styles/Indexlayout.module.less';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { rhythm } from '../utils/typography';
import { Row, Col } from 'antd';
import Info from '../components/SideBlocks/Info';
import TagsBlock from '../components/SideBlocks/TagsBlock';
import Comment from '../components/SideBlocks/Comment';
interface IProps {
  location: any;
  title: string;
  children?: any;
}

/**首页Layout */
const Layout = ({ location, title, children }: IProps) => {
  const { scene, trigger } = useSelector((state) => state);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'HASARROW', payload: true });
    dispatch({ type: 'SEARCH', payload: '' });
  }, [dispatch]);

  return (
    <div
      className={classnames(
        styles.wrapper,
        !scene ? styles.disActive : trigger ? styles.trigger : styles.active
      )}
      id="markdownBody"
      ref={wrapperRef}
    >
      {scene && (
        <div
          className={classnames(styles.clickTip, trigger ? styles.show : null)}
        >
          Click to slide
        </div>
      )}
      <main
        style={{
          margin: `${rhythm(5)} auto 0 auto`,
          maxWidth: '1200px',
          padding: `${rhythm(1 / 4)}`,
        }}
        className={styles.main}
      >
        <Row justify="space-between" gutter={8}>
          <Col
            flex="1 1 800px"
            className={styles.mainWrap}
            style={{
              padding: `${rhythm(1 / 2)}`,
              minHeight: `${rhythm(16)}`,
            }}
          >
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
