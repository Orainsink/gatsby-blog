import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import AlgoliaSearch from './Search';
import { useSelector } from 'react-redux';
import useWindowSize from '../../useHooks/useWindowSize';

interface ISearchDrawer {
  visible: boolean;
  location: any;
  onClose: () => void;
}
const SearchDrawer: React.FC<ISearchDrawer> = (props) => {
  const { visible, onClose, location } = props;
  const { scene } = useSelector((state) => state);
  const [width] = useWindowSize();

  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);

  /** close menu when location changes */
  useEffect(() => {
    onClose && onClose();
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
