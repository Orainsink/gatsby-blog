import { CSSProperties, ReactElement } from 'react';

interface Props {
  src: string;
  // name?: string;
  // jump?: boolean;
  type?: string;
  style?: CSSProperties;
  className?: string;
}
// TODO: complete this component
/**
 * flv video player
 * @prop src src url
 * @prop [name] video title
 * @prop [jump] jump url
 * @prop [type] video type, default 'video/mp4'
 * @prop [style]
 * @prop [className]
 */
export const VideoComponent = (props: Props): ReactElement => {
  const { src, type = 'video/mp4', ...rest } = props;

  return (
    <video style={{ width: '100%' }} controls {...rest}>
      <source src={src} type={type} />
    </video>
  );
};
