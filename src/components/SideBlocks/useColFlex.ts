import useMedia from '../../hooks/useMedia';
import { useEffect, useState } from 'react';

/**SideBlock flex param */
const useColFlex = () => {
  const [colFlex, setColFlex] = useState('0 0 300px');
  const is1100 = useMedia('(max-width: 1100px)');
  const is600 = useMedia('(max-width: 600px)');

  useEffect(() => {
    if (!is1100) return setColFlex('0 0 300px');
    if (is1100 && !is600) return setColFlex('1 1 800px');
    return setColFlex('1 1 300px');
  }, [is1100, is600]);

  return colFlex;
};

export default useColFlex;
