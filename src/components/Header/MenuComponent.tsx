import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { Link } from 'gatsby';
import { DownOutlined } from '@ant-design/icons';
import loadable from '@loadable/component';

import * as styles from './index.module.less';
import ArchivesMenu from './ArchivesMenu';
const MenuDrawer = loadable(() => import('./MenuDrawer'));

const MenuComponent = ({ drawer }: { drawer: boolean }) => {
  const [visible, setVisible] = useState(false);
  if (drawer) {
    return <MenuDrawer />;
  } else
    return (
      <ul className={styles.nav}>
        <Link to="/">
          <li>home</li>
        </Link>

        <Dropdown
          overlay={<ArchivesMenu visible={visible} />}
          arrow
          overlayClassName={styles.dropWrapper}
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <li>
            <span>
              archives <DownOutlined />
            </span>
          </li>
        </Dropdown>

        <Link to="/about/1438181566">
          <li>about</li>
        </Link>
      </ul>
    );
};

export default React.memo(MenuComponent);
