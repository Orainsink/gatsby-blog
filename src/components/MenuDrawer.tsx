import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Drawer } from 'antd';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import Image from 'gatsby-image';
import { useDrawerCloseEffect } from '../hooks';
import styles from '../styles/Header.module.less';
import { useLocation } from '@reach/router';

/**
 * menu drawer for mobile phone
 **/
const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
  useDrawerCloseEffect(visible);

  const data = useStaticQuery(graphql`
    query shasha3Query {
      sharkMenu: file(absolutePath: { regex: "/menu.jpg/" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { sharkMenu } = data;
  const location = useLocation();

  /** close menu when location changes */
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <>
      <Button
        size="middle"
        ghost
        className={styles.drawerBtn}
        icon={<UnorderedListOutlined />}
        onClick={() => setVisible(true)}
      >
        MENU
      </Button>
      <Drawer
        title={<span className={styles.drawerTitle}>MENU</span>}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <ul className={classnames(styles.nav, styles.drawerNav)}>
          <li>
            <Link to="/">home</Link>
          </li>
          <div style={{ width: '100%' }}>
            <div style={{ padding: '12px 0' }}>archives</div>
            <ul>
              <li>
                <Link to="/archives">技术</Link>
              </li>
              <li>
                <Link to="/leetcode">Leetcode</Link>
              </li>
              <li>
                <Link to="/snippet">Snippet</Link>
              </li>
              <li>
                <Link to="/essay">随笔</Link>
              </li>
            </ul>
          </div>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
        <div className={styles.menuShasha}>
          <Image fixed={sharkMenu.childImageSharp.fixed} alt="" />
        </div>
      </Drawer>
    </>
  );
};
export default React.memo(MenuDrawer);
