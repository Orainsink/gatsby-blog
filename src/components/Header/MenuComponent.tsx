import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { Link } from 'gatsby';
import { DownOutlined } from '@ant-design/icons';
import loadable from '@loadable/component';
import styles from '../../styles/Header.module.less';
import ArchivesMenu from './ArchivesMenu';
const MenuDrawer = loadable(() => import('./MenuDrawer'));

const MenuComponent = ({ drawer }: { drawer: boolean }) => {
  const [visible, setVisible] = useState(false);
  if (drawer) {
    return <MenuDrawer />;
  } else
    return (
      <ul className={styles.nav}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Dropdown
            overlay={<ArchivesMenu visible={visible} />}
            arrow
            overlayClassName={styles.dropWrapper}
            onVisibleChange={(visible) => setVisible(visible)}
          >
            <span>
              archives <DownOutlined />
            </span>
          </Dropdown>
        </li>
        <li>
          <Link to="/about/1438181566">about</Link>
        </li>
      </ul>
    );
};

export default React.memo(MenuComponent);
