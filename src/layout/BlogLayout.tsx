import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import styles from '../styles/BlogLayout.module.less';

import { rhythm } from '../utils/typography';
interface IProps {
  location: any;
  title: string;
  children?: any;
}
/**文章页Layout */
const Layout = ({ location, title, children }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SKIP', payload: true });
    dispatch({ type: 'HASARROW', payload: false });
  }, []);

  useEffect(() => {
    dispatch({ type: 'SCENE', payload: false });

    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'auto';
  }, []);

  return (
    <div className={styles.wrapper}>
      <main
        style={{
          margin: `${rhythm(5)} auto 0 auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(1 / 4)}`,
        }}
      >
        <div
          style={{
            background: '#FFF',
            padding: `${rhythm(1 / 2)}`,
            borderRadius: '2px',
            minHeight: `${rhythm(16)}`,
            boxShadow:
              '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
          }}
        >
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
