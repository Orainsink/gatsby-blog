import React, { useContext } from 'react';
import styles from '../styles/Header.module.less';
import { MainContext } from '../context/MainContext';
import classnames from 'classnames';
import { Avatar } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { rhythm } from '../utils/typography';

const Header: React.SFC = () => {
  const data = useStaticQuery(graphql`
    query HeadQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <div className={styles.wrapper}>
      <Avatar
        icon={
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt=""
            style={{
              /* marginRight: rhythm(1 / 2),
          marginBottom: 0, */
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        }
      />
    </div>
  );
};

export default Header;
