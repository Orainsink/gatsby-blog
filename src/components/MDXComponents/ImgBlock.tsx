import {
  memo,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  ReactElement,
} from 'react';

/**
 * img with noReferer
 */
const ImgBlock = ({
  alt,
  ...rest
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>): ReactElement => (
  <img {...rest} alt={alt ?? ''} referrerPolicy="no-referrer" />
);

export default memo(ImgBlock);
