import React from 'react';
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import * as styles from './index.module.less';
import Panel from './Panel';
import { iRootState } from '../../redux/store';
import { useIsDark } from '../../hooks/useIsDark';

/** myPlayer wrap */
const MyPlayer = () => {
  const {
    headerDrop,
    music: { loaded, playing },
  } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const isDark = useIsDark()

  return (
    <Tooltip
      title={<Panel />}
      trigger="click"
      overlayClassName={classnames(styles.wrapper, {
        [styles.headerDrop]: headerDrop,
        [styles.dark]: isDark,
      })}
      getPopupContainer={() => document.getElementById('header')}
      onVisibleChange={(visible) =>
        dispatch({ type: 'PLAYER_VISIBLE', payload: visible })
      }
    >
      <div style={{ cursor: 'pointer', transform: 'translateY(0.2em)' }}>
        <svg
          className={classnames(
            styles.svg,
            playing && loaded ? styles.running : styles.paused
          )}
          xmlSpace="preserve"
          viewBox="0 0 100 100"
          y="0"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="50px"
          height="50px"
        >
          <g className={styles.g1}>
            <path d="M27.378 92.5c-5.288 0-9.792-2.668-12.048-7.138-3.657-7.246-.386-16.816 7.446-21.787 2.617-1.661 5.486-2.62 8.354-2.8V27c0-3.22 2.071-6.01 5.154-6.941L76.816 7.81a7.24 7.24 0 0 1 2.098-.31 7.3 7.3 0 0 1 4.323 1.43 7.278 7.278 0 0 1 2.928 5.821V62.37c0 .285-.034.563-.097.828.162 6.045-3.306 12.289-8.911 15.847-2.919 1.852-6.15 2.831-9.344 2.831-5.288 0-9.792-2.669-12.048-7.139-3.656-7.246-.386-16.815 7.446-21.786 2.646-1.68 5.551-2.641 8.452-2.805V37.363l-26.029 7.832v28.381c0 .05-.001.098-.003.148.208 6.132-3.258 12.358-8.908 15.944-2.92 1.853-6.151 2.832-9.345 2.832z"></path>
          </g>
          <g className={styles.g2}>
            <path d="M82.626 14.752a3.71 3.71 0 0 0-4.787-3.554L37.308 23.446A3.712 3.712 0 0 0 34.669 27v37.568c-3.081-.717-6.694-.103-9.997 1.994-6.218 3.946-8.987 11.65-6.183 17.205 2.804 5.556 10.119 6.861 16.337 2.914 4.789-3.04 7.528-8.306 7.255-13.104h.013V42.565L75.2 32.603V53.97c-3.103-.753-6.756-.15-10.094 1.968-6.217 3.946-8.986 11.649-6.183 17.204 2.804 5.556 10.119 6.861 16.337 2.914 4.984-3.163 7.748-8.737 7.207-13.687h.159V14.752z"></path>
          </g>
        </svg>
      </div>
    </Tooltip>
  );
};
export default React.memo(MyPlayer);
