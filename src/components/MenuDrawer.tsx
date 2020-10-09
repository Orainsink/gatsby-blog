import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Drawer, Button } from 'antd';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import Image from 'gatsby-image';
import useDrawerCloseEffect from '../hooks/useDrawerCloseEffect';
import styles from '../styles/Header.module.less';

/**
 * menu drawer for phone
 **/
const MenuDrawer: React.FC<{ location: any }> = ({ location }) => {
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
          <li>
            <Link to="/archives">archives</Link>
          </li>
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
