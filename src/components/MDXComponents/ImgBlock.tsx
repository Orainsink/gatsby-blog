import React from 'react';

interface Props {
  alt: string;
  src: string;
}
/**
 * img with noReferer
 */
const ImgBlock = ({ src, alt, ...rest }: Props) => (
  <img src={src} alt={alt || ''} referrerPolicy="no-referrer" {...rest} />
);

export default React.memo(ImgBlock);
