import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import styles from '../styles/Bloglayout.module.less';
import Info from '../components/SideBlocks/Info';
import SideBar from './SideBar';
import Footer from '../components/Footer';

interface Props {
  content?: any;
  location: any;
  sideBlocks?: React.ReactNode;
  children?: any;
}
const isBrowser = typeof window !== `undefined`;
/** blog posts Layout */
const Layout: React.FC<Props> = (props) => {
  const { sideBlocks, children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SKIP', payload: true });
    dispatch({ type: 'HAS_ARROW', payload: false });
    dispatch({ type: 'SCENE', payload: false });
    isBrowser && localStorage.setItem('SCENE', '');
  }, [dispatch]);

  useEffect(() => {
    document.body.style.background = '#efefef';
  }, []);

  return (
    <div className={styles.wrapper}>
      <main
        style={{
          margin: `8.05em auto 0 auto`,
          maxWidth: '1200px',
          padding: `0.4em`,
        }}
        className={styles.main}
        id="main"
      >
        <Row justify="space-between" gutter={8}>
          <Col flex="1 1 800px" className={styles.mainWrap}>
            {children}
          </Col>
          <SideBar>
            <Info />
            {sideBlocks}
          </SideBar>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
