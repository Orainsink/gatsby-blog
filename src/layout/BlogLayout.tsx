import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import Footer from '../components/Footer';
import Bg from '../components/Bg';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/BlogLayout.module.less';
import classnames from 'classnames';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  location: any;
  title: string;
  children?: any;
}
/**文章页Layout */
const Layout = ({ location, title, children }: IProps) => {
  const { scene, trigger } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SCENE', payload: false });

    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'scroll';
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <Header /> */}
      {/* <Bg /> */}
      <main
        style={{
          margin: `${rhythm(5)} auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(1 / 4)}`,
        }}
      >
        <div
          style={{
            background: '#FFF',
            padding: `${rhythm(1 / 2)}`,
            borderRadius: '2px',
            boxShadow:
              '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
          }}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
