import React, { useContext, useRef, useEffect } from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Avatar } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { rhythm } from '../utils/typography';

/**Header */
const Header: React.FC = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  useEffect(() => {
    fetch('https://www.note52.com/api/soul/random', {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const { author, social } = data.site.siteMetadata;

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          padding: `0 ${rhythm(3 / 4)}`,
          maxWidth: rhythm(24),
          position: 'relative',
        }}
      >
        <Image
          className={styles.avatar}
          fixed={data.avatar.childImageSharp.fixed}
          alt={author.name}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <div>{''}</div>
      </div>
    </div>
  );
};

export default React.memo(Header);
