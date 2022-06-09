import { useMedia } from '../../hooks';
import { useEffect, useState } from 'react';

/**SideBlock flex param */
const useColFlex = (): string => {
  const [colFlex, setColFlex] = useState('0 0 300px');
  const isDesktop = useMedia('isDesktop');

  useEffect(() => {
    setColFlex(isDesktop ? '0 0 300px' : '1 1 800px');
  }, [isDesktop]);

  return colFlex;
};

export default useColFlex;
