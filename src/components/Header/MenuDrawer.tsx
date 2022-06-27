import { memo, ReactElement, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Drawer } from 'antd';
import { Link } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useLocation } from '@reach/router';

import { useDrawerCloseEffect } from '../../hooks';
import * as styles from './index.module.less';
import SharkMenuSvg from '../../assets/img/menu.svg';
import { CATEGORY_MAP } from '../../assets/constants/categories';

/**
 * menu drawer for mobile phone
 **/
const MenuDrawer = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  useDrawerCloseEffect(visible);

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
      />
      <Drawer
        title={<span className={styles.drawerTitle}>MENU</span>}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <ul className={classnames(styles.nav, styles.drawerNav)}>
          <Link to="/">
            <li>home</li>
          </Link>

          <div style={{ width: '100%' }}>
            <div style={{ padding: '12px 0' }}>archives</div>
            <ul className={styles.subUl}>
              {[...CATEGORY_MAP.values()].map((item) => (
                <Link to={item.path} key={item.name}>
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <Link to="/about/1438181566">
            <li>about</li>
          </Link>
        </ul>
        <div className={styles.menuShasha}>
          <img src={SharkMenuSvg} alt="" />
        </div>
      </Drawer>
    </>
  );
};
export default memo(MenuDrawer);
