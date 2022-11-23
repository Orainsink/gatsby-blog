import { useState, lazy, Suspense, ReactElement } from 'react';
import { Dropdown, DropdownProps } from 'antd';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';

import { ArchivesMenu } from './ArchivesMenu';
import { NavUl } from './Header.styles';
const MenuDrawer = lazy(() => import('./MenuDrawer'));

interface Props {
  drawer: boolean;
}

const WrappedDropDown = ({ className, ...rest }: DropdownProps) => (
  <Dropdown overlayClassName={className} {...rest} />
);

const StyledDropDown = styled(WrappedDropDown)`
  .ant-dropdown-arrow {
    border-color: transparent;
  }
`;

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

          <StyledDropDown
            dropdownRender={() => <ArchivesMenu visible={visible} />}
            onOpenChange={(visible) => setVisible(visible)}
          >
            <li>
              archives <DownOutlined />
            </li>
          </StyledDropDown>

          <Link to="/about/1438181566">
            <li>about</li>
          </Link>
        </NavUl>
      )}
    </Suspense>
  );
};
