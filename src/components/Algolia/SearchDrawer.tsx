import { ReactElement, useEffect } from 'react';
import { Drawer } from 'antd';
import { useLocation } from '@reach/router';
import styled from 'styled-components';

import { Search } from './Search';
import { useMedia, useDrawerCloseEffect } from '../../hooks';

const StyledDrawer = styled(Drawer)`
  .ant-input-group-addon {
    background-color: var(--main-background);
  }
  .ant-btn {
    background: var(--main-background);
  }
`;

interface Props {
  visible: boolean;
  onClose: () => void;
}
export const SearchDrawer = ({ visible, onClose }: Props): ReactElement => {
  useDrawerCloseEffect(visible);
  const isMobile = useMedia('isMobile');
  const location = useLocation();

  /** close menu when location changes */
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <StyledDrawer
      title="SEARCH"
      placement="left"
      onClose={onClose}
      open={visible}
      width={isMobile ? '100%' : 600}
      bodyStyle={{ padding: '12px' }}
    >
      <Search visible={visible} />
    </StyledDrawer>
  );
};
