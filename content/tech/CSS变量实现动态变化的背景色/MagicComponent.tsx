import { useState, useEffect } from 'react';
import useMagicColor from './useMagicColor';

const MagicComponent = () => {
  const [active, setActive] = useState(false);
  useMagicColor(() => document.getElementById('post-magic-container'), active);

  useEffect(() => {
    setActive(true);
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
      id="post-magic-container"
    ></div>
  );
};
export default MagicComponent;
