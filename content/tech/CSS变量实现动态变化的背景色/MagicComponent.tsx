import React, { useRef } from 'react';
import useMagicColor from './useMagicColor';

const MagicComponent = () => {
  const nodeRef = useRef(null);
  useMagicColor(nodeRef.current);

  return (
    <div
      style={{
        background: '#000',
        width: '300px',
        height: '100px',
        borderRadius: '10px',
        margin: 'auto',
      }}
      ref={nodeRef}
    ></div>
  );
};
export default MagicComponent;
