import React, { CSSProperties } from 'react';

interface Props {
  src: string;
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
  const { src, name = '', jump = false, type = 'video/mp4', ...rest } = props;

  return (
    <video style={{ width: '100%' }} controls {...rest}>
      <source src={src} type={type} />
    </video>
  );
};
export default React.memo(VideoComponent);
