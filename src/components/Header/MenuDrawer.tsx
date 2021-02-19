import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Drawer } from 'antd';
import { Link } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useDrawerCloseEffect, useMedia } from '../../hooks';
import styles from '../../styles/Header.module.less';
import { useLocation } from '@reach/router';
import { ReactComponent as SharkMenuSvg } from '../../assets/img/menu.svg';
import { categoryColumn } from '../../assets/config/categories';

/**
 * menu drawer for mobile phone
 **/
const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
  useDrawerCloseEffect(visible);
  const is520 = useMedia('(max-width: 520px)');

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
        icon={<UnorderedListOutlined style={{ fontSize: '26px' }} />}
        onClick={() => setVisible(true)}
      >
        {is520 ? null : <span style={{ fontSize: '24px' }}>MENU</span>}
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
              {categoryColumn.map((category) => (
                <li key={category.key}>
                  <Link to={category.path}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
        <div className={styles.menuShasha}>
          <SharkMenuSvg />
        </div>
      </Drawer>
    </>
  );
};
export default React.memo(MenuDrawer);
