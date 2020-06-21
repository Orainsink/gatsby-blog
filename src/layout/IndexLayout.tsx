import React, { useEffect } from 'react';
// import { Link } from 'gatsby';
import classnames from 'classnames';
import styles from '../styles/layout.module.less';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  skip?: boolean;
  location: any;
  title: string;
  children?: any;
}
/**首页Layout */
const Layout = ({ location, title, children, skip = false }: IProps) => {
  const data = useStaticQuery(graphql`
    query IndexLayoutQuery {
      bg: file(absolutePath: { regex: "/mainBg.png/" }) {
        childImageSharp {
          fixed(width: 1280, height: 800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { scene, trigger } = useSelector((state) => state);
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
    >
      <Image
        className={styles.bg}
        fixed={data.bg.childImageSharp.fixed}
        alt={'bg'}
        style={{
          width: '100%',
          height: '270px',
          position: 'absolute',
        }}
      />
      <main
        style={{
          // padding: `${rhythm(3.5)} ${rhythm(3 / 4)}`,
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
