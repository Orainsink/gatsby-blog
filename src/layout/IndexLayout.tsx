import React, { useEffect } from 'react';
import classnames from 'classnames';
import styles from '../styles/Indexlayout.module.less';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Bg from '../components/Bg';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  skip?: boolean;
  location: any;
  title: string;
  children?: any;
}

/**首页Layout */
const Layout = ({ location, title, children, skip = false }: IProps) => {
  const { scene, trigger, fromBlog } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (scene) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'scroll';
    }
  }, [scene]);

  return (
    <div
      className={classnames(
        styles.wrapper,
        !scene ? styles.disActive : trigger ? styles.trigger : styles.active,
        skip ? styles.skip : null
      )}
      style={{ transition: fromBlog ? 'unset' : 'transform 0.5s ease-out' }}
    >
      <Bg />
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
