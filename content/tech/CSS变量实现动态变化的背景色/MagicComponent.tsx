import React, { useRef, useCallback, useState } from 'react';
import useMagicColor from './useMagicColor';

const MagicComponent = () => {
  const magicRef = useRef(null);
  const [active, setActive] = useState(false);
  useMagicColor(magicRef.current, active);

  const refCallback = useCallback((node) => {
    if (node !== null) {
      magicRef.current = node;
      setActive(true);
    }
  }, []);

  return (
    <div
      style={{
        background: '#000',
        width: '300px',
        height: '100px',
        borderRadius: '10px',
        margin: 'auto',
      }}
      ref={refCallback}
    ></div>
  );
};
export default MagicComponent;
