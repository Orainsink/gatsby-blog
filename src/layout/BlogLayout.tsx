import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/Bloglayout.module.less';
import { Row, Col } from 'antd';
import loadable from '@loadable/component';
import useWindowSize from '../useHooks/useWindowSize';
const SideBar = loadable(() => import('./SideBar'));
const Footer = loadable(() => import('../components/Footer'));
const Info = loadable(() => import('../components/SideBlocks/Info'));
const Contents = loadable(() => import('../components/SideBlocks/Contents'));
const Comment = loadable(() => import('../components/SideBlocks/Comment'));

interface IProps {
  content?: any;
  location: any;
  hasContents?: boolean; // default false
  hasComment?: boolean; // default false
  children?: any;
}
/** blog posts Layout */
const Layout = (props: IProps) => {
  const { content, hasContents = false, hasComment = false, children } = props;
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  useEffect(() => {
    dispatch({ type: 'SKIP', payload: true });
    dispatch({ type: 'HAS_ARROW', payload: false });
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <main
        style={{
          margin: `8.05em auto 0 auto`,
          maxWidth: '1200px',
          padding: `0.4em`,
        }}
        className={styles.main}
      >
        <Row justify="space-between" gutter={8}>
          <Col flex="1 1 800px" className={styles.mainWrap}>
            {children}
          </Col>
          <SideBar>
            <Info />
            {width > 1110 && hasContents && content ? (
              <Contents content={content} />
            ) : null}
            {hasComment && <Comment />}
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
