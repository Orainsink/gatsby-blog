import { useEffect, useState, ReactNode, memo } from 'react';
import { ReactComponent as LoadingSvg } from '../assets/img/loading.svg';

interface Props {
  debounce?: number;
  children?: ReactNode;
}
/**
 * loading组件,用于组件懒加载,默认debounce=500
 * @param {number} debounce debounce time
 */
const Loading = (props: Props) => {
  const { debounce = 500, children } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), debounce);
    return () => clearTimeout(timer);
  }, [debounce]);

  return (
    active && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 11,
        }}
      >
        <LoadingSvg />
        {children}
      </div>
    )
  );
};
export default memo(Loading);
