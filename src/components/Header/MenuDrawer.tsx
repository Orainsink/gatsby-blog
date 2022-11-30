import { memo, ReactElement, useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { Link } from 'gatsby';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useLocation } from '@reach/router';
import styled from 'styled-components';

import { useDrawerCloseEffect } from '../../hooks';
import SharkMenuSvg from '../../assets/img/menu.svg';
import { CATEGORY_MAP } from '../../assets/constants/categories';
import { NavUl } from './Header.styles';

const DrawerBtn = styled(UnorderedListOutlined)`
  border: none;
  color: inherit;
  font-size: 28px;
  font-weight: 700;
  margin-right: 15px;
`;

const DrawerTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
`;

const DrawerNavUl = styled(NavUl)`
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  margin: 0;

  a {
    width: 70%;
    display: block;
  }

  li {
    width: 100%;
    margin: 0;
    &::after {
      background-color: var(--color-text);
    }
  }
`;

const ShaSha = styled.div`
  pointer-events: none;
  user-select: none;
`;

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
      <DrawerBtn
        style={{ fontSize: '26px' }}
        onClick={() => setVisible(true)}
      />
      {/* <DrawerBtn
        size="middle"
        ghost
        icon={}
        
      /> */}
      <Drawer
        title={<DrawerTitle>MENU</DrawerTitle>}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <DrawerNavUl>
          <Link to="/">
            <li>home</li>
          </Link>

          <div style={{ width: '100%' }}>
            <div style={{ padding: '12px 0' }}>archives</div>
            <ul>
              {[...CATEGORY_MAP.values()].map((item) => (
                <Link to={item.path} key={item.name}>
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <Link to="/about/">
            <li>about</li>
          </Link>
        </DrawerNavUl>
        <ShaSha>
          <img src={SharkMenuSvg} alt="" />
        </ShaSha>
      </Drawer>
    </>
  );
};
export default memo(MenuDrawer);
