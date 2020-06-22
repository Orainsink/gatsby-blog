import React from 'react';
import Image from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

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
  return (
    <Image
      fixed={data.bg.childImageSharp.fixed}
      alt={'bg'}
      style={{
        width: '100%',
        height: '270px',
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};
export default React.memo(Bg);
