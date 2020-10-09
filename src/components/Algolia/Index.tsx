import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import AlgoliaSearch from './Search';
import useWindowSize from '../../hooks/useWindowSize';
import useDrawerCloseEffect from '../../hooks/useDrawerCloseEffect';

interface Props {
  visible: boolean;
  location: any;
  onClose: () => void;
}
const SearchDrawer: React.FC<Props> = (props) => {
  const { visible, onClose, location } = props;
  const [width] = useWindowSize();
  useDrawerCloseEffect(visible);

  /** close menu when location changes */
  useEffect(() => {
    onClose && onClose();
    // eslint-disable-next-line
  }, [location]);

  return (
    <Drawer
      title="SEARCH"
      placement="left"
      // maskClosable={false}
      onClose={onClose}
      visible={visible}
      width={width < 600 ? '100%' : 600}
      bodyStyle={{ padding: '12px' }}
    >
      <AlgoliaSearch />
    </Drawer>
  );
};
export default React.memo(SearchDrawer);
