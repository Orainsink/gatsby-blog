import { ReactElement, useEffect } from 'react';
import { Drawer } from 'antd';
import { useLocation } from '@reach/router';

import { Search } from './Search';
import { useMedia, useDrawerCloseEffect } from '../../hooks';

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
    <Drawer
      title="SEARCH"
      placement="left"
      onClose={onClose}
      open={visible}
      width={isMobile ? '100%' : 600}
      bodyStyle={{ padding: '12px' }}
    >
      <Search visible={visible} />
    </Drawer>
  );
};
