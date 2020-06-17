import React, { useContext,useRef } from 'react';
import styles from '../styles/Header.module.less';
import { MainContext } from '../redux/Provider';
import classnames from 'classnames';
import { Avatar } from 'antd';
<<<<<<< HEAD
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
=======
import Player from './Player'

/**Header */
const Header:React.FC = () => {

  return (
    <div className={styles.wrapper}>
      {/* <Avatar /> */}
      <Player />
>>>>>>> 5a2c81e2a8dd645dfa682425a4bb0c46e9dee7d1
    </div>
  );
};

export default Header;
