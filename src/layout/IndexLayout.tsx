import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from '../styles/Indexlayout.module.less';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';

import { rhythm } from '../utils/typography';
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
          maxWidth: rhythm(32),
          padding: `${rhythm(1 / 4)}`,
        }}
        className={styles.main}
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
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
