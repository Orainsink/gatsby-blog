import { memo, useState, lazy, Suspense } from 'react';
import { Dropdown } from 'antd';
import { Link } from 'gatsby';
import { DownOutlined } from '@ant-design/icons';

import * as styles from './index.module.less';
import ArchivesMenu from './ArchivesMenu';
const MenuDrawer = lazy(() => import('./MenuDrawer'));

const MenuComponent = ({ drawer }: { drawer: boolean }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Suspense fallback={null}>
      {drawer ? (
        <MenuDrawer />
      ) : (
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
      )}
    </Suspense>
  );
};

export default memo(MenuComponent);
