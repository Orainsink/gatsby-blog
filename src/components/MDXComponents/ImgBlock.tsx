import { DetailedHTMLProps, ImgHTMLAttributes, ReactElement } from 'react';

/**
 * img with noReferer
 */
export const ImgBlock = ({
  alt,
  ...rest
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>): ReactElement => (
  <img {...rest} alt={alt ?? ''} referrerPolicy="no-referrer" />
);
