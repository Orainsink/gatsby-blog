import { memo, DetailedHTMLProps, ImgHTMLAttributes } from 'react';

/**
 * img with noReferer
 */
const ImgBlock = ({
  alt,
  ...rest
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => <img {...rest} alt={alt ?? ''} referrerPolicy="no-referrer" />;

export default memo(ImgBlock);
