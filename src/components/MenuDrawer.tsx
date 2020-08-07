import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Drawer, Button } from 'antd';
import { Link } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

/**
 * menu drawer for phone
 **/
const MenuDrawer: React.FC<{ location: any }> = ({ location }) => {
  const [visible, setVisible] = useState(false);
  const { scene } = useSelector((state) => state);

  /** close menu when location changes */
  useEffect(() => {
    setVisible(false);
  }, [location]);

  /**
   * fix bug.
   * When the Drawer is closed, the antd Drawer component resets the overflow style of body, causing scrolling to fail.
   **/
  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);

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
      </Drawer>
    </>
  );
};
export default React.memo(MenuDrawer);
