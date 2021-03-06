import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import SideBar, { Info } from '../../components/SideBlocks';
import * as styles from './index.module.less';
import { useBackgroundColor } from '../../hooks';
import loadable from '@loadable/component';
const Footer = loadable(() => import('../../components/Footer'));
interface Props {
  content?: React.ReactNode;
  sideBlocks?: React.ReactNode;
  children?: React.ReactNode;
}

/** blog posts Layout */
const Layout = (props: Props) => {
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
