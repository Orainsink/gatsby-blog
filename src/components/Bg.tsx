import React from 'react';
import Image from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import styles from '../styles/Bg.module.less';
import { useSelector } from 'react-redux';

const Bg = () => {
  const data = useStaticQuery(graphql`
    query BgQuery {
      bg: file(absolutePath: { regex: "/mainBg.png/" }) {
        childImageSharp {
          fixed(width: 1280, height: 800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { scene } = useSelector((state: any) => state);

  return (
    <Image
      fixed={data.bg.childImageSharp.fixed}
      alt={'bg'}
      style={{
        width: '100%',
        height: '270px',
        top: scene ? '100vh' : '0',
        transition: 'all 0.5s ease-out',
        zIndex: 0,
        position: 'absolute',
      }}
      className={styles.bg}
    />
  );
};
export default React.memo(Bg);
