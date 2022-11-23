import { useState, lazy, Suspense, ReactElement } from 'react';
import { Dropdown } from 'antd';
import { Link } from 'gatsby';
import { DownOutlined } from '@ant-design/icons';

import { ArchivesMenu } from './ArchivesMenu';
import { NavUl } from './Header.styles';
const MenuDrawer = lazy(() => import('./MenuDrawer'));

interface Props {
  drawer: boolean;
}

export const MenuComponent = ({ drawer }: Props): ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <Suspense fallback={null}>
      {drawer ? (
        <MenuDrawer />
      ) : (
        <NavUl>
          <Link to="/">
            <li>home</li>
          </Link>

          <Dropdown
            dropdownRender={() => <ArchivesMenu visible={visible} />}
            onOpenChange={(visible) => setVisible(visible)}
          >
            <li>
              archives <DownOutlined />
            </li>
          </Dropdown>

          <Link to="/about/1438181566">
            <li>about</li>
          </Link>
        </NavUl>
      )}
    </Suspense>
  );
};
