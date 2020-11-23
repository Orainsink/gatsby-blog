import React, { CSSProperties, useEffect, useRef } from 'react';
import flvjs from 'flv.js';

interface Props {
  url: string;
  name?: string;
  jump?: boolean;
  type?: string;
  style?: CSSProperties;
  className?: string;
}
/**
 * flv video player
 * @param props
 */
const VideoComponent = (props: Props) => {
  const { url, name = '', jump = false, type = 'mp4', ...rest } = props;
  const flvRef = useRef(null);

  useEffect(() => {
    if (flvjs.isSupported()) {
      const videoElement = flvRef.current!;
      var flvPlayer = flvjs.createPlayer({
        type,
        url,
      });
      flvPlayer.attachMediaElement(videoElement as HTMLMediaElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }, [url, type]);

  return <video ref={flvRef} style={{ width: '100%' }} {...rest}></video>;
};
export default React.memo(VideoComponent);
