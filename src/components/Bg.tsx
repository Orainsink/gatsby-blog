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

  const { scene } = useSelector((state) => state);

  return (
    <Image
      fixed={data.bg.childImageSharp.fixed}
      alt={'bg'}
      style={{
        width: '100%',
        height: scene ? 0 : '270px',
        transition: 'height 0.6s ease-in',
      }}
      className={styles.bg}
    />
  );
};
export default React.memo(Bg);
