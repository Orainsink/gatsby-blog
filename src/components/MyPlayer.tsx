import React, { useRef, useEffect } from 'react';
import { Dropdown } from 'antd';
import SiriWave from 'siriwave';
import ReactHowler from 'react-howler';

const MyPlayer: React.FC = () => {
  const waveRef = useRef(null);

  /**生成 wave */
  useEffect(() => {
    if (waveRef.current) {
    }
  }, []);

  return (
    <>
      <Dropdown></Dropdown>
      <div ref={waveRef}></div>
    </>
  );
};
export default React.memo(MyPlayer);
