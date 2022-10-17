import { ReactElement, useEffect } from 'react';
import { Drawer } from 'antd';
import { useLocation } from '@reach/router';

import { Search } from './Search';
import { useMedia, useDrawerCloseEffect } from '../../hooks';
import * as styles from './index.module.less';

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
  }, [location, onClose]);

  return (
    <Drawer
      title="SEARCH"
      placement="left"
      onClose={onClose}
      visible={visible}
      width={isMobile ? '100%' : 600}
      bodyStyle={{ padding: '12px' }}
      className={styles.drawerWrap}
    >
      <Search visible={visible} />
    </Drawer>
  );
};
