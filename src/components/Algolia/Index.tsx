import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import AlgoliaSearch from './Search';
import useMedia from '../../hooks/useMedia';
import useDrawerCloseEffect from '../../hooks/useDrawerCloseEffect';
import { useLocation } from '@reach/router';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const SearchDrawer = (props: Props) => {
  const { visible, onClose } = props;
  useDrawerCloseEffect(visible);
  const is600 = useMedia('(max-width: 600px)');
  const location = useLocation();

  /** close menu when location changes */
  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <Drawer
      title="SEARCH"
      placement="left"
      // maskClosable={false}
      onClose={onClose}
      visible={visible}
      width={is600 ? '100%' : 600}
      bodyStyle={{ padding: '12px' }}
    >
      <AlgoliaSearch />
    </Drawer>
  );
};
export default React.memo(SearchDrawer);
