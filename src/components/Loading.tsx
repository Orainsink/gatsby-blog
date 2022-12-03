import { useEffect, useState, ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

import LoadingSvg from '../assets/img/loading.svg';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

interface Props {
  debounce?: number;
  children?: ReactNode;
}
/**
 * loading组件,用于组件懒加载,默认debounce=500
 * @param {number} debounce debounce time
 */
export const Loading = (props: Props): ReactElement | null => {
  const { debounce = 500, children } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), debounce);
    return () => clearTimeout(timer);
  }, [debounce]);

  return active ? (
    <LoadingContainer>
      <img src={LoadingSvg} alt="" />
      {children}
    </LoadingContainer>
  ) : null;
};
