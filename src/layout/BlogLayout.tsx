import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { rhythm } from '../utils/typography';
import styles from '../styles/Bloglayout.module.less';
import { Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Info from '../components/SideBlocks/Info';
import useWindowSize from '../hooks/useWindowSize';
import Catalog from '../components/SideBlocks/Catalog';

interface IProps {
  content?: any;
  location: any;
  title: string;
  hasCatalog?: boolean; // 是否有目录, 默认 false
  children?: any;
}
/**文章页Layout */
const Layout = (props: IProps) => {
  const { content, hasCatalog = false, children } = props;
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  useEffect(() => {
    dispatch({ type: 'SKIP', payload: true });
    dispatch({ type: 'HASARROW', payload: false });
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
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
            {width > 1110 && hasCatalog ? <Catalog content={content} /> : null}
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
