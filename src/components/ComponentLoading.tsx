import * as React from 'react';
import { Spin } from 'antd';

const ComponentLoading: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin />
    </div>
  );
};

export default React.memo(ComponentLoading);
