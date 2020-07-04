import React, { useEffect, useState } from 'react';

/**loading组件,用于组件懒加载,默认debounce=500 */
const Loading: React.FC<{ debounce?: number }> = (props) => {
  const { debounce = 500 } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), debounce);
    return () => clearTimeout(timer);
  }, []);
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
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="260px"
          height="260px"
          viewBox="0 0 40 40"
          xmlSpace="preserve"
        >
          <path
            id=""
            opacity="0"
            fill="transparent"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z"
          />
          <path
            id="orbit"
            d="m20.201,15.91701c-9.20089,0 -16.6606,3.28421 -16.6606,7.335c0,4.05128 7.4597,7.335 16.6606,7.335s16.6606,-3.28372 16.6606,-7.335c-0.00111,-4.05079 -7.4597,-7.335 -16.6606,-7.335z"
            strokeOpacity="0"
            strokeWidth=".1"
            stroke="transparent"
            fill="transparent"
          />
          <circle id="mun" r="1" fill="#fff">
            <animateMotion id="animation" dur="2s" repeatCount="indefinite">
              <mpath xlinkHref="#orbit"></mpath>
            </animateMotion>
          </circle>
          <circle cx="20" cy="20" r="5" fill="#fff"></circle>
        </svg>
      </div>
    )
  );
};
export default React.memo(Loading);
